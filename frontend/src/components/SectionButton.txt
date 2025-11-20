import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

type SectionButtonProps = {
  title: string;
  subtitle?: string;
  color?: "red" | "yellow" | "green";
};

const SectionButton: React.FC<SectionButtonProps> = ({ color = "red", title, subtitle }) => {
  const primaryColor =
    color === "red"
      ? lightModeColors.primaryRed
      : color === "yellow"
        ? lightModeColors.primaryYellow
        : lightModeColors.primaryGreen;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.sectionCard,
          {
            backgroundColor: primaryColor,
            borderRadius: 12,
          },
        ]}
      >
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 12,
    position: "relative",
  },
  sectionCard: {
    paddingVertical: 19.5,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    color: lightModeColors.background,
    fontWeight: "700",
    lineHeight: 24,
    textTransform: "uppercase",
    fontFamily: "Archivo",
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: lightModeColors.background,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Archivo",
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    zIndex: 10,
    width: "100%",
    backgroundColor: "white",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0, // Remove the top border to avoid double borders
  },
  dropdownItem: {
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: lightModeColors.tertiaryLightFont,
  },
});

export default SectionButton;
