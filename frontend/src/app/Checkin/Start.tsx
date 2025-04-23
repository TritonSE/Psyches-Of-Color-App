// eslint-disable-next-line import/namespace
import { StatusBar, StyleSheet, Text, View } from "react-native";

import Mascots from "@/assets/Poc_Mascots.svg";
import Button from "@/components/Button";
import { lightModeColors } from "@/constants/colors";

export default function Start() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Mascots style={styles.logo} />
        <Text style={styles.title}>Lets check in on you!</Text>
        <View style={styles.textLayout}>
          <Text style={styles.text}>
            hi hi hi hi hiLorem ipsum odor amet, consectetuer adipiscing elit. Curae phasellus
            laoreet nullam in bibendum ante nec. Blandit sit nunc luctus molestie, sed enim
            habitasse?{" "}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.nextButtonContainer}>
          <Button
            href="/Checkin/check-in"
            style={{
              width: 358,
              height: 48,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              borderRadius: 100,
              backgroundColor: "#2E563C",
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Button>
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
    flexShrink: 0,
    // width: 150,
    // height: 50,
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 116,
    height: 116,
    marginBottom: 16,
  },
  textLayout: {
    display: "flex",
    // height: 6.95081rem;
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    alignSelf: "stretch",
    alignItems: "center",
    marginRight: 50,
    marginLeft: 50,
  },
  text: {
    color: "#000000",
    fontFamily: "Archivo",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
    textAlign: "center",
  },
  title: {
    color: "#000000",
    fontFamily: "SG-Bold",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 45,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
  nextButtonContainer: {
    display: "flex",
    marginTop: 16,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "SG-DemiBold",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.16,
  },
});
