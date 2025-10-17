import { scheduleJob } from "node-schedule";
import { User } from "@/models/users";

function resetWeeklyCheckin() {
  scheduleJob("0 0 * * 0", async () => {
    // Runs at 12:00 AM every Sunday (server time)
    try {
      const result = await User.updateMany(
        {}, // all users
        { hasCompletedWeeklyCheckin: false },
      );
      console.log(`Weekly check-ins reset for ${result.modifiedCount} users.`);
    } catch (error) {
      console.error("Error resetting weekly check-ins:", error);
    }
  });
}

export { resetWeeklyCheckin };
