import { StatusBar, StyleSheet, View } from "react-native";

//import ProfilePage from "./profilePage"; // Adjust the path as needed to locate your profile page component
import SettingsPage from "./settingsPage"; // Adjust the path as needed to locate your settings page component

import { lightModeColors } from "@/constants/colors";

import FigtreeItalic from "@/assets/fonts/Figtree-Italic.ttf";
import Figtree from "@/assets/fonts/Figtree.ttf";
import SGBold from "@/assets/fonts/Social-Gothic-Bold.otf";
import SGDemiBold from "@/assets/fonts/Social-Gothic-DemiBold.otf";
import SGMedium from "@/assets/fonts/Social-Gothic-Medium.otf";
import SGRegular from "@/assets/fonts/Social-Gothic-Regular.otf";
import SGRough from "@/assets/fonts/Social-Gothic-Rough.otf";
import SGSoft from "@/assets/fonts/Social-Gothic-Soft.otf";
import SGStencil from "@/assets/fonts/Social-Gothic-Stencil.otf";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded, error] = useFonts({
    // Social Gothic fonts are static, so can't change the font weight with styles
    "SG-Bold": SGBold,
    "SG-DemiBold": SGDemiBold,
    "SG-Medium": SGMedium,
    "SG-Regular": SGRegular,
    "SG-Rough": SGRough,
    "SG-Soft": SGSoft,
    "SG-Stencil": SGStencil,
    // Figtree fonts are variable weight, so the font weight can be changed with styles
    "Figtree-Italic": FigtreeItalic,
    Figtree,

  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
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
