import { useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Mascots from "@/assets/Poc_Mascots.svg";
import BackArrow from "@/assets/back.svg";
import Button from "@/components/Button";
import { lightModeColors } from "@/constants/colors";

export default function Start() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={styles.backButton}
        >
          <BackArrow width={20} height={20} />
        </Pressable>
      </View>
      <View style={styles.topSection}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Let&apos;s check in on you</Text>
        <Text style={styles.text}>
          Let&apos;s take a moment to check in with yourself. These quick questions can help you
          reflect on how you&apos;ve been feeling this week. When you&apos;re ready, click
          Next.{" "}
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.nextButtonContainer}>
          <Button href="/Checkin/check-in">Next</Button>
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
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
    textAlign: "center",
  },
  title: {
    color: lightModeColors.darkFont,
    fontFamily: "SG-DemiBold",
    fontSize: 32,
    fontStyle: "normal",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
    textAlign: "center",
  },
  nextButtonContainer: {
    marginTop: 16,
    alignSelf: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 20,
    paddingTop: 80,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 8,
  },
});
