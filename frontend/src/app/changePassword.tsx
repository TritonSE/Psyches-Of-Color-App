import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import Header from "@/components/Header";
import { lightModeColors } from "@/constants/colors";
import { logout } from "@/lib/auth";
import { router } from "expo-router";

export default function ChangePassword() {
  return (
    <SafeAreaView>
      <Header title="Change Password" />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.description}>
          Please log out and go through the forgot password flow to reset your password.{" "}
        </Text>
        <Button
          style={styles.button}
          onPress={() => {
            void logout();
            router.replace("login");
          }}
        >
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 80,
    marginHorizontal: "auto",
    width: "90%",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontFamily: "SG-DemiBold",
    fontSize: 18,
  },
  description: {
    fontFamily: "Archivo",
    fontWeight: "400",
    fontSize: 16,
    color: lightModeColors.neutralFont,
  },
  button: {
    marginTop: 32,
  },
});
