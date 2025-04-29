/* eslint-disable */
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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

  const totalSteps = questions.length + 1; // +1 for intro mood screen

  const [currentIndex, setCurrentIndex] = useState(-1); // Start at -1 (mood screen)
  const [answers, setAnswers] = useState<(string | undefined)[]>(
    Array(questions.length).fill(undefined),
  );
  const router = useRouter();

  const currentQuestion = questions[currentIndex] || null;
  const currentAnswer = currentIndex >= 0 ? (answers[currentIndex] ?? "") : "";

  const handleAnswer = (answer: string) => {
    if (currentIndex >= 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = answer;
      setAnswers(updatedAnswers);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered:", answers);
      router.push("/Checkin/end");
    }
  };

  const handleBack = () => {
    if (currentIndex === -1) {
      router.back(); // Leave the check-in flow
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isNextDisabled = currentIndex >= 0 && !currentAnswer;

  if (currentIndex === -1) {
    return (
      <>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <BackArrow width={20} height={20} />
          </Pressable>
          <Text style={styles.headerTitle}>Check In</Text>
        </View>

        <View style={styles.container}>
          <ProgressBar progress={(currentIndex + 1) / totalSteps} />
          <View style={styles.logoContainer}>
            <Image source={require("@/assets/howyouddoing.png")} style={styles.moodImage} />
          </View>
          <View style={styles.moodOptionsContainer}>
            {["Amazing", "Good", "Meh", "Bad", "Awful"].map((mood) => (
              <Pressable
                key={mood}
                style={styles.moodOption}
                onPress={() => setCurrentIndex(0)} // Move to first question
              >
                <Image source={require("@/assets/moodface.png")} style={styles.moodImageSelector} />
                <Text style={styles.moodText}>{mood}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <BackArrow width={20} height={20} />
        </Pressable>
        <Text style={styles.headerTitle}>Check In</Text>
      </View>

      <View style={styles.container}>
        <ProgressBar progress={(currentIndex + 1) / totalSteps} />
        <View style={styles.logoContainer}>
          <Mascots style={styles.logo} />
        </View>

        {currentQuestion && (
          <Question
            type={currentQuestion.type}
            question={currentQuestion.question}
            options={currentQuestion.options}
            placeholder={currentQuestion.placeholder}
            otherOptions={currentQuestion.otherOptions}
            onAnswer={handleAnswer}
          />
        )}

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
    width: 169,
    height: 22,
    flexDirection: "column",
    justifyContent: "center",
    color: "#6C6C6C",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 27,
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 8,
  },
  logo: {
    width: 253,
    height: 115,
    flexShrink: 0,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -20,
    marginTop: 15,
  },
  moodOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  moodOption: {
    alignItems: "center",
    marginHorizontal: 6,
    marginVertical: 6,
    width: 60,
  },
  moodImageSelector: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 25,
    marginBottom: 8,
  },
  moodText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
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
  moodImage: {
    width: 350,
    height: 250,
    resizeMode: "contain",
  },
});
