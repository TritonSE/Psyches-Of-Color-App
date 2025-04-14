import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import InputBox from "@/components/InputBox";
import Mascots from "@/assets/Poc_Mascots.svg";
import { lightModeColors } from "@/constants/colors";
import { z } from "zod";
import Button from "@/components/Button";
import { router } from "expo-router";
import { signUpEmailPassword } from "@/lib/auth";
import BackButton from "@/components/BackButton";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  // input validators
  const emailValidator = z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." });
  const passwordValidator = z
    .string()
    .trim()
    .min(8, { message: "Password must be 8 characters long." });
  useEffect(() => {
    // Clear errors when the user starts typing again
    setEmailError("");
    setPasswordError("");
  }, [email, password]);
  // Validates email and password and sets error messages
  // Returns true if both email and password are valid, false otherwise
  const validateInputs = () => {
    const emailValidation = emailValidator.safeParse(email);
    const passwordValidation = passwordValidator.safeParse(password);
    if (!emailValidation.success) {
      setEmailError(emailValidation.error.errors[0].message);
    } else {
      setEmailError("");
    }
    if (!passwordValidation.success) {
      setPasswordError(passwordValidation.error.errors[0].message);
    } else {
      setPasswordError("");
    }
    return emailValidation.success && passwordValidation.success;
  };

  const handleSignup = async () => {
    // Prevent spam clicking
    if (loading) {
      return;
    }
    if (!validateInputs()) {
      return;
    }
    // clear errors
    setEmailError("");
    setPasswordError("");
    setLoading(true);
    const res = await signUpEmailPassword(email, password);
    setLoading(false);
    // If signup was successful, we don't need to do anything
    // redirection happens in auth context
    if (res.success) {
      return;
    }
    // If signup was unsuccessful, set the appropriate error message
    if (res.error.field === "email") {
      setEmailError(res.error.message);
    } else if (res.error.field === "password") {
      setPasswordError(res.error.message);
    } else {
      // Unknown error
      // TODO: maybe have a general error message at the top of the form
      setPasswordError(res.error.message);
      setEmailError(res.error.message);
    }
  };
  return (
    <View style={styles.container}>
      <BackButton path="./confirmBackToLogin" />
      <View style={styles.header}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Psyches of Color</Text>
      </View>
      <InputBox
        label="First Name"
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={setFirstName}
        containerStyle={{ marginBottom: 16 }}
      />
      <InputBox
        label="Last Name"
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={setLastName}
        containerStyle={{ marginBottom: 16 }}
      />
      <InputBox
        label="Email"
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        containerStyle={{ marginBottom: 16 }}
        errorMessage={emailError}
      />
      <InputBox
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        containerStyle={{ marginBottom: 16 }}
        errorMessage={passwordError}
        hidden={true}
      />
      <Button
        style={styles.loginButton}
        onPress={() => {
          void handleSignup();
        }}
        textStyle={{ fontFamily: "SG-DemiBold" }}
      >
        Next
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexGrow: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 253,
    height: 116,
    marginBottom: 16,
  },
  title: {
    color: lightModeColors.darkFont,
    fontFamily: "SG-DemiBold",
    fontSize: 32,
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
  },
  bottomHalfContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  continueWithTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  continueWithText: {
    color: lightModeColors.mutedFont,
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: "Archivo",
  },
  line: {
    flex: 1, // Ensures the lines take up equal width
    height: 1,
    backgroundColor: lightModeColors.overlayBackground,
  },
  signupContainer: {
    flexDirection: "row",
    fontFamily: "Archivo",
    color: lightModeColors.darkFont,
  },
  signupText: {
    fontFamily: "Archivo",
    fontSize: 17,
  },
  signupLink: {
    fontSize: 17,
    textDecorationLine: "underline",
    fontFamily: "Archivo",
  },
});
