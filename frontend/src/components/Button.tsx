import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: 358,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#B4B4B4",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontFamily: "Inter",
    fontWeight: 900,
    fontSize: 16,
    lineHeight: 24,
  },
});

export function Button(props: {
  onClick: () => void;
  children: string;
  additionalStyle?: ViewStyle | TextStyle;
}) {
  // Update the type of onClick prop
  const { onClick, children, additionalStyle } = props;

  return (
    <TouchableOpacity
      style={[styles.button, additionalStyle]} // Combine styles
      onPress={onClick} // Use onPress for React Native
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}
