import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import Mascots from "@/assets/Poc_Mascots.svg";
import GoogleLogo from "@/assets/logo-google.svg";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { lightModeColors } from "@/constants/colors";
import { loginEmailPassword, signInWithGoogle } from "@/lib/auth";

export default function Login() {
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

  // Event handlers
  const handleGoogleLogin = async () => {
    // Prevent spam clicking
    if (loading) {
      return;
    }

    setLoading(true);

    await signInWithGoogle();

    setLoading(false);
  };

  const handleLogin = async () => {
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

    const res = await loginEmailPassword(email, password);

    setLoading(false);

    // If login was successful, we don't need to do anything
    // redirection happens in auth context
    if (res.success) {
      return;
    }

    // If login was unsuccessful, set the appropriate error message
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
      <View style={styles.header}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Psyches of Color</Text>
      </View>
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
        isPassword={true}
        onForgotPassword={() => {
          // TODO: redirect to forgot password page where they can fill in an email
          console.log("Forgot Password pressed");
        }}
        containerStyle={{ marginBottom: 16 }}
        errorMessage={passwordError}
      />

      <Button
        style={styles.loginButton}
        onPress={() => {
          void handleLogin();
        }}
        textStyle={{ fontFamily: "SG-DemiBold" }}
      >
        Login
      </Button>
      <View style={styles.continueWithTextContainer}>
        <View style={styles.line}></View>
        <Text style={styles.continueWithText}>Or continue with</Text>
        <View style={styles.line}></View>
      </View>
      <Button
        onPress={() => {
          void handleGoogleLogin();
        }}
        style={{ gap: 16 }}
      >
        <GoogleLogo width={24} height={24} />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: lightModeColors.lightFont,
            fontFamily: "SG-DemiBold",
          }}
        >
          Continue with Google
        </Text>
      </Button>
      <Text style={styles.signupText}>
        {"Don't have an account? "}
        <Link href="/signup" style={styles.signupLink}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexGrow: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
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
  continueWithTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    marginVertical: 16,
  },
  continueWithText: {
    color: lightModeColors.mutedFont,
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: "Figtree",
  },
  line: {
    flex: 1, // Ensures the lines take up equal width
    height: 1,
    backgroundColor: lightModeColors.overlayBackground,
  },
  signupText: {
    marginTop: 20,
    fontFamily: "Figtree",
    fontSize: 17,
    color: lightModeColors.darkFont,
  },
  signupLink: {
    textDecorationLine: "underline",
    fontFamily: "Figtree",
  },
});
