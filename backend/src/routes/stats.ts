import express from "express";

import { JournalEntry } from "src/models/journalEntry";
import { adminMiddleware, verifyAuthToken } from "src/middleware/auth";
import { Mood } from "src/models/mood";
import { User } from "src/models/users";

const router = express.Router();

/**
 * GET /api/stats
 * Returns comprehensive statistics for the admin dashboard
 * Requires admin authentication
 */
router.get("/", verifyAuthToken, adminMiddleware, async (req, res) => {
  try {
    // Get total user count
    const totalUsers = await User.countDocuments({ isAdmin: false });

    // Get new accounts created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newAccountsCount = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
      isAdmin: false,
    });

    // Previous 30-day window (30-60 days ago)
    const prevThirtyStart = new Date();
    prevThirtyStart.setDate(prevThirtyStart.getDate() - 60);
    const prevThirtyEnd = thirtyDaysAgo;

    const prevNewAccountsCount = await User.countDocuments({
      createdAt: { $gte: prevThirtyStart, $lt: prevThirtyEnd },
      isAdmin: false,
    });
    const newAccountsChangePercent =
      prevNewAccountsCount === 0
        ? null
        : Math.round(((newAccountsCount - prevNewAccountsCount) / prevNewAccountsCount) * 100);

    // Total users percent change vs 30 days ago
    const totalUsersAtPrev = await User.countDocuments({
      createdAt: { $lt: thirtyDaysAgo },
      isAdmin: false,
    });
    const totalUsersChangePercent =
      totalUsersAtPrev === 0
        ? null
        : Math.round(((totalUsers - totalUsersAtPrev) / totalUsersAtPrev) * 100);

    // Average check-ins per user: compare current 30-day window vs previous 30-day window
    const totalCheckInsCurrent = await Mood.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const totalUsersCurrent = totalUsers; // same as above (exclude admins)
    const avgCheckInsPerUserCurrent =
      totalUsersCurrent > 0 ? totalCheckInsCurrent / totalUsersCurrent : 0;

    const totalCheckInsPrev = await Mood.countDocuments({
      createdAt: { $gte: prevThirtyStart, $lt: prevThirtyEnd },
    });
    const totalUsersPrev = await User.countDocuments({
      createdAt: { $lt: prevThirtyEnd },
      isAdmin: false,
    });
    const avgCheckInsPerUserPrev = totalUsersPrev > 0 ? totalCheckInsPrev / totalUsersPrev : 0;
    const avgCheckInsChangePercent =
      avgCheckInsPerUserPrev === 0
        ? null
        : Math.round(
            ((avgCheckInsPerUserCurrent - avgCheckInsPerUserPrev) / avgCheckInsPerUserPrev) * 100,
          );

    // Get all users for onboarding analytics
    const users = await User.find({ isAdmin: false });

    // Calculate onboarding analytics
    const ageRangeStats: { [key: string]: number } = {};
    const ethnicityStats: { [key: string]: number } = {};
    const genderStats: { [key: string]: number } = {};
    const counselingStats: { [key: string]: number } = {};
    const educationStats: { [key: string]: number } = {};
    const residenceStats: { [key: string]: number } = {};

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

    // Calculate activity metrics (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get mood check-ins
    const moodCheckIns = await Mood.find({
      createdAt: { $gte: sixMonthsAgo },
    });

    // Get journal entries
    const journalEntries = await JournalEntry.find({
      createdAt: { $gte: sixMonthsAgo },
    });

    // Calculate monthly activity data
    const monthlyActivity: {
      [key: string]: { checkIns: number; entries: number };
    } = {};

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthlyActivity[monthKey] = { checkIns: 0, entries: 0 };
    }

    // Count check-ins by month
    moodCheckIns.forEach((mood) => {
      const monthKey = `${mood.year}-${String(mood.month).padStart(2, "0")}`;
      if (monthlyActivity[monthKey]) {
        monthlyActivity[monthKey].checkIns++;
      }
    });

    // Count journal entries by month
    journalEntries.forEach((entry) => {
      const date = new Date(entry.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyActivity[monthKey]) {
        monthlyActivity[monthKey].entries++;
      }
    });

    // Calculate average activities per user
    const totalCheckIns = moodCheckIns.length;
    const totalEntries = journalEntries.length;
    const avgCheckInsPerUser = totalUsers > 0 ? totalCheckIns / totalUsers : 0;
    const avgEntriesPerUser = totalUsers > 0 ? totalEntries / totalUsers : 0;

    // Return all statistics
    res.json({
      userActivity: {
        totalUserCount: totalUsers,
        totalUsersChangePercent,
        newAccountsCreated: newAccountsCount,
        newAccountsChangePercent,
        avgCheckInsPerUser: Math.round(avgCheckInsPerUser * 100) / 100,
        avgCheckInsChangePercent,
        avgEntriesPerUser: Math.round(avgEntriesPerUser * 100) / 100,
      },
      monthlyActivity: Object.entries(monthlyActivity).map(([month, data]) => ({
        month,
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
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export { router as statsRouter };
