import { useRouter } from "expo-router";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

import { lightModeColors } from "@/constants/colors";

type ButtonProps =
  | ({
      href?: string;
      style?: React.ComponentProps<typeof TouchableOpacity>["style"];
      textStyle?: React.ComponentProps<typeof Text>["style"];
      onPress?: ((event: GestureResponderEvent) => void) | undefined;
      children?: string;
    } & React.ComponentProps<typeof TouchableOpacity>)
  | ({
      href?: string;
      style?: React.ComponentProps<typeof TouchableOpacity>["style"];
      textStyle?: never;
      onPress?: ((event: GestureResponderEvent) => void) | undefined;
      children?: React.ReactNode;
    } & React.ComponentProps<typeof TouchableOpacity>);

/**
 * Button component with routing capabilities,
 * all additional props are passed on to the container `TouchableOpacity` component.
 * If children is of type `string`, it will be wrapped in a `Text` component, otherwise it will be rendered as is.
 *
 * @param href - Optional route to navigate to
 * @param style - Optional style to apply to the button container
 * @param onPress - Optional function to call on button press
 * @param children - Elements to render inside the button, will be wrapped in a `Text` component
 *
 */
const Button: React.FC<ButtonProps> = ({ href, style, onPress, textStyle, children, ...props }) => {
  const router = useRouter();

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }

    if (href) {
      router.navigate(href);
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} {...props} onPress={handlePress}>
      {typeof children === "string" ? (
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 358,
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: lightModeColors.buttonFill,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 600,
    color: lightModeColors.lightFont,
    fontFamily: "SG-Medium",
  },
});

export default Button;
