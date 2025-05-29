import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Back from "@/assets/back.svg";
import Blob from "@/assets/blob.svg";
import NextButton from "@/components/NextButton";
import ProgressBar from "@/components/Onboarding/ProgressBar";
import { Question } from "@/components/Onboarding/Question";
import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";
import { Activity, Question as QuestionType } from "@/types";
import env from "@/util/validateEnv";

export default function ActivityPageScreens() {
  const router = useRouter();
  const { mongoUser } = useAuth();
  const { activityId } = useLocalSearchParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      console.log("Fetched activityId from params:", activityId);

      if (!activityId) return;
      const id = Array.isArray(activityId) ? activityId[0] : activityId;

      try {
        const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/activities/${id}`);
        if (res.ok) {
          const act = (await res.json()) as Activity;
          setActivity(act);
          setQuestions(act.questions);
        } else {
          console.error("Failed to fetch activity");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    void fetchActivity();
  }, [activityId]);

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
      console.log("Current index:", currentIndex);
      console.log("Current question:", questions[currentIndex]?.content);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered:", answers);
    }
  };

  const handleComplete = async () => {
    const activityIdStr = Array.isArray(activityId) ? activityId[0] : activityId;
    console.log("Before: ", mongoUser?.completedActivities);
    if (!mongoUser?._id || !activityIdStr) {
      alert("User or activity not found.");
      return;
    }
    try {
      const res = await fetch(
        `${env.EXPO_PUBLIC_BACKEND_URI}/users/${mongoUser.uid}/completed/${activityIdStr}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        alert("Activity completed!");
        const updatedUser = await res.json();
        console.log("After:", mongoUser?.completedActivities);
        router.back();
      } else {
        alert("Failed to update activity progress.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating activity progress.");
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
            {currentQuestion && (
              <Question
                type={currentQuestion.type === "mcq" ? "multipleChoice" : "shortAnswer"}
                question={currentQuestion.content}
                options={currentQuestion.options?.map((opt) => opt.content) ?? []}
                otherOptions={[]} // you can map your actual logic here if needed
                placeholder={currentQuestion.type === "text" ? "Type your answer..." : undefined}
                onAnswer={handleAnswer}
                currentAnswer={currentAnswer}
                variant="activity"
              />
            )}
          </View>
        </View>
        <View style={styles.nextButtonContainer}>
          <NextButton
            onPress={currentIndex === questions.length - 1 ? handleComplete : handleNext}
            disabled={!!isNextDisabled}
            textOption={currentIndex === questions.length - 1 ? "Complete" : "Continue"}
          />
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
    marginTop: 30,
  },
});
