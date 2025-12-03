import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import DownVector from "@/assets/down_vector.svg";
import UpVector from "@/assets/up_vector.svg";
import { lightModeColors } from "@/constants/colors";

type QuestionProps = {
  type: "multipleChoice" | "shortAnswer" | "longAnswer";
  question: string;
  options?: string[];
  onAnswer: (answer: string) => void;
  placeholder?: string;
  otherOptions?: string[];
  currentAnswer?: string;
  variant?: "onboarding" | "activity";
};

export const Question = ({
  type,
  question,
  options = [],
  onAnswer,
  placeholder,
  otherOptions = [],
  currentAnswer,
  variant,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showOtherDropdown, setShowOtherDropdown] = useState<boolean>(false);
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);

  // -----------------------------
  // SYNC STATE FROM PARENT
  // -----------------------------
  useEffect(() => {
    setSelectedAnswer(currentAnswer ?? "");

    const otherKeywords = ["Other", ...otherOptions];
    const isCustomOther =
      currentAnswer && !options.includes(currentAnswer) && currentAnswer.trim() !== "";

    if (otherKeywords.includes(currentAnswer ?? "") || isCustomOther) {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      setShowOtherDropdown(false);
    }
  }, [question, currentAnswer]);

  // -----------------------------
  // MAIN OPTION SELECTION
  // -----------------------------
  const handleSelectOption = (option: string) => {
    const selectingOther = option === "Other" || otherOptions.includes(option);

    setIsOtherSelected(selectingOther);

    if (selectingOther) {
      // start empty when Other is selected
      setSelectedAnswer("");
      onAnswer(""); // notify parent
    } else {
      setSelectedAnswer(option);
      onAnswer(option);
      setShowOtherDropdown(false);
    }
  };

  // -----------------------------
  // OTHER SUB-OPTION SELECTION
  // -----------------------------
  const handleSelectOtherOption = (otherOption: string) => {
    setIsOtherSelected(true);
    setShowOtherDropdown(false);
    setSelectedAnswer(otherOption);
    onAnswer(otherOption);
  };

  // -----------------------------
  // FREE-TEXT INPUT HANDLER
  // -----------------------------
  const handleChangeText = (text: string) => {
    setIsOtherSelected(true);
    setSelectedAnswer(text);
    onAnswer(text);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.questionText,
          variant === "onboarding" && styles.onboardingQuestionText,
          variant === "activity" && styles.activityQuestionText,
        ]}
      >
        {question}
      </Text>

      {type === "multipleChoice" && (
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            if (option === "Other") {
              return (
                <View key="other-wrapper">
                  <TouchableOpacity
                    style={[styles.optionButton, isOtherSelected && styles.optionButtonSelected]}
                    onPress={() => {
                      setIsOtherSelected(true);
                      setShowOtherDropdown((prev) => !prev);
                      handleSelectOption("Other");
                    }}
                  >
                    <View style={styles.otherRow}>
                      <Text style={styles.optionText}>Other</Text>

                      {showOtherDropdown ? (
                        <UpVector style={styles.vector} />
                      ) : (
                        <DownVector style={styles.vector} />
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* OTHER SUB-OPTIONS */}
                  {showOtherDropdown && otherOptions.length > 0 && (
                    <View style={styles.dropdownContainer}>
                      {otherOptions.map((otherOption) => (
                        <TouchableOpacity
                          key={otherOption}
                          style={styles.dropdownOption}
                          onPress={() => handleSelectOtherOption(otherOption)}
                        >
                          <Text style={styles.optionText}>{otherOption}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* FREE TEXT FIELD */}
                  {isOtherSelected && (
                    <View style={{ marginTop: 8 }}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Please specify..."
                        value={selectedAnswer}
                        onChangeText={handleChangeText}
                        multiline={true}
                      />
                    </View>
                  )}
                </View>
              );
            }

            // NORMAL OPTIONS
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.optionButtonSelected,
                ]}
                onPress={() => {
                  setIsOtherSelected(false);
                  setShowOtherDropdown(false);
                  handleSelectOption(option);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {(type === "shortAnswer" || type === "longAnswer") && (
        <View style={{ width: "100%", alignItems: "center" }}>
          <TextInput
            style={[styles.textInput, type === "longAnswer" && styles.longTextInput]}
            value={selectedAnswer}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            multiline={type === "longAnswer"}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  onboardingQuestionText: {
    color: "#1e1e1e",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "SG-Bold",
    marginBottom: 16,
    textAlign: "center",
  },
  activityQuestionText: {
    color: lightModeColors.onboardingGreen,
    fontFamily: "Archivo",
    fontSize: 18,
    marginBottom: 64,
    textAlign: "center",
    width: 302,
  },
  questionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  optionsContainer: {
    marginTop: 16,
    gap: 24,
    marginBottom: 16,
  },
  optionButton: {
    display: "flex",
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 44,
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: lightModeColors.progressBarBackground,
    backgroundColor: "#fff",
    width: 358,
    alignSelf: "center",
  },
  optionButtonSelected: {
    backgroundColor: lightModeColors.optionButtonSelected,
    borderColor: lightModeColors.selectedBorder,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  textInput: {
    width: 358,
    height: 75,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2E563C",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginTop: 8,
    textAlignVertical: "top",
    alignSelf: "center",
  },
  longTextInput: {
    width: 358,
    height: 284,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2E563C",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginTop: 8,
    textAlignVertical: "top",
    alignSelf: "center",
  },
  dropdownContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: lightModeColors.questionBorder,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 358,
    alignSelf: "center",
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
  },
  otherRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  vector: {
    position: "absolute",
    right: -24,
  },
});
