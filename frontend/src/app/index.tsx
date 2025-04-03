import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

import CharacterSelection from "./pages/characterSelection";
import EditProfile from "./pages/editProfile";

import { lightModeColors } from "@/constants/colors";

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       "Social-Gothic": require("./src/assets/fonts/socialGothic.otf"),
  //     });
  //     setFontsLoaded(true);
  //   }

  //   loadFonts();
  // }, []);

  // if (!fontsLoaded) {
  //   return null; // Or a loading screen
  // }

  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>New Home</Text>
    //   <StatusBar />
    // </View>
    <CharacterSelection />
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
