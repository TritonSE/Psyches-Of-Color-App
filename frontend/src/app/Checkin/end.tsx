import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Mascots from "@/assets/Poc_Mascots.svg";
import Button from "@/components/Button";
import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";
import env from "@/util/validateEnv";

export default function Start() {
  const { firebaseUser, refreshMongoUser } = useAuth();

  const handleFinish = async () => {
    try {
      if (!firebaseUser) {
        // No logged-in user; let the button still navigate home
        return;
      }

      const idToken = await firebaseUser.getIdToken();

      const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/users/last-completed-weekly`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.warn("Failed to update weekly check-in timestamp", res.status);
      } else {
        // Refresh local mongo user so UI reflects updated timestamp
        try {
          await refreshMongoUser();
        } catch (e) {
          // non-fatal
          console.warn("Failed to refresh mongo user after updating weekly check-in", e);
        }
      }
    } catch (e) {
      console.error("Error updating weekly check-in:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Thank You!</Text>
        <Text style={styles.text}>
          Nice job checking in. Take a moment to appreciate that you showed up for yourself today.
          Little moments of reflection can make a big difference.{" "}
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.nextButtonContainer}>
          <Button
            onPress={() => {
              void handleFinish();
            }}
            href="/"
          >
            GO TO HOME
          </Button>
        </View>
      </View>

      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    // alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-between",
  },
  topSection: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  bottomSection: {
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 116,
    height: 116,
    marginBottom: 16,
  },
  text: {
    color: lightModeColors.darkFont,
    fontFamily: "Open Sans",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "200",
    lineHeight: 25.5,
    letterSpacing: 0.32,
    textAlign: "center",
  },
  title: {
    color: lightModeColors.darkFont,
    fontFamily: "SG-Medium",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
  nextButtonContainer: {
    marginTop: 16,
    alignSelf: "center",
    justifyContent: "center",
  },
});
