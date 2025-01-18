import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "../components/Button";

import InputBox from "@/components/InputBox";

export default function Logon() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Psyches of Color</Text>
      <InputBox placeholder="Enter text here" field="Email" value={text} onChangeText={setText} />
      <InputBox
        placeholder="Enter text here"
        field="Password"
        value={text}
        onChangeText={setText}
      />
      <Button title="Login" targetScreen="loading" />
      <Button
        title="Continue with Google"
        onPress={() => {
          alert("Button Pressed");
        }}
      />
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
    width: 116,
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
