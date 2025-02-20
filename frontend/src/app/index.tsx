import messaging from "@react-native-firebase/messaging";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

import { lightModeColors } from "@/constants/colors";
import env from "@/util/validateEnv";

export default function App() {
  const sendTokenToBackend = async (token: string) => {
    try {
      // check this
      const response = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/send-notification`, {
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

  const requestPermission = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
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

  React.useEffect(() => {
    const getPermission = async () => {
      try {
        await requestPermission();
      } catch (error) {
        console.error("Error requesting permission:", error);
      }
    };

    getPermission().catch((error: unknown) => {
      console.error("Error requesting permission:", error);
    });
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Home</Text>
      <StatusBar />
    </View>
  );
}
