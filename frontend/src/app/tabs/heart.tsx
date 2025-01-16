// Route to dummy page
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Heart|Profile]</Text>
    </View>
  );
}
