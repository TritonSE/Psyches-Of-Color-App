import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { lightModeColors } from "@/constants/colors";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressPercent = (progress * 100).toFixed(0);
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${progressPercent}%` } as ViewStyle]} />
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
