import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Mascots from "@/assets/Poc_Mascots.svg";
import GoogleLogo from "@/assets/logo-google.svg";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { lightModeColors } from "@/constants/colors";
import { loginEmailPassword, signInWithGoogle } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Mascots style={styles.logo} />
      <Text style={styles.title}>Psyches of Color</Text>
      <InputBox field="Email" placeholder="Enter Email" value={email} onChangeText={setEmail} />
      <InputBox
        field="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        onForgotPassword={() => {
          console.log("Forgot Password pressed");
        }}
      />
      <Button style={styles.loginButton} onPress={() => void loginEmailPassword(email, password)}>
        Login
      </Button>
      <View style={styles.continueWithTextContainer}>
        <View style={styles.line}></View>
        <Text style={styles.continueWithText}>Or continue with</Text>
        <View style={styles.line}></View>
      </View>
      <Button
        onPress={() => {
          void signInWithGoogle();
        }}
        style={{ gap: 16 }}
      >
        <GoogleLogo width={24} height={24} />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: lightModeColors.lightFont,
          }}
        >
          Continue with Google
        </Text>
      </Button>
      <Text style={styles.signupText}>
        {"Don't have an account? "}
        <Link href="/signup" style={styles.signupLink}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
  },
  logo: {
    width: 253,
    height: 116,
    marginBottom: 16,
  },
  text: {
    color: lightModeColors.darkFont,
    fontFamily: "Open Sans",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
  },
  title: {
    color: lightModeColors.darkFont,
    fontFamily: "Inter",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
  },
  continueWithTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    marginVertical: 16,
  },
  continueWithText: {
    color: lightModeColors.mutedFont,
    fontSize: 14,
    marginHorizontal: 10,
  },
  line: {
    flex: 1, // Ensures the lines take up equal width
    height: 0.5,
    backgroundColor: lightModeColors.overlayBackground,
  },
  signupText: {
    marginTop: 16,
    fontSize: 17,
    color: lightModeColors.darkFont,
  },
  signupLink: {
    textDecorationLine: "underline",
  },
});
