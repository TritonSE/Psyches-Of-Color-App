import { useEffect, useState } from "react";
// eslint-disable-next-line import/namespace
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type QuestionProps = {
  type: "multipleChoice" | "shortAnswer";
  question: string;
  options?: string[];
  onAnswer: (answer: string) => void;
  placeholder?: string;
  otherOptions?: string[];
};

export const Question = ({
  type,
  question,
  options = [],
  onAnswer,
  placeholder,
  otherOptions = [],
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showOtherDropdown, setShowOtherDropdown] = useState<boolean>(false);

  useEffect(() => {
    setSelectedAnswer("");
    setShowOtherDropdown(false);
  }, [question]);

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
    onAnswer(option);
  };

  const handleChangeText = (text: string) => {
    setSelectedAnswer(text);
    onAnswer(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>

      {type === "multipleChoice" && (
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            if (option === "Other") {
              return (
                <View key="other-wrapper">
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      selectedAnswer === "Other" && styles.optionButtonSelected,
                    ]}
                    onPress={() => {
                      // Toggle dropdown when "Other" is pressed
                      setShowOtherDropdown((prev) => !prev);
                    }}
                  >
                    <Text style={[styles.optionText]}>Other</Text>
                  </TouchableOpacity>
                  {showOtherDropdown && otherOptions.length > 0 && (
                    <View style={styles.dropdownContainer}>
                      {otherOptions.map((otherOption) => (
                        <TouchableOpacity
                          key={otherOption}
                          style={styles.dropdownOption}
                          onPress={() => {
                            setShowOtherDropdown(false);
                            handleSelectOption(otherOption);
                          }}
                        >
                          <Text style={styles.dropdownOptionText}>{otherOption}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            } else {
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => {
                    setShowOtherDropdown(false);
                    handleSelectOption(option);
                  }}
                >
                  <Text style={[styles.optionText]}>{option}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      )}

      {type === "shortAnswer" && (
        <TextInput
          style={styles.textInput}
          value={selectedAnswer}
          onChangeText={handleChangeText}
          placeholder={placeholder}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 358,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  questionText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Archivo",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 16,
    gap: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  optionButton: {
    width: 358,
    display: "flex",
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 44,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    backgroundColor: "#FFF",
  },
  optionButtonSelected: {
    backgroundColor: "#B4EFFB",
    borderColor: "#5ECBFF",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
  },
  dropdownContainer: {
    marginTop: 4,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});
