import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type NextButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

const NextButton: React.FC<NextButtonProps> = ({ onPress, disabled = false }) => {
  return (
    <Pressable
      style={[styles.button, styles.buttonFlexBox, disabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.stateLayer, styles.buttonFlexBox]}>
        <Text style={styles.labelText}>Next</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 24,
    fontFamily: "Social Gothic",
    color: "#fff",
    textAlign: "center",
  },
  stateLayer: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#d35144",
    width: "100%",
    height: 48,
    overflow: "hidden",
  },
});

export default NextButton;
