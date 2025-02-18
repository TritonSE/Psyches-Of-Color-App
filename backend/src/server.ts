/* eslint-disable */
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { startTestCronJob, sendNotification } from "./services/notifications";
import env from "./util/validateEnv";
import { setDeviceToken } from "./services/tokenStore";

const app: Express = express();
const port = env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/send-notification", async (req: Request, res: Response): Promise<any> => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "FCM token is required" });
    }

    setDeviceToken(token);

    await sendNotification("Test Notification", "This is a test notification", token);

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Failed to send notification" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  startTestCronJob();
});
