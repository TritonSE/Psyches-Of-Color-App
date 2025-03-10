import { SafeAreaView, StyleSheet, View } from "react-native";

import { ResponseBox } from "../components/ResponseBox";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 50,
    backgroundColor: "white",
  },
  buttonColor: {
    backgroundColor: "#C13D2F",
  },
});

export default function ReflectionQs() {
  return (
    <SafeAreaView style={styles.page}>
      <View>
        <ResponseBox></ResponseBox>
      </View>
    </SafeAreaView>
  );
}
