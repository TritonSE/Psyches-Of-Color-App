import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

type SectionButtonProps = {
  title: string;
  subtitle?: string;
  color?: "red" | "yellow" | "green";
  onPress?: () => void;
};

const SectionButton: React.FC<SectionButtonProps> = ({
  color = "red",
  title,
  subtitle,
  onPress,
}) => {
  const primaryColor =
    color === "red"
      ? lightModeColors.primaryRed
      : color === "yellow"
        ? lightModeColors.primaryYellow
        : lightModeColors.primaryGreen;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.sectionCard, { backgroundColor: primaryColor }]}
      onPress={onPress}
    >
      <View style={styles.sectionText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    width: "90%",
    paddingVertical: 19.5,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: lightModeColors.background,
    fontWeight: "700",
    lineHeight: 24,
    textTransform: "uppercase",
    fontFamily: "Archivo",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: lightModeColors.background,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Archivo",
  },
});

export default SectionButton;
