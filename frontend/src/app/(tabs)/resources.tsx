import { View, Text, StyleSheet } from "react-native";

export default function Resources() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resources</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
