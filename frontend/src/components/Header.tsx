import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Back from "@/assets/back.svg";
import { lightModeColors } from "@/constants/colors";

type BaseHeaderProps = {
  title?: string;
  style?: React.ComponentProps<typeof View>["style"];
  titleStyle?: React.ComponentProps<typeof Text>["style"];
};

type BackHrefHeaderProps = {
  showBackButton: true;
  backHref: string;
  onBackButtonPressed?: never;
};

type OnBackButtonPressedHeaderProps = {
  showBackButton: true;
  backHref?: never;
  onBackButtonPressed: () => void;
};

type NoBackButtonHeaderProps = {
  showBackButton?: false;
  backHref?: never;
  onBackButtonPressed?: never;
};

type HeaderProps = BaseHeaderProps &
  (BackHrefHeaderProps | OnBackButtonPressedHeaderProps | NoBackButtonHeaderProps);

/**
 * Reusable header component for all pages.
 *
 * @param title - Optional text displayed in the middle of the header
 * @param backHref - Optional route to navigate to when the back button is pressed
 * @param onBackButtonPressed - Optional function called when back button is pressed. Used when more control over the back button is needed. Should not be present simultaneously as `backHref`.
 * @param style - Optional styles passed to the container
 * @param titleStyle - Optional styles passed to the title text
 *
 */
const Header: React.FC<HeaderProps> = ({
  title,
  style,
  backHref,
  onBackButtonPressed,
  titleStyle,
}) => {
  const handlePress = () => {
    if (backHref) {
      router.navigate(backHref);
    } else if (onBackButtonPressed) {
      onBackButtonPressed();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.backContainer} onPress={handlePress}>
        <Back
          style={styles.back}
          fill={lightModeColors.secondaryLightFont}
          width={30}
          height={30}
        />
      </TouchableOpacity>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  backContainer: {
    position: "absolute",
    left: 15,
  },
  back: {
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: "SG-DemiBold",
    color: lightModeColors.secondaryLightFont,
    fontSize: 18,
  },
});

export default Header;
