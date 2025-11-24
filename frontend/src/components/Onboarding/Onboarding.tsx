// Onboarding.tsx

import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import NextButton from "../NextButton";

import ProgressBar from "./ProgressBar";
import { Question } from "./Question";

import Mascots from "@/assets/Poc_Mascots.svg";
import Back from "@/assets/back.svg";
import { lightModeColors } from "@/constants/colors";
import { QuestionData, onboardingQuestions } from "@/constants/questionData";
import env from "@/util/validateEnv";

const QUESTION_ORDER = [
  "ageRange",
  "gender",
  "ethnicity",
  "educationLevel",
  "counselingExperience",
  "residence",
];

type QuestionKey = (typeof QUESTION_ORDER)[number];

type OnboardingInfo = Record<QuestionKey, string>;

async function updateUserOnboardingInfo(onboardingInfo: OnboardingInfo) {
  const firebaseUser = auth().currentUser;
  const idToken = await firebaseUser?.getIdToken();

  if (!firebaseUser || !idToken) return;

  const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/users/${firebaseUser.uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ onboardingInfo, completedOnboarding: true }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status.toString()}`);
  }
}

const Onboarding: React.FC = () => {
  const router = useRouter();

  const questions: QuestionData[] = onboardingQuestions;

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

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      try {
        await handleSubmit();
        router.push("/");
      } catch (error) {
        Alert.alert(`Error saving onboarding info: ${String(error)}`);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const onboardingInfo: OnboardingInfo = {
      ageRange: "N/A",
      gender: "N/A",
      ethnicity: "N/A",
      educationLevel: "N/A",
      counselingExperience: "N/A",
      residence: "N/A",
    };

    QUESTION_ORDER.forEach((question: QuestionKey, i) => {
      const ans = answers[i];
      if (ans !== undefined) {
        onboardingInfo[question] = ans;
      }
    });

    await updateUserOnboardingInfo(onboardingInfo);
  };

  const isNextDisabled = !currentAnswer;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentIndex > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Back />
            {/* <Text style={styles.backText}>{`<--`}</Text> */}
          </TouchableOpacity>
        )}
        <Text style={styles.titleText}>Onboarding</Text>
      </View>

      <ProgressBar progress={(currentIndex + 1) / questions.length} />
      <View style={styles.main}>
        <Mascots style={styles.logo} />
        <Question
          type={currentQuestion.type}
          question={currentQuestion.question}
          options={currentQuestion.options}
          placeholder={currentQuestion.placeholder}
          otherOptions={currentQuestion.otherOptions}
          onAnswer={handleAnswer}
          currentAnswer={currentAnswer}
          variant="onboarding"
        />
      </View>

      <View style={styles.nextButtonContainer}>
        <NextButton
          onPress={() => {
            void handleNext();
          }}
          disabled={!!isNextDisabled}
          textOption="Next"
        />
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
    backgroundColor: lightModeColors.background,
    justifyContent: "flex-start",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 253,
    height: 114,
  },
  nextButtonContainer: {
    marginTop: 16,
    alignSelf: "center",
    width: "100%",
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    color: lightModeColors.title,
    fontFamily: "SG-Medium",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 5,
  },
  backText: {
    fontSize: 24,
    color: lightModeColors.backArrow,
    fontWeight: "600",
    lineHeight: 27,
  },
});
