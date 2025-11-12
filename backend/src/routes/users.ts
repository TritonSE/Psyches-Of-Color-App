import express, { NextFunction, Response } from "express";

import { PsychesRequest, verifyAuthToken } from "../middleware/auth";
import { User } from "../models/users";

const router = express.Router();

// Email and password
// Firebase takes the email and password
// Generate a token
// Then they will verify this token
// If valid -> give the respective permissions
// If invalid -> return error

//

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

// POST route to create a user profile
router.post("/users", async (req: PsychesRequest, res: Response): Promise<void> => {
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
router.put("/users/:uid", async (req: PsychesRequest, res: Response): Promise<void> => {
  try {
    const { uid } = req.params;
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
});

// PUT: Mark an lesson as completed by a user
router.put(
  "/users/:uid/completed/:lessonId",
  async (req: PsychesRequest, res: Response): Promise<void> => {
    const { uid, lessonId } = req.params;

    try {
      const user = await User.findOne({ uid });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (!user.completedLessons) user.completedLessons = [];

      const lessonExists = user.completedLessons.some((id) => id.toString() === lessonId);

      if (lessonExists) {
        res.status(200).json({ message: "Lesson already marked as completed", user });
        return;
      }

      user.completedLessons.push(lessonId);
      await user.save();

      res.status(200).json({ message: "Lesson marked as completed", user });
    } catch (error) {
      console.error("Error updating completed lessons:", error);
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  },
);

// DELETE route to delete a user account
router.delete(
  "/users/:uid",
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

      res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  },
);

export { router as userRouter };
