import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "../components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  noConnection: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 38.4,
    letterSpacing: -0.02,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    color: "black",
  },
  noConnectionMessage: {
    fontFamily: "Open Sans",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 25.5,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

export default function InternetError() {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.noConnection}>No Connection</Text>
      <Text style={styles.noConnectionMessage}>
        No internet connection found. Please check your connection or try again.
      </Text>
      <Button
        onClick={() => {
          setIsConnected(!isConnected);
        }}
      >
        Try Again
      </Button>
    </View>
  );
}
