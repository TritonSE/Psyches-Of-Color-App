import React from "react";
import { Image, ImageSourcePropType, StatusBar, StyleSheet, Text, View } from "react-native";

import logo from "../assets/Poc_Mascots.png";
import Button from "../components/Button";

import InputBox from "@/components/InputBox";
import { signInWithGoogle } from "@/lib/auth";

export default function Logon() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Image source={logo as ImageSourcePropType} style={styles.logo} />
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
      <Button href="/loading">Login</Button>
      <Button
        onPress={() => {
          void signInWithGoogle();
        }}
      >
        Continue with Google
      </Button>
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
    // justifyContent: "space-between",
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
