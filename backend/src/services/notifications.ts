import { scheduleJob } from "node-schedule";

import { firebaseMessaging } from "./firebase";
import { getDeviceToken } from "./tokenStore";

const sendNotification = async (title: string, body: string, deviceToken: string) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: deviceToken,
  };

  try {
    await firebaseMessaging().send(message);
  } catch (error) {
    console.log(error);
  }
};

const startTestCronJob = () => {
  scheduleJob("*/1 * * * *", async () => {
    const deviceToken = getDeviceToken();
    if (!deviceToken) {
      console.error("No device token found");
      return;
    }
    console.log("Device Token:", deviceToken);
    await sendNotification("Test Notification", "This is a test notification", deviceToken);
    console.log("Sent test notification");
  });
};

export { sendNotification, startTestCronJob };
