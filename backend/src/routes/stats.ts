import express from "express";

import { JournalEntry } from "src/models/journalEntry";
import { adminMiddleware, verifyAuthToken } from "src/middleware/auth";
import { Mood } from "src/models/mood";
import { User } from "src/models/users";
import { ObjectId } from "mongoose";

const router = express.Router();

const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * GET /api/stats
 * Returns comprehensive statistics for the admin dashboard
 * Requires admin authentication
 */
router.get("/", verifyAuthToken, adminMiddleware, async (req, res) => {
  try {
    // Parse start and end date - default to current date for end date, and earliest date of any activity for start date
    const startDate = req.query.start_date
      ? new Date(req.query.start_date as string)
      : new Date(
          Math.min(
            (
              (await User.find().sort({ createdAt: 1 }).limit(1))[0]?.createdAt ?? new Date()
            ).getTime(),
            Math.min(
              (
                (await Mood.find().sort({ createdAt: 1 }).limit(1))[0]?.createdAt ?? new Date()
              )?.getTime(),
              (
                (await JournalEntry.find().sort({ createdAt: 1 }).limit(1))[0]?.createdAt ??
                new Date()
              )?.getTime(),
            ),
          ),
        );
    const endDate = req.query.end_date ? new Date(req.query.end_date as string) : new Date();
    const activityGroup = req.query.activity_group ?? "Monthly";

    // Get total user count
    const totalUsers = await User.countDocuments({ isAdmin: false });

    const newAccountsCount = await User.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
      isAdmin: false,
    });

    // Average check-ins per user
    const totalCheckInsCurrent = await Mood.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    const totalUsersCurrent = totalUsers; // same as above (exclude admins)
    const avgCheckInsPerUserCurrent =
      totalUsersCurrent > 0 ? totalCheckInsCurrent / totalUsersCurrent : 0;

    // Average journal entries per user
    const totalEntriesCurrent = await JournalEntry.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    const avgEntriesPerUserCurrent =
      totalUsersCurrent > 0 ? totalEntriesCurrent / totalUsersCurrent : 0;

    // Previous time window of equal size
    let totalUsersChangePercent = null,
      newAccountsChangePercent = null,
      avgCheckInsChangePercent = null,
      avgEntriesChangePercent = null;
    if (startDate !== undefined) {
      const prevPeriodStart = new Date(2 * startDate.getTime() - endDate.getTime());
      const totalUsersAtPrev = await User.countDocuments({
        createdAt: { $lt: startDate },
        isAdmin: false,
      });
      totalUsersChangePercent =
        totalUsersAtPrev === 0
          ? null
          : Math.round(((totalUsers - totalUsersAtPrev) / totalUsersAtPrev) * 100);

      const prevNewAccountsCount = await User.countDocuments({
        createdAt: { $gte: prevPeriodStart, $lt: startDate },
        isAdmin: false,
      });
      newAccountsChangePercent =
        prevNewAccountsCount === 0
          ? null
          : Math.round(((newAccountsCount - prevNewAccountsCount) / prevNewAccountsCount) * 100);

      const totalCheckInsPrev = await Mood.countDocuments({
        createdAt: { $gte: prevPeriodStart, $lt: startDate },
      });
      const totalUsersPrev = await User.countDocuments({
        createdAt: { $lt: startDate },
        isAdmin: false,
      });
      const avgCheckInsPerUserPrev = totalUsersPrev > 0 ? totalCheckInsPrev / totalUsersPrev : 0;
      avgCheckInsChangePercent =
        avgCheckInsPerUserPrev === 0
          ? null
          : Math.round(
              ((avgCheckInsPerUserCurrent - avgCheckInsPerUserPrev) / avgCheckInsPerUserPrev) * 100,
            );

      const totalJournalEntriesPrev = await JournalEntry.countDocuments({
        createdAt: { $gte: prevPeriodStart, $lt: startDate },
      });
      const avgJournalEntriesPerUserPrev =
        totalUsersPrev > 0 ? totalJournalEntriesPrev / totalUsersPrev : 0;
      avgEntriesChangePercent =
        avgJournalEntriesPerUserPrev === 0
          ? null
          : Math.round(
              ((avgEntriesPerUserCurrent - avgJournalEntriesPerUserPrev) /
                avgJournalEntriesPerUserPrev) *
                100,
            );
    }

    // Calculate grouped activity data
    let activityGroups: [string, { checkIns: number; entries: number }][] = [];

    switch (activityGroup) {
      case "Yearly": {
        const startYear = startDate?.getFullYear();
        const endYear = endDate.getFullYear();
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
          years.push(year);
        }
        activityGroups = await Promise.all(
          years.map(async (year) => {
            const yearStart = new Date(year, 0, 0, 0, 0, 0, 0);
            const yearEnd = new Date(year + 1, 0, 0, 0, 0, 0, 0);

            return [
              year.toString(),
              {
                checkIns: await Mood.countDocuments({
                  createdAt: { $gte: yearStart, $lt: yearEnd },
                }),
                entries: await JournalEntry.countDocuments({
                  createdAt: { $gte: yearStart, $lt: yearEnd },
                }),
              },
            ];
          }),
        );
        break;
      }

      case "Daily": {
        const startDay = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          0,
          0,
          0,
          0,
        );
        const dayStarts: Date[] = [];
        for (
          let day = startDay;
          day.getTime() <= endDate.getTime();
          day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
        ) {
          dayStarts.push(day);
        }
        activityGroups = await Promise.all(
          dayStarts.map(async (dayStart) => {
            const dayEnd = new Date(dayStart.getTime() + 1000 * 60 * 60 * 24);

            return [
              dayStart.toISOString().slice(0, 10),
              {
                checkIns: await Mood.countDocuments({
                  createdAt: { $gte: dayStart, $lt: dayEnd },
                }),
                entries: await JournalEntry.countDocuments({
                  createdAt: { $gte: dayStart, $lt: dayEnd },
                }),
              },
            ];
          }),
        );
        break;
      }
      case "Monthly":
      default: {
        const startMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 2, 0, 0, 0, 0);
        const monthStarts: Date[] = [];
        for (
          let month = startMonth;
          month.getTime() <= endDate.getTime();
          month = new Date(month.getTime() + 1000 * 60 * 60 * 24 * MONTH_LENGTHS[month.getMonth()])
        ) {
          monthStarts.push(month);
        }
        activityGroups = await Promise.all(
          monthStarts.map(async (monthStart) => {
            const monthEnd = new Date(
              monthStart.getTime() + 1000 * 60 * 60 * 24 * MONTH_LENGTHS[monthStart.getMonth()],
            );

            return [
              `${monthStart.getMonth() + 1}/${monthStart.getFullYear()}`,
              {
                checkIns: await Mood.countDocuments({
                  createdAt: { $gte: monthStart, $lt: monthEnd },
                }),
                entries: await JournalEntry.countDocuments({
                  createdAt: { $gte: monthStart, $lt: monthEnd },
                }),
              },
            ];
          }),
        );
        break;
      }
    }

    // Get users created during this time for onboarding analytics
    const users = await User.find({
      createdAt: { $gte: startDate, $lte: endDate },
      isAdmin: false,
    });

    // Calculate onboarding analytics
    const ageRangeStats: Record<string, number> = {};
    const ethnicityStats: Record<string, number> = {};
    const genderStats: Record<string, number> = {};
    const counselingStats: Record<string, number> = {};
    const educationStats: Record<string, number> = {};
    const residenceStats: Record<string, number> = {};

    users.forEach((user) => {
      const info = user.onboardingInfo;

      // Age range
      ageRangeStats[info.ageRange] = (ageRangeStats[info.ageRange] || 0) + 1;

      // Ethnicity
      ethnicityStats[info.ethnicity] = (ethnicityStats[info.ethnicity] || 0) + 1;

      // Gender
      genderStats[info.gender] = (genderStats[info.gender] || 0) + 1;

      // Counseling experience
      counselingStats[info.counselingExperience] =
        (counselingStats[info.counselingExperience] || 0) + 1;

      // Education level
      educationStats[info.educationLevel] = (educationStats[info.educationLevel] || 0) + 1;

      // Residence
      residenceStats[info.residence] = (residenceStats[info.residence] || 0) + 1;
    });

    // Calculate user retention data
    const newUsers = await User.find({
      createdAt: { $gte: startDate, $lte: endDate },
      isAdmin: false,
    });
    const uidsToObjectIds: Record<string, string> = {};
    const objectIdsToCreatedAt: Record<string, Date> = {};
    for (const user of newUsers) {
      uidsToObjectIds[user.uid] = (user._id as ObjectId).toString();
      objectIdsToCreatedAt[(user._id as ObjectId).toString()] = user.createdAt;
    }

    const checkIns = await Mood.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: 1 });
    const entries = await JournalEntry.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: 1 });

    const MAX_USER_RETENTION_DAYS = 30;
    const usersInitial = newUsers.length;
    const userRetentionWindow = Math.min(
      MAX_USER_RETENTION_DAYS,
      (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const userRetention: Set<string>[] = [];
    for (let i = 0; i < userRetentionWindow; i++) {
      userRetention.push(new Set());
    }
    for (const checkIn of checkIns) {
      if (!objectIdsToCreatedAt[uidsToObjectIds[checkIn.uid]]) {
        continue;
      }
      const userTimeDelta =
        checkIn.createdAt.getTime() - objectIdsToCreatedAt[uidsToObjectIds[checkIn.uid]].getTime();
      const userDays = Math.ceil(userTimeDelta / (1000 * 60 * 60 * 24));
      if (userDays < userRetention.length) {
        userRetention[userDays].add(uidsToObjectIds[checkIn.uid]);
      }
    }

    for (const entry of entries) {
      if (!objectIdsToCreatedAt[entry.author.toString()]) {
        continue;
      }
      const userTimeDelta =
        entry.createdAt.getTime() - objectIdsToCreatedAt[entry.author.toString()].getTime();
      const userDays = Math.ceil(userTimeDelta / (1000 * 60 * 60 * 24));
      if (userDays < userRetention.length) {
        userRetention[userDays].add(entry.author.toString());
      }
    }

    // Return all statistics
    res.json({
      userActivity: {
        totalUserCount: totalUsers,
        totalUsersChangePercent,
        newAccountsCreated: newAccountsCount,
        newAccountsChangePercent,
        totalCheckIns: totalCheckInsCurrent,
        avgCheckInsPerUser: Math.round(avgCheckInsPerUserCurrent * 100) / 100,
        avgCheckInsChangePercent,
        totalEntries: totalEntriesCurrent,
        avgEntriesPerUser: Math.round(avgEntriesPerUserCurrent * 100) / 100,
        avgEntriesChangePercent,
      },
      activityGroups: activityGroups.map(([group, data]) => ({
        group,
        checkIns: data.checkIns,
        entries: data.entries,
      })),
      onboardingAnalytics: {
        ageRange: ageRangeStats,
        ethnicity: ethnicityStats,
        gender: genderStats,
        counseling: counselingStats,
        education: educationStats,
        residence: residenceStats,
      },
      userRetention: [1, ...userRetention.map((activeUsers) => activeUsers.size / usersInitial)],
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export { router as statsRouter };
