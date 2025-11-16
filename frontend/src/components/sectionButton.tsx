import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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

  // State to track whether the dropdown is visible or not
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.sectionCard,
          {
            backgroundColor: primaryColor,
            borderBottomLeftRadius: isDropdownVisible ? 0 : 12,
            borderBottomRightRadius: isDropdownVisible ? 0 : 12,
          },
        ]}
        onPress={toggleDropdown}
      >
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons
          name="menu-outline"
          size={24}
          color={lightModeColors.background}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Conditionally render dropdown options if the state is true */}
      {isDropdownVisible && (
        <View
          style={[
            styles.dropdown,
            {
              borderColor: primaryColor,
            },
          ]}
        >
          <TouchableOpacity>
            <Text style={styles.dropdownItem}>Header 1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.dropdownItem}>Header 2</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.dropdownItem}>Header 3</Text>
          </TouchableOpacity>
        </View>
      )}
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
