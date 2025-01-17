import { StatusBar, StyleSheet, Text, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

export default function App() {
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
