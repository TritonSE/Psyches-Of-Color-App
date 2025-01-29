import { StyleSheet, Text, View } from "react-native";

import Mascots from "@/assets/Poc_Mascots.svg";
import Button from "@/components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Psyches of Color</Text>
        <Text style={styles.text}>My melanated psyche is my superpower</Text>
      </View>
      <View style={styles.bottomSection}>
        <Button href="/login">Login</Button>
        <Button href="/signup">Sign Up</Button>
      </View>
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
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
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
