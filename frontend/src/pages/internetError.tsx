import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import OrangeMascot from "@/assets/orange-mascot.svg";
import Button from "@/components/Button";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  msgContainer: {
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: 218,
    marginBottom: 25,
    gap: 10,
  },
  noConnection: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 38.4,
    letterSpacing: -0.02,
    textAlign: "center",
    textDecorationStyle: "solid",
    color: "black",
  },
  noConnectionMessage: {
    fontFamily: "Open Sans",
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 25.5,
    textAlign: "center",
    textDecorationStyle: "solid",
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const buttonStyles = StyleSheet.create({
  buttonStyle: {
    width: 218,
  },
});

export default function InternetError() {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.msgContainer}>
        <OrangeMascot />
        <Text style={styles.noConnection}>No connection</Text>
        <Text style={styles.noConnectionMessage}>
          No internet connection found. Please check your connection or try again.
        </Text>
      </View>
      <Button
        onPress={() => {
          setIsConnected(!isConnected);
        }}
        // style={buttonStyles.buttonStyle}
      >
        Try Again
      </Button>
    </View>
  );
}
