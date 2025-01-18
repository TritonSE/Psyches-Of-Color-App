import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputBox = ({ field, value, onChangeText }) => {
  return (
    <View>
      <Text style={styles.text}>{field}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 358,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  text: {
    color: "#000000",
    fontFamily: "Open Sans",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
  },
});

export default InputBox;
