import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

type InputBoxProps = {
  placeholder?: string;
  field: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  onForgotPassword?: () => void;
};

const InputBox: React.FC<InputBoxProps> = ({
  field,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  onForgotPassword,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(!isPassword);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    validateInput(value);
  }, [value]);

  const validateInput = (text: string) => {
    if (field.toLowerCase() === "password" && text && text.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
    } else if (
      field.toLowerCase() === "email" &&
      text &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) // this is the regex format for the email
    ) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{field}</Text>
      <View style={[styles.inputWrapper, errorMessage && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isPasswordVisible}
        />
        {isPassword ? (
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!isPasswordVisible);
            }}
            style={styles.iconWrapper}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={lightModeColors.secondaryLightFont}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              onChangeText("");
            }}
            style={styles.iconWrapper}
          >
            <Ionicons name={"close-outline"} size={20} color={lightModeColors.secondaryLightFont} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorRow}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        {onForgotPassword && (
          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: 358,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightModeColors.overlayBackground,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: lightModeColors.darkFont,
  },
  iconWrapper: {
    marginLeft: 10,
  },
  text: {
    color: lightModeColors.darkFont,
    fontFamily: "Open Sans",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 25.5,
    marginBottom: 4,
  },
  inputError: {
    borderColor: lightModeColors.error,
  },
  errorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  errorText: {
    color: lightModeColors.error,
    fontSize: 12,
    flex: 1,
  },
  forgotPasswordText: {
    color: lightModeColors.secondaryLightFont,
    fontSize: 12,
    marginLeft: 10,
  },
});

export default InputBox;
