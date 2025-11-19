import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { lightModeColors } from "@/constants/colors";

type ProgressBarProps = {
  progress: number;
  style?: StyleProp<ViewStyle>;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  fillColor?: StyleProp<ViewStyle> | string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style, fillColor }) => {
  const progressPercent = (progress * 100).toFixed(0);

  const widthValue = `${progressPercent}%` as unknown as number | string;

  const fillStyle: StyleProp<ViewStyle> = [
    styles.fill,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    { width: widthValue as any },
    typeof fillColor === "string"
      ? { backgroundColor: fillColor }
      : (fillColor as StyleProp<ViewStyle>),
  ];

  return (
    <View style={[styles.container, style]}>
      <View style={fillStyle} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: 270,
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
