import { Link } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

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

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Old Home</Text>
      <Link href={"/home"}>Login</Link>
      <StatusBar />
    </View>
  );
}
