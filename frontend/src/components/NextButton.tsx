import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

type NextButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  textOption?: string;
};

const NextButton: React.FC<NextButtonProps> = ({ onPress, disabled = false, textOption }) => {
  return (
    <Pressable
      style={[styles.button, styles.buttonFlexBox, disabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.stateLayer, styles.buttonFlexBox]}>
        <Text style={styles.labelText}>{textOption}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 24,
    fontFamily: "SG-Medium",
    color: lightModeColors.lightFont,
    textAlign: "center",
  },
  stateLayer: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 100,
    backgroundColor: lightModeColors.onboardingGreen,
    width: "100%",
    height: 48,
    overflow: "hidden",
  },
});

export default NextButton;
