// eslint-disable-next-line import/namespace
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import logo from "../assets/Poc_Mascots.png";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Psyches of Color</Text>
      <Text style={styles.text}>slogan/mindful tip goes here</Text>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 253,
    height: 116,
    marginBottom: 16,
  },
  text: {
    color: "#000000",
    fontFamily: "Open Sans",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
    marginBottom: 16,
  },
  title: {
    color: "#000000",
    fontFamily: "Inter",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
});
