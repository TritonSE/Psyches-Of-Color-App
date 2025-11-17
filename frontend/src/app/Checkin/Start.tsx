import { StatusBar, StyleSheet, Text, View } from "react-native";

import Mascots from "@/assets/Poc_Mascots.svg";
import Button from "@/components/Button";

import { lightModeColors } from "@/constants/colors";

export default function Start() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Let's check in on you</Text>
        <Text style={styles.text}>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Curae phasellus laoreet nullam in
          bibendum ante nec. Blandit sit nunc luctus molestie, sed enim habitasse?{" "}
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.nextButtonContainer}>
          <Button href="/Checkin/check-in">Next</Button>
        </View>
      </View>

      <StatusBar />
    </View>
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
});
