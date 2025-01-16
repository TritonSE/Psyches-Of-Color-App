import { StatusBar, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Home</Text>
      <StatusBar />
    </View>
  );
}
