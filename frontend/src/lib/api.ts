import env from "@/util/validateEnv";
import { Platform } from "react-native";

// Base URL for the API
const API_BASE_URL = env.EXPO_PUBLIC_BACKEND_URI || "http://localhost:3000";

// Interface for the mood object
export type Mood = {
  _id: string;
  moodreported: string;
  createdAt: string;
  year: number;
  month: number;
  day: number;
  uid: string;
};

// Interface for the API response
type MoodResponse = {
  moods: Mood[];
};

/**
 * Fetches all moods for a specific user
 * @param userId The user ID to fetch moods for
 * @returns An array of mood objects
 */
export const getUserMoods = async (userId: string): Promise<Mood[]> => {
  try {
    console.log("Fetching moods for user:", userId);
    console.log("API URL:", `${API_BASE_URL}/api/user/${userId}/moods`);

    const response = await fetch(`${API_BASE_URL}/api/user/${userId}/moods`);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as MoodResponse;
    console.log("Received data:", data);
    return data.moods;
  } catch (error) {
    console.error("Error fetching user moods:", error);
    throw error;
  }
};

/**
 * Logs a new mood for a user
 * @param userId The user ID to log the mood for
 * @param mood The mood to log
 * @returns The created mood object
 */
export const logMood = async (userId: string, mood: string): Promise<Mood> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/logmood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moodreported: mood,
        uid: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.mood;
  } catch (error) {
    console.error("Error logging mood:", error);
    throw error;
  }
};
