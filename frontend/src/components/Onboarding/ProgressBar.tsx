import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { lightModeColors } from "@/constants/colors";

type ProgressBarProps = {
  progress: number;
  style?: StyleProp<ViewStyle>;
  fillColor?: StyleProp<ViewStyle>;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style, fillColor }) => {
  const progressPercent = (progress * 100).toFixed(0);
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.fill, { width: `${progressPercent}%` } as ViewStyle, fillColor]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: 300,
    backgroundColor: lightModeColors.progressBarBackground,
    borderRadius: 12,
    overflow: "hidden",
    alignSelf: "center",
  },
  fill: {
    borderRadius: 12,
    height: "100%",
    backgroundColor: lightModeColors.onboardingGreen,
  },
});
