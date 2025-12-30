import express, { NextFunction, Response } from "express";

import { PsychesRequest, adminMiddleware, verifyAuthToken } from "../middleware/auth";
import { User } from "../models/users";
import { firebaseAuth } from "../services/firebase";

const router = express.Router();

// Email and password
// Firebase takes the email and password
// Generate a token
// Then they will verify this token
// If valid -> give the respective permissions
// If invalid -> return error

// GET route to fetch user profile
router.get(
  "/api/whoami",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userUid } = req;
      const user = await User.findOne({ uid: userUid }).populate("completedLessons");

      if (!user) {
        res.status(404).json({ error: "User not Found" });
        return;
      }

      res.status(200).send(user);
      return;
    } catch (e) {
      next();
      console.log(e);
      res.status(400).json({
        error: e,
      });
      return;
    }
  },
);

// GET route to get all users - requires admin permissions
router.get(
  "/api/users/all",
  verifyAuthToken,
  adminMiddleware,
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get all users
      const users = await User.find({ isAdmin: false });
      res.status(200).send({ users });
      return;
    } catch (e) {
      next(e);
    }
  },
);

// POST route to create a user profile
router.post("/api/users", async (req: PsychesRequest, res: Response): Promise<void> => {
  try {
    const { name, email, uid } = req.body;

    // Validate required fields
    if (!name || !email || !uid) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Check if the user email or uid already exists
    const existingUser = await User.findOne({ $or: [{ email }, { uid }] });
    if (existingUser) {
      res.status(400).json({ message: "User with this email or username already exists" });
      return;
    }

    // Create and save new user
    const newUser = new User({ name, email, uid });

    await newUser.save();

    res.status(201).json({ message: "User profile created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
});

// PUT route to update a user profile
router.put(
  "/api/users/:uid",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response): Promise<void> => {
    try {
      const { uid } = req.params;
      const { userUid } = req;

      // Ensure the authenticated user is updating their own profile
      if (userUid !== uid) {
        res.status(403).json({ message: "You can only update your own profile" });
        return;
      }

      const { name, email, character, onboardingInfo, completedOnboarding } = req.body;
      if (!name && !email && !character && !onboardingInfo && !completedOnboarding) {
        res.status(400).json({ message: "At least one field is required" });
        return;
      }

      const user = await User.findOne({ uid });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (character) user.character = character;
      if (onboardingInfo) user.onboardingInfo = onboardingInfo;
      if (completedOnboarding) user.completedOnboarding = completedOnboarding;

      await user.save();

      res.status(200).json({ message: "User profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Cast error to Error to safely access error.message
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  },
);

// PUT: Mark an lesson as completed by a user
router.put(
  "/api/users/:uid/completed/:lessonId",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response): Promise<void> => {
    const { uid, lessonId } = req.params;
    const { userUid } = req;

    // Ensure the authenticated user is updating their own lessons
    if (userUid !== uid) {
      res.status(403).json({ message: "You can only update your own lessons" });
      return;
    }

    try {
      const user = await User.findOne({ uid });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Initialize if missing
      if (!user.completedLessons) {
        user.completedLessons = [];
      } else {
        // --- FIX START: Sanitize the array ---
        // Filter out any entries that are null or missing the lessonId
        // This prevents the "ValidatorError" and the "TypeError"
        user.completedLessons = user.completedLessons.filter((l) => l && l.lessonId);
        // --- FIX END ---
      }

      const lessonExists = user.completedLessons.some(
        (lesson) => lesson.lessonId.toString() === lessonId,
      );

      if (lessonExists) {
        res.status(200).json({ message: "Lesson already marked as completed", user });
        return;
      }

      user.completedLessons.push({
        lessonId: lessonId as unknown as (typeof user.completedLessons)[0]["lessonId"],
        completedAt: new Date(),
      });

      await user.save();

      res.status(200).json({ message: "Lesson marked as completed", user });
    } catch (error) {
      console.error("Error updating completed lessons:", error);
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  },
);

// PUT: Update the user's lastCompletedWeeklyCheckIn to the current date/time
router.put(
  "/api/users/last-completed-weekly",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response): Promise<void> => {
    try {
      const currentUserUid = req.userUid;

      const user = await User.findOne({ uid: currentUserUid });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // --- FIX START: Sanitize here too ---
      // Even though we aren't adding a lesson, .save() validates the whole document.
      // We must clean the array if it's dirty, otherwise this save will fail.
      if (user.completedLessons && user.completedLessons.length > 0) {
        user.completedLessons = user.completedLessons.filter((l) => l && l.lessonId);
      }
      // --- FIX END ---

      user.lastCompletedWeeklyCheckIn = new Date();
      await user.save();

      res.status(200).json({
        message: "Weekly check-in timestamp updated",
        lastCompletedWeeklyCheckIn: user.lastCompletedWeeklyCheckIn,
      });
      return;
    } catch (error) {
      console.error("Error updating lastCompletedWeeklyCheckIn:", error);
      res.status(500).json({ message: "Server error", error: (error as Error).message });
      return;
    }
  },
);

// DELETE route to delete a user account
router.delete(
  "/api/users/:uid",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response): Promise<void> => {
    try {
      const { uid } = req.params;
      const { userUid } = req;

      // Ensure the authenticated user is deleting their own account
      if (userUid !== uid) {
        res.status(403).json({ message: "You can only delete your own account" });
        return;
      }

      const user = await User.findOne({ uid });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await User.deleteOne({ uid });

      await firebaseAuth.deleteUser(uid);

      res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  },
);

export { router as userRouter };
