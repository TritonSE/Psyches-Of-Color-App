import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import QuestionDude from "@/assets/questionDude.svg";
import Button from "@/components/Button";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0,
    paddingTop: 25,
    left: 0,
  },
  questionSection: {
    alignItems: "center",
    flexDirection: "column",
  },
  questionBox: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: 215,
  },
  question: {
    textAlign: "center",
    fontFamily: "Figtree",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  inputContainer: {
    position: "relative",
    width: 358,
    borderWidth: 1,
    borderColor: "#D9D9D9",
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
    backgroundColor: "#C13D2F",
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
    width: 37,
    height: 37,
    resizeMode: "contain",
  },
});

export function ResponseBox() {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Time To Reflect</Text>
      <View style={styles.questionSection}>
        {/* <Image source={require("@/assets/questionDude.svg")} style={styles.icon} /> */}
        <QuestionDude style={styles.icon} />
        <View style={styles.questionBox}>
          <Text style={styles.question}>
            What is one way you can create a sense of &apos;sunshine&apos; in your space today?
          </Text>
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
        onPress={() => {
          console.log("Button clicked!");
        }}
        style={styles.buttonColor}
      >
        CONTINUE
      </Button>
    </SafeAreaView>
  );
}
