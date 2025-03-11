import { StyleSheet, Text, View } from "react-native";

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

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
}
