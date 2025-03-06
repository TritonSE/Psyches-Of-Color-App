// src/app/components/SectionButton.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SectionButtonProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

const SectionButton: React.FC<SectionButtonProps> = ({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.sectionCard} onPress={onPress}>
      <View style={styles.sectionText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="menu-outline" size={24} color="black" style={styles.menuIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    display: "flex",
    backgroundColor: "#FFC97E",
    width: "90%",
    paddingVertical: 19.5,
    paddingHorizontal: 26,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: "rgba(30, 30, 30, 1)",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "rgba(30, 30, 30, 1)",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
  },
  menuIcon: {
    position: "absolute",
    right: 26,
    width: 24,
    height: 24,
  },
});

export default SectionButton;
