/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusBar, StyleSheet, Text, View } from "react-native";

import { lightModeColors } from "@/constants/colors";
import ProfilePage from "@/pages/profilePage";

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

export default function Profile() {
  return <ProfilePage />;
}
