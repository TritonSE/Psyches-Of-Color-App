import { StyleSheet, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
});

export default function InternetError() {
  return <SafeAreaView style={styles.page}></SafeAreaView>;
}
