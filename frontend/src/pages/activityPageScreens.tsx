import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Back from "@/assets/back.svg";
import Blob from "@/assets/blob.svg";
import NextButton from "@/components/NextButton";
import ProgressBar from "@/components/Onboarding/ProgressBar";
import { Question } from "@/components/Onboarding/Question";
import { lightModeColors } from "@/constants/colors";
import { QuestionData, activityPageQuestions } from "@/constants/questionData";

export default function ActivityPageScreens() {
  const questions: QuestionData[] = activityPageQuestions;

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

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isNextDisabled = !currentAnswer;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {currentIndex > 0 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Back />
            </TouchableOpacity>
          )}
          <Text style={styles.titleText}>Anxiety: Part 1</Text>
        </View>
        <ProgressBar progress={(currentIndex + 1) / questions.length} />

        <View>
          <Text style={styles.option}> Select an Option </Text>
        </View>
        <View style={styles.blobContainer}>
          <Blob style={styles.blob}></Blob>
          <View style={styles.main}>
            <Question
              type={currentQuestion.type}
              question={currentQuestion.question}
              options={currentQuestion.options}
              placeholder={currentQuestion.placeholder}
              otherOptions={currentQuestion.otherOptions}
              onAnswer={handleAnswer}
              currentAnswer={currentAnswer}
              variant="activity"
            />
          </View>
        </View>
        <View style={styles.nextButtonContainer}>
          <NextButton onPress={handleNext} disabled={!!isNextDisabled} textOption="Continue" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
  },
  option: {
    color: lightModeColors.onboardingGreen,
    fontSize: 18,
    textAlign: "center",
    marginTop: 25,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
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
  blob: {
    position: "absolute",
    zIndex: -1,
  },
  blobContainer: {
    width: "100%",
    position: "relative",
    marginTop: 24,
  },
});
