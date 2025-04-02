import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import Header from "@/components/Header";
import { lightModeColors } from "@/constants/colors";

export default function EmailSent() {
  const { email } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Header title="Forgot Password" backHref="/login" />
      <View style={styles.contentContainer}>
        <View style={styles.promptContainer}>
          <Text style={styles.title}>Password Reset Email Sent</Text>
          <Text style={styles.description}>
            Check your email ({email}) for instructions on how to reset your password. Then proceed
            to login with your new password.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => {
              router.dismissTo({
                pathname: "/login",
              });
            }}
            style={{
              backgroundColor: lightModeColors.buttonFill,
            }}
          >
            Back to Login
          </Button>
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
});
