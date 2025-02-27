import { StatusBar, StyleSheet, View } from "react-native";

//import ProfilePage from "./profilePage"; // Adjust the path as needed to locate your profile page component
import SettingsPage from "./settingsPage"; // Adjust the path as needed to locate your settings page component

import { lightModeColors } from "@/constants/colors";

export default function App() {
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
      <SettingsPage />
      <StatusBar />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: lightModeColors.background,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: lightModeColors.darkFont,
//   },
// });
