import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { z } from "zod";

import Mascots from "@/assets/Poc_Mascots.svg";
import Logo from "@/assets/poc-logo.png";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";
import { createMongoUser, signUpEmailPassword } from "@/lib/auth";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setMongoUser } = useAuth();

  // input validators
  const firstNameValidator = z.string().min(1, { message: "First name is required." });
  const lastNameValidator = z.string().min(1, { message: "Last name is required." });
  const emailValidator = z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." });
  const passwordValidator = z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." });
  useEffect(() => {
    // Clear errors when the user starts typing again
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
  }, [email, password]);
  // Validates email and password and sets error messages
  // Returns true if both email and password are valid, false otherwise
  const validateInputs = () => {
    const firstNameValidation = firstNameValidator.safeParse(firstName);
    const lastNameValidation = lastNameValidator.safeParse(lastName);
    const emailValidation = emailValidator.safeParse(email);
    const passwordValidation = passwordValidator.safeParse(password);
    if (!firstNameValidation.success) {
      setFirstNameError(firstNameValidation.error.errors[0].message);
    } else {
      setFirstNameError("");
    }
    if (!lastNameValidation.success) {
      setLastNameError(lastNameValidation.error.errors[0].message);
    } else {
      setLastNameError("");
    }
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
    return (
      firstNameValidation.success &&
      lastNameValidation.success &&
      emailValidation.success &&
      passwordValidation.success
    );
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
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    try {
      const res = await signUpEmailPassword(email, password);
      // If signup was successful, create MongoDB user
      if (res.success) {
        const mongoUser = await createMongoUser({
          name: `${firstName} ${lastName}`.trim(),
          email,
        });
        setMongoUser(mongoUser);
        return;
      }

      // If signup was unsuccessful, set the appropriate error message
      if (res.error.field === "email") {
        setEmailError(res.error.message);
      } else if (res.error.field === "password") {
        setPasswordError(res.error.message);
      } else {
        Alert.alert(`Error signing up: ${String(res.error.message)}`);
      }
    } catch (error) {
      Alert.alert(`Error signing up: ${String(error)}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <BackButton path="./confirmBackToLogin" />
          <View style={styles.header}>
            <Mascots style={styles.mascots} />
            <Image style={styles.logo} source={Logo} />
          </View>
          <InputBox
            label="First Name"
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={firstNameError}
          />
          <InputBox
            label="Last Name"
            placeholder="Enter Last Name"
            value={lastName}
            onChangeText={setLastName}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={lastNameError}
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
            disabled={loading}
            style={styles.loginButton}
            onPress={() => {
              void handleSignup();
            }}
            textStyle={{ fontFamily: "SG-DemiBold" }}
          >
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: lightModeColors.background,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: lightModeColors.background,
    paddingTop: 32,
    paddingBottom: 64,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  header: {
    flexGrow: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  mascots: {
    width: 253,
    height: 116,
    marginBottom: 16,
  },
  logo: {
    width: 300,
    height: 36,
    marginBottom: 24,
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
