import { useRouter } from "expo-router"; // Import the useRouter hook
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

type ButtonProps = {
  icon: ImageSourcePropType;
  title: string;
  subtitle?: string; // Mark subtitle as optional
  position?: "top" | "middle" | "bottom"; // Add position prop to distinguish between top, middle, and bottom
  isSaved?: boolean; // Added isSaved as an optional prop to apply border-radius for saved sections
};

export default function ButtonItem({ icon, title, subtitle, position, isSaved }: ButtonProps) {
  const router = useRouter(); // Initialize the router

  // Navigate to randomPage when the button is pressed
  const navigateToRandomPage = () => {
    router.push("/randomPage"); // This will navigate to randomPage.tsx
  };

  return (
    <TouchableOpacity
      style={[
        styles.activityItemContainer,
        position === "middle" && styles.middle,
        position === "top" && styles.topButton,
        position === "bottom" && styles.bottomButton,
        isSaved && styles.savedButtonRadius,
      ]}
      onPress={navigateToRandomPage} // Trigger navigation on button press
    >
      <Image
        source={icon}
        style={[
          styles.savedIcon,
          position === "top" && styles.topIcon,
          position === "bottom" && styles.bottomIcon,
          isSaved && styles.savedIconRadius,
        ]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.activityTitle}>{title}</Text>
        {subtitle && <Text style={styles.activitySubtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activityItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightModeColors.lightFont,
    height: 89,
    padding: 0,
    margin: 0,
    flex: 1,
    paddingRight: 16,
  },
  savedIcon: {
    width: 80,
    height: 89,
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
    borderBottomLeftRadius: 15,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Top button with border on left top and right side only
  topButton: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 1, // border on top
    borderLeftWidth: 1, // border on the left
    borderRightWidth: 1, // border on the right
    borderColor: lightModeColors.overlayBackground, // border color
  },

  // Middle button with border on left and right sides only
  middle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderLeftWidth: 1, // border on the left
    borderRightWidth: 1, // border on the right
    borderColor: lightModeColors.overlayBackground, // border color
  },

  // Bottom button with border on bottom left and right only
  bottomButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 1, // border on bottom
    borderLeftWidth: 1, // border on the left
    borderRightWidth: 1, // border on the right
    borderColor: lightModeColors.overlayBackground, // border color
  },

  savedButtonRadius: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderColor: lightModeColors.overlayBackground,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: lightModeColors.secondaryDarkFont,
  },
  activitySubtitle: {
    fontSize: 14,
    color: lightModeColors.secondaryDarkFont,
  },
  arrow: {
    marginLeft: "auto",
    fontSize: 24,
    color: lightModeColors.secondaryDarkFont,
  },
});
