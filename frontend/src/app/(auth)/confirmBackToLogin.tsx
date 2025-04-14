import { View, StyleSheet, Text } from "react-native";
import Button from "@/components/Button";
import Mascots from "@/assets/Poc_Mascots.svg";
import { lightModeColors } from "@/constants/colors";
import { router } from "expo-router";

export default function confirmBack() {
  return (
    <View style={styles.container}>
      <Mascots />
      <Text style={styles.title}>Back to Login?</Text>
      <Text style={styles.notSavedText}>Your account will not be saved.</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttonLeft} href={"./login"} textStyle={styles.textStyle}>
          Back to Login
        </Button>
        <Button style={styles.buttonRight} href={"./signup"} textStyle={styles.textStyle}>
          Continue Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 258,
  },
  title: {
    color: lightModeColors.buttonFill,
    fontFamily: "SG-DemiBold",
    fontSize: 32,
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
  notSavedText: {
    fontFamily: "Archivo",
    fontWeight: 400,
    fontSize: 17,
  },
  buttonLeft: {
    width: 129,
    height: 35,
  },
  buttonRight: {
    width: 150,
    height: 35,
  },
  textStyle: {
    fontFamily: "SG-DemiBold",
    fontSize: 14,
    fontWeight: 400,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 76,
    paddingTop: 230,
    marginBottom: 0,
  },
});
