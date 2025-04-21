import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

import { lightModeColors } from "@/constants/colors";

type CodeInputProps = {
  length: number;
  onChange: (code: string) => void;
  containerStyle?: React.ComponentProps<typeof View>["style"];
};

const CodeInput: React.FC<CodeInputProps> = ({ length, onChange, containerStyle }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    onChange(newCode.join(""));

    // Move to the next input if the current one is filled
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      e.preventDefault();
      handleChange("", index - 1);
      inputs.current[index - 1]?.focus();
    }
  };

  const handleFocus = () => {
    const firstEmptyIndex = code.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1) {
      inputs.current[firstEmptyIndex]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={digit}
          onChangeText={(text) => {
            handleChange(text, index);
          }}
          onKeyPress={(e) => {
            handleKeyPress(e, index);
          }}
          onFocus={handleFocus}
          keyboardType="number-pad"
          maxLength={1}
          style={[
            styles.input,
            {
              borderColor: inputs.current[index]?.isFocused()
                ? lightModeColors.secondaryLightFont
                : lightModeColors.tertiaryLightFont,
            },
          ]}
          caretHidden
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderColor: lightModeColors.tertiaryLightFont,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 18,
    width: 40,
    height: 40,
  },
});

export default CodeInput;
