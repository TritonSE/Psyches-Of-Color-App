// eslint-disable-next-line import/namespace
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import logo from "../assets/Poc_Mascots.png";
import Button from "../components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Psyches of Color</Text>
        <Text style={styles.text}>My melanated psyche is my superpower</Text>
      </View>
      <View style={styles.bottomSection}>
        <Button title="Login" targetScreen="login" />
        <Button title="Sign Up" targetScreen="signup" />
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-between",
  },
  topSection: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    marginBottom: 25,
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
