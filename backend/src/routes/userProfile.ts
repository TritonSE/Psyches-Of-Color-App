import express, { NextFunction, Request, Response } from "express";

import { User } from "../models/User";

const router = express.Router();

// POST route to create a user profile
router.post("/users", async (req: Request, res: Response): Promise<void> => {
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
  "/users/:uid",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const { name, email } = req.body;

      if (!name && !email) {
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

      await user.save();

      res.status(200).json({ message: "User profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Cast error to Error to safely access error.message
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  },
);

export { router as userProfileRouter };
