import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  icon: any; // This should ideally be ImageSourcePropType, but "any" is fine for now
  title: string;
  subtitle?: string; // Mark subtitle as optional
  position?: "top" | "middle" | "bottom"; // Add position prop to distinguish between top, middle, and bottom
  isSaved?: boolean; // Added `isSaved` as an optional prop to apply border-radius for saved sections
};

export default function ButtonItem({ icon, title, subtitle, position, isSaved }: ButtonProps) {
  return (
    <View style={[styles.activityItemContainer, position === "middle" && styles.middle]}>
      <Image
        source={icon}
        style={[
          styles.savedIcon,
          position === "top" && styles.topIcon,
          position === "bottom" && styles.bottomIcon,
          isSaved && styles.savedIconRadius,
        ]}
      />
      <TouchableOpacity
        style={[
          styles.activityItemButton,
          position === "top" && styles.topButton,
          position === "bottom" && styles.bottomButton,
          isSaved && styles.savedButtonRadius,
        ]}
      >
        <View>
          <Text style={styles.activityTitle}>{title}</Text>
          {subtitle && <Text style={styles.activitySubtitle}>{subtitle}</Text>}
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activityItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedIcon: {
    width: 80,
    height: 91,
    marginRight: 0,
  },
  topIcon: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 0,
  },
  bottomIcon: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 15,
  },
  savedIconRadius: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
  },
  activityItemButton: {
    height: 91,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    flex: 1,
  },
  topButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  middle: {
    borderRadius: 0,
  },
  bottomButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
  },
  savedButtonRadius: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1D1B20",
  },
  activitySubtitle: {
    fontSize: 14,
    color: "#1D1B20",
  },
  arrow: {
    marginLeft: "auto", // Push the arrow to the right
    fontSize: 24,
    color: "#1D1B20",
  },
});
