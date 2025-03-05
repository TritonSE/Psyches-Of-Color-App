import { StatusBar, StyleSheet, Text, View } from "react-native";

import CharacterSelection from "./pages/characterSelection";
import EditProfile from "./pages/editProfile";

import { lightModeColors } from "@/constants/colors";

export default function App() {
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
