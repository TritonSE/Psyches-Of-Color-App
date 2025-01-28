import { useRouter } from "expo-router";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  href?: string;
  style?: React.ComponentProps<typeof TouchableOpacity>["style"];
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

/**
 * Button component with routing capabilities,
 * all additional props are passed on to the container `TouchableOpacity` component
 *
 * @param href - Optional route to navigate to
 * @param style - Optional style to apply to the button container
 * @param onPress - Optional function to call on button press
 * @param children - Elements to render inside the button, will be wrapped in a `Text` component
 *
 */
const Button: React.FC<ButtonProps> = ({ href, style, onPress, children, ...props }) => {
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
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 358,
    height: 48,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#B4B4B4",
    marginBottom: 32,
  },
  buttonText: {
    fontSize: 17,
    color: "#fff",
  },
});

export default Button;
