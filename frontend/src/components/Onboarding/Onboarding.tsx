// Onboarding.tsx

import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import NextButton from "../NextButton";

import ProgressBar from "./ProgressBar";
import { Question } from "./Question";

type QuestionData = {
  type: "multipleChoice" | "shortAnswer";
  question: string;
  options?: string[];
  placeholder?: string;
  otherOptions?: string[];
};

const Onboarding: React.FC = () => {
  const questions: QuestionData[] = [
    {
      type: "multipleChoice",
      question: "How old are you?",
      options: ["Under 18", "18–24", "25–34", "35–44", "45 and over"],
    },
    {
      type: "multipleChoice",
      question: "What gender do you identify with?",
      options: ["Male", "Female", "Non-binary", "Other"],
      otherOptions: ["Trans-Male", "Trans-Female", "Gender Non-Conforming"],
    },
    {
      type: "multipleChoice",
      question: "What is your highest level of education?",
      options: [
        "Current Middle Schooler",
        "Middle School Graduate",
        "Current High Schooler",
        "High School Graduate",
        "GED or Secondary School Certification",
        "Current College Student",
        "College Graduate",
      ],
    },
    {
      type: "shortAnswer",
      question: "Where do you reside in?",
      placeholder: "Enter City, State",
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

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered:", answers);
    }
  };

  const isNextDisabled = !currentAnswer;

  return (
    <View style={styles.container}>
      <ProgressBar progress={(currentIndex + 1) / questions.length} />
      <View style={styles.rectangleView} />
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
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  nextButtonContainer: {
    marginTop: 16,
    alignSelf: "center",
    width: "100%",
  },
  rectangleView: {
    borderRadius: 12,
    marginTop: 27,
    backgroundColor: "#d9d9d9",
    height: 116,
    width: "100%",
  },
});
