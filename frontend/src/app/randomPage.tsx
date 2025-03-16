import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function RandomPage() {
  const router = useRouter(); // Get router object

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Random Page</Text>
      <Button
        title="Back to Profile"
        onPress={() => {
          router.push("/profilePage");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
});
