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
    backgroundColor: "#25292e", // Dark background color
    alignItems: "center", // Horizontally centers the content
    justifyContent: "center", // Vertically centers the content
  },
  text: {
    color: "#ffffff", // White text color
    fontSize: 24, // Text size
    fontWeight: "bold", // Bold text
  },
});
