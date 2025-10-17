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
import { Activity, Lesson } from "@/types";
import env from "@/util/validateEnv";

export default function ActivityPageScreens() {
  const router = useRouter();
  const { mongoUser, refreshMongoUser } = useAuth();
  const { lessonId } = useLocalSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      console.log("Fetched activityId from params:", lessonId);

      if (!lessonId) return;
      const id = Array.isArray(lessonId) ? lessonId[0] : lessonId;

      try {
        const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/lessons/${id}`);
        if (res.ok) {
          const les = (await res.json()) as Lesson;
          setActivities(les.activities);
        } else {
          console.error("Failed to fetch lesson");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    void fetchActivity();
  }, [lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>(
    Array(activities.length).fill(undefined),
  );

  const currentQuestion = activities[currentIndex];
  const currentAnswer = answers[currentIndex] ?? "";

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered:", answers);
    }
  };

  const handleComplete = async () => {
    const lessonIdStr = Array.isArray(lessonId) ? lessonId[0] : lessonId;
    if (!mongoUser?._id || !lessonIdStr) {
      alert("User or activity not found.");
      return;
    }
    try {
      const res = await fetch(
        `${env.EXPO_PUBLIC_BACKEND_URI}/users/${mongoUser.uid}/completed/${lessonIdStr}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        alert("Activity completed!");

        void refreshMongoUser();

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
        <ProgressBar progress={(currentIndex + 1) / activities.length} />

        <View>
          <Text style={styles.option}> Select an Option </Text>
        </View>
        <View style={styles.blobContainer}>
          <Blob style={styles.blob}></Blob>
          <View style={styles.main}>
            {currentQuestion && (
              <Question
                type={currentQuestion.type === "reflection" ? "shortAnswer" : "multipleChoice"}
                question={currentQuestion.question}
                options={currentQuestion.options?.map((opt) => opt.content) ?? []}
                otherOptions={[]} // you can map your actual logic here if needed
                placeholder={
                  currentQuestion.type === "reflection" ? "Type your answer..." : undefined
                }
                onAnswer={handleAnswer}
                currentAnswer={currentAnswer}
                variant="activity"
              />
            )}
          </View>
        </View>
        <View style={styles.nextButtonContainer}>
          <NextButton
            onPress={currentIndex === activities.length - 1 ? handleComplete : handleNext}
            disabled={!!isNextDisabled}
            textOption={currentIndex === activities.length - 1 ? "Complete" : "Continue"}
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
