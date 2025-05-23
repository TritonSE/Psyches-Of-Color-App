import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import IconPassHide from "@/assets/icon-pass-hide.svg";
import IconPassShow from "@/assets/icon-pass-show.svg";
import { lightModeColors } from "@/constants/colors";

type BaseInputBoxProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: React.ComponentProps<typeof TextInput>["style"];
  containerStyle?: React.ComponentProps<typeof View>["style"];
  labelStyle?: React.ComponentProps<typeof Text>["style"];
  errorMessage?: string;
  hidden?: boolean;
} & React.ComponentProps<typeof TextInput>;

// For type checking, so that `onForgotPassword` can't been passed in when `showForgotPassword` is false
type WithForgotPasswordInputBoxProps = {
  showForgotPassword: true;
  onForgotPassword: () => void;
} & BaseInputBoxProps;

type WithoutForgotPasswordInputBoxProps = {
  showForgotPassword?: false;
  onForgotPassword?: never;
} & BaseInputBoxProps;

type InputBoxProps = WithForgotPasswordInputBoxProps | WithoutForgotPasswordInputBoxProps;

/**
 * Form input component containing the label, input box, and error messages.
 * If `isPassword` is true, the input is hidden and a password visibility toggle is shown.
 *
 * Additional props are passed to the internal `TextInput` component.
 *
 * Note: Input validation state should be handled by the parent component.
 *
 * @param {string} props.label - Label for the input box
 * @param {string} props.placeholder - Optional laceholder text for the input box
 * @param {string} props.value - stateful value of the input
 * @param {function} props.onChangeText - function called when the input text changes with the new text as an argument
 * @param {boolean} props.hidden - whether the user input is hidden, determines if the password visibility toggle is shown - defaults to false
 * @param {boolean} props.showForgotPassword - whether the 'Forgot Password' link is shown - defaults to false
 * @param {function} props.onForgotPassword - optional function to call when the forgot password link is pressed, forgot password link is only shown when this is present AND isPassword is true
 * @param {object} props.style - optional style to apply to the input box
 * @param {object} props.containerStyle - optional style to apply to the container of the label and input box
 * @param {object} props.labelStyle - optional style to apply to the label text
 * @param {string} props.errorMessage - optional error message to display below the input box
 *
 * @returns
 */
const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  hidden = false,
  showForgotPassword = false,
  onForgotPassword,
  style,
  containerStyle,
  labelStyle,
  errorMessage,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(!hidden);

  return (
    <View style={containerStyle}>
      {label && <Text style={[styles.text, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrapper, errorMessage && styles.inputError]}>
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => {
            onChangeText(text.trim());
          }}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!isPasswordVisible}
          {...props}
        />
        {hidden ? (
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!isPasswordVisible);
            }}
            style={styles.iconWrapper}
          >
            {isPasswordVisible ? (
              <IconPassHide width={20} height={20} />
            ) : (
              <IconPassShow width={20} height={20} />
            )}
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
        {showForgotPassword && (
          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "Archivo",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  text: {
    color: lightModeColors.darkFont,
    fontFamily: "Archivo",
    fontSize: 16,
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
    fontFamily: "Archivo",
    color: lightModeColors.error,
    fontSize: 12,
    flex: 1,
  },
  forgotPasswordText: {
    color: lightModeColors.secondaryLightFont,
    fontSize: 12,
    marginLeft: 10,
    fontFamily: "Archivo",
  },
});

export default InputBox;
