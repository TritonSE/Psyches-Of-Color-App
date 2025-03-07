import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputBox from "@/components/InputBox";
import { lightModeColors } from "@/constants/colors";

export default function ForgotPassword() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);

  const codeValidator = z.string().trim().length(6);

  useEffect(() => {
    const codeValidation = codeValidator.safeParse(code);
    setIsValidCode(codeValidation.success);
  }, [code]);

  return (
    <View style={styles.container}>
      <Header title="Forgot Password" />
      <View style={styles.contentContainer}>
        <View style={styles.promptContainer}>
          <Text style={styles.title}>Enter verification code</Text>
          <Text style={styles.description}>
            Check the email ({email}) associated with your account and enter the code
          </Text>
        </View>
        <InputBox value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6} />
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => {
              console.log("Verify Code");
            }}
            disabled={!isValidCode}
            style={{
              backgroundColor: isValidCode ? lightModeColors.buttonFill : lightModeColors.mutedFont,
            }}
          >
            Check
          </Button>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn&apos;t receive a code? </Text>
            <TouchableOpacity onPress={router.back}>
              <Text style={styles.resendLink}>Resend</Text>
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
  resendContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  resendText: {
    fontSize: 16,
  },
  resendLink: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: lightModeColors.primary,
  },
});
