import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from "../components/Button";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0,
    paddingTop: 25,
    left: 0,
    color: "#2E563C",
  },
  questionSection: {
    alignItems: "center",
    flexDirection: "row",
  },
  questionBox: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: 215,
    height: 110,
    backgroundColor: "white",
  },
  question: {
    textAlign: "center",
    fontFamily: "Figtree",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#2E563C",
  },
  inputContainer: {
    position: "relative",
    width: 358,
    borderWidth: 1,
    borderColor: "#2E563C",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 284,
    textAlignVertical: "top",
    backgroundColor: "white",
  },
  placeholder: {
    position: "absolute",
    left: 10,
    right: 10,
    fontFamily: "Figtree",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#888",
    marginLeft: 5,
    top: 15,
  },
  input: {
    fontSize: 16,
    fontFamily: "Figtree",
    color: "#000",
  },
  buttonColor: {
    backgroundColor: "#2E563C",
    fontFamily: "Social Gothic",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  page: {
    gap: 50,
  },
  icon: {
    resizeMode: "contain",
  },
  vector: {
    width: 0,
    height: 0,
    borderLeftWidth: 17,
    borderRightWidth: 19,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "135deg" }],
    right: 20,
    bottom: 15,
  },
});

const questions: Record<number, string> = {
  1: "What is one way you can create a sense of 'sunshine' in your space today?",
};

export function ResponseBox(props: { activityNumber: number }) {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Time To Reflect</Text>
      <View style={styles.questionSection}>
        <Image source={require("@/assets/questionDude.png")} style={styles.icon} />

        <View style={styles.questionBox}>
          <Text style={styles.question}>{questions[props.activityNumber]}</Text>
          <View style={styles.vector}></View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        {text === "" && <Text style={styles.placeholder}>Type here</Text>}
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder=""
          multiline={true}
        />
      </View>
      <Button
        onClick={() => {
          console.log("Button clicked!");
        }}
        additionalStyle={styles.buttonColor}
      >
        CONTINUE
      </Button>
    </SafeAreaView>
  );
}
