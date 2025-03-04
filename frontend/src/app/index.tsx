import { StatusBar, StyleSheet, Text, View } from "react-native";

import ReflectionQs from "../app/pages/ReflectionQs";

import { lightModeColors } from "@/constants/colors";

export default function App() {
  return (
    <ReflectionQs></ReflectionQs>
    // <View style={styles.container}>
    //   <Text style={styles.text}>New Home</Text>
    //   <StatusBar />
    // </View>
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
