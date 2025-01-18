import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, targetScreen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (targetScreen) {
      navigation.navigate(targetScreen);
    } else {
      alert("Page not created");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 358,
    height: 48,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#B4B4B4",
    marginBottom: 32,
  },
  buttonText: {
    fontSize: 17,
    color: "#fff",
  },
});

export default Button;
