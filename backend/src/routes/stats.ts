import express from "express";

import { JournalEntry } from "src/models/journalEntry";
import { PsychesRequest, verifyAuthToken } from "src/middleware/auth";
import { Mood } from "src/models/mood";
import { User } from "src/models/users";

const router = express.Router();

// DEV ONLY: Skip admin check when auth is bypassed
const DEV_SKIP_AUTH = process.env.DEV_SKIP_AUTH === "true";

/**
 * Middleware to check if user is an admin
 */
const adminMiddleware = async (
  req: PsychesRequest,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const uid = req.userUid;

    if (!uid) {
      res.status(401).json({ error: "Unauthorized: No user ID found" });
      return;
    }

    // DEV ONLY: Skip admin verification
    if (DEV_SKIP_AUTH) {
      console.warn("⚠️  DEV MODE: Skipping admin verification");
      next();
      return;
    }

    const user = await User.findOne({ uid });

    if (!user || !user.isAdmin) {
      res.status(403).json({ error: "Access denied. Admin privileges required." });
      return;
    }

    next();
  } catch {
    res.status(500).json({ error: "Failed to verify admin status" });
  }
};

/**
 * GET /api/stats
 * Returns comprehensive statistics for the admin dashboard
 * Requires admin authentication
 */
router.get("/", verifyAuthToken, adminMiddleware, async (req, res) => {
  try {
    // Get total user count
    const totalUsers = await User.countDocuments();

    // Get new accounts created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // DUMMY DATA: Returns 0 because User model doesn't have createdAt timestamp
    // TO FIX: Add `timestamps: true` to userSchema in backend/src/models/users.ts
    // Then query: User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } })
    const newAccountsCount = 0;

    // Get all users for onboarding analytics
    const users = await User.find({});

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

    // Calculate user retention curve (simplified - days since last activity)
    const retentionData: { [key: string]: number } = {};
    for (let day = 0; day <= 7; day++) {
      retentionData[`Day ${day}`] = 0;
    }

    // For each user, find their last activity
    for (const user of users) {
      const lastMood = await Mood.findOne({ uid: user.uid }).sort({ createdAt: -1 });
      const lastEntry = await JournalEntry.findOne({ author: user._id }).sort({ createdAt: -1 });

      let lastActivity: Date | null = null;
      if (lastMood && lastEntry) {
        lastActivity =
          lastMood.createdAt > lastEntry.createdAt ? lastMood.createdAt : lastEntry.createdAt;
      } else if (lastMood) {
        lastActivity = lastMood.createdAt;
      } else if (lastEntry) {
        lastActivity = lastEntry.createdAt;
      }

      if (lastActivity) {
        const daysSince = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSince <= 7) {
          retentionData[`Day ${daysSince}`]++;
        }
      }
    }

    // Return all statistics
    res.json({
      userActivity: {
        totalUserCount: totalUsers,
        newAccountsCreated: newAccountsCount,
        avgCheckInsPerUser: Math.round(avgCheckInsPerUser * 100) / 100,
        avgEntriesPerUser: Math.round(avgEntriesPerUser * 100) / 100,
      },
      monthlyActivity: Object.entries(monthlyActivity).map(([month, data]) => ({
        month,
        checkIns: data.checkIns,
        entries: data.entries,
      })),
      retentionCurve: Object.entries(retentionData).map(([day, count]) => ({
        day,
        activeUsers: count,
      })),
      onboardingAnalytics: {
        ageRange: ageRangeStats,
        ethnicity: ethnicityStats,
        gender: genderStats,
        counseling: counselingStats,
        education: educationStats,
        residence: residenceStats,
      },
      lessonMetrics: {
        // DUMMY DATA: All lesson rating data is hardcoded
        // TO FIX: Requires implementing rating system:
        // 1. Create Rating model with fields: userId, lessonId, unitId, rating (1-5), createdAt
        // 2. Add rating UI in mobile app after lesson completion
        // 3. Query ratings here and calculate averages by unit
        // 4. Return real data instead of hardcoded values
        averageRating: 4.37, // Hardcoded placeholder
        ratingsByUnit: [], // Empty because no ratings exist
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export { router as statsRouter };
