import messaging from "@react-native-firebase/messaging";
// eslint-disable-next-line import/namespace
import { StatusBar, StyleSheet, Text, View } from "react-native";

import { lightModeColors } from "@/constants/colors";
import React from "react";

export default function App() {
  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();

      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log("Notification permission granted");

        // Grabs FCM token
        const token = await messaging().getToken();
        console.log("FCM Token:", token);

        // Sends FCM token to backend
        await sendTokenToBackend(token);
      } else {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  const sendTokenToBackend = async (token: string) => {
    try {
      // check this
      const response = await fetch(`${process.env.PUBLIC_BACKEND_URI}/send-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        console.log("Notification triggered successfully");
      } else {
        console.error("Failed to trigger notification:", await response.text());
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  React.useEffect(() => {
    const getPermission = async () => {
      try {
        await requestPermission();
      } catch (error) {
        console.error("Error requesting permission:", error);
      }
    };

    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Home</Text>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: lightModeColors.darkFont,
  },
});
