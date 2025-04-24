import { useRouter } from "expo-router";
import React, { useState } from "react";
// eslint-disable-next-line import/namespace
import { Pressable, StyleSheet, Text, View } from "react-native";

import NextButton from "../../components/NextButton";

import ProgressBar from "./ProgressBar";
import { Question } from "./Question";

import Mascots from "@/assets/Poc_Mascots.svg";
import BackArrow from "@/assets/back.svg";
import { lightModeColors } from "@/constants/colors";
type QuestionData = {
  type: "multipleChoice" | "shortAnswer";
  question: string;
  options?: string[];
  placeholder?: string;
  otherOptions?: string[];
};

const CheckIn: React.FC = () => {
  const questions: QuestionData[] = [
    {
      type: "multipleChoice",
      question: "How many times have you reached out to someone that feels safe this week?",
      options: ["0", "1", "2", "3+"],
    },
    {
      type: "multipleChoice",
      question: "How often have you felt like you were kind to yourself this week?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
    {
      type: "multipleChoice",
      question: "How much time have you spent reflecting on or expressing gratitude this week?",
      options: ["None", "A little time", "Moderate amount", "A lot"],
    },
    {
      type: "multipleChoice",
      question: "How many times this week have you moved your body?",
      options: ["0", "1", "2", "3+"],
    },
    {
      type: "multipleChoice",
      question: "How confident have you felt in managing your mental health this week?",
      options: ["Not at all", "Slightly confident", "Moderately confident", "Very confident"],
    },
    {
      type: "multipleChoice",
      question: "Did you intentionally avoid things that drain your energy? If so, how many times?",
      options: ["0", "1", "2", "3+"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>(
    Array(questions.length).fill(undefined),
  );

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex] ?? "";

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered:", answers);
      router.push("/Checkin/end");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isNextDisabled = !currentAnswer;

  if (currentIndex < 0 || currentIndex >= questions.length) {
    return null;
  }

  return (
    <>
      <View style={styles.header}>
        {currentIndex > 0 && (
          <Pressable onPress={handleBack} style={styles.backButton}>
            <BackArrow width={20} height={20} />
          </Pressable>
        )}
        <Text style={styles.headerTitle}>Check In</Text>
      </View>

      <View style={styles.container}>
        <ProgressBar progress={currentIndex / questions.length} />
        <View style={styles.logoContainer}>
          <Mascots style={styles.logo} />
        </View>

        <Question
          type={currentQuestion.type}
          question={currentQuestion.question}
          options={currentQuestion.options}
          placeholder={currentQuestion.placeholder}
          otherOptions={currentQuestion.otherOptions}
          onAnswer={handleAnswer}
        />

        <View style={styles.nextButtonContainer}>
          <NextButton onPress={handleNext} disabled={!!isNextDisabled} />
        </View>
      </View>
    </>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: lightModeColors.background,
    justifyContent: "flex-start",
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  nextButtonContainer: {
    display: "flex",
    width: 358,
    height: 48,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#2E563C",
    borderRadius: 100,
  },
  nextButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "SG-DemiBold",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.16,
  },
  rectangleView: {
    borderRadius: 12,
    marginTop: 27,
    backgroundColor: "#d9d9d9",
    height: 116,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: lightModeColors.background,
  },
  headerTitle: {
    display: "flex",
    width: 169,
    height: 22,
    flexDirection: "column",
    justifyContent: "center",
    color: "#6C6C6C",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 27,
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 8,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 253,
    height: 115,
    flexShrink: 0,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 25,
  },
});
