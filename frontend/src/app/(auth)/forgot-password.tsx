import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputBox from "@/components/InputBox";
import { lightModeColors } from "@/constants/colors";
import { forgotPassword } from "@/lib/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailValidator = z.string().trim().email();

  useEffect(() => {
    const emailValidation = emailValidator.safeParse(email);
    setIsValidEmail(emailValidation.success);
  }, [email]);

  return (
    <View style={styles.container}>
      <Header title="Forgot Password" />
      <View style={styles.contentContainer}>
        <View style={styles.promptContainer}>
          <Text style={styles.title}>Enter email</Text>
          <Text style={styles.description}>
            Enter the email associated with your Psyches of Color account to receive a verification
            code
          </Text>
        </View>
        <InputBox placeholder="Enter Email" value={email} onChangeText={setEmail} />
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => {
              forgotPassword(email)
                .then(() => {
                  router.push({
                    pathname: "/email-sent",
                    params: { email },
                  });
                })
                .catch((error: unknown) => {
                  console.error(error);
                });
            }}
            disabled={!isValidEmail}
            style={{
              backgroundColor: isValidEmail
                ? lightModeColors.buttonFill
                : lightModeColors.mutedFont,
            }}
          >
            Send
          </Button>
          <View style={styles.backToLoginContainer}>
            <Text style={styles.loginText}>Back to </Text>
            <TouchableOpacity onPress={router.back}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    gap: 30,
  },
  promptContainer: {
    gap: 8,
  },
  title: {
    fontFamily: "SG-DemiBold",
    fontSize: 18,
  },
  description: {
    fontFamily: "Archivo",
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
    fontWeight: 300,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  backToLoginContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: lightModeColors.primary,
  },
});
