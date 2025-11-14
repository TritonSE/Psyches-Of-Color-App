import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ActivityButton from "@/components/ActivityButton";
import NextButton from "@/components/NextButton";
import ProgressBar from "@/components/Onboarding/ProgressBar";
import { Question } from "@/components/Onboarding/Question";
import SectionButton from "@/components/SectionButton";
import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";
import { Lesson, Unit } from "@/types";
import env from "@/util/validateEnv";

export default function ActivitiesPage() {
  const router = useRouter();
  const { mongoUser, refreshMongoUser } = useAuth();

  const [units, setUnits] = useState<Unit[]>([]);
  const [currLesson, setCurrLesson] = useState<Lesson | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>([]);

  // Fetch units & lessons
  const getAllSections = async () => {
    try {
      const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/units`);
      if (res.ok) {
        const fetchedUnits = (await res.json()) as Unit[];
        setUnits(fetchedUnits);
      } else {
        console.error("Failed to fetch units");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllSections().catch((err: unknown) => {
      console.error(err);
    });
  }, []);

  // Compute lesson statuses
  const getLessonStatuses = (lessons: Lesson[]): ("inProgress" | "completed" | "incomplete")[] => {
    const statuses: ("inProgress" | "completed" | "incomplete")[] = [];
    lessons.forEach((lesson, index) => {
      if (mongoUser?.completedLessons.find((les) => les._id === lesson._id)) {
        statuses.push("completed");
      } else if (index === 0 || statuses[index - 1] === "completed") {
        statuses.push("inProgress");
      } else {
        statuses.push("incomplete");
      }
    });
    return statuses;
  };

  const allLessons = units.flatMap((unit) => unit.lessons);
  const lessonStatuses = getLessonStatuses(allLessons);
  let statusIndex = 0;

  // Reset activity answers when lesson changes
  useEffect(() => {
    if (!currLesson) return;
    setAnswers(Array(currLesson.activities.length).fill(undefined));
    setCurrentIndex(0);
  }, [currLesson]);

  const currentQuestion = currLesson?.activities[currentIndex];
  const currentAnswer = currentQuestion ? (answers[currentIndex] ?? "") : "";

  const handleAnswer = (answer: string) => {
    if (!currLesson) return;
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (!currLesson) return;
    if (currentIndex < currLesson.activities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      void handleComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleComplete = async () => {
    if (!mongoUser?._id || !currLesson?._id) {
      alert("User or activity not found.");
      return;
    }

    try {
      const res = await fetch(
        `${env.EXPO_PUBLIC_BACKEND_URI}/users/${mongoUser.uid}/completed/${String(currLesson._id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.ok) {
        alert("Activity completed!");
        await refreshMongoUser();
        setCurrLesson(null);
      } else {
        alert("Failed to update activity progress.");
      }
    } catch (err: unknown) {
      console.error(err);
      alert("Error updating activity progress.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!currLesson ? (
        // Activities list view
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="gray" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Activities</Text>
          </View>

          {units.map((unit, sectionIndex) => (
            <View key={unit._id} style={styles.sectionContainer}>
              <SectionButton
                title={`Section ${String(sectionIndex + 1)}`}
                subtitle={unit.title}
                color="green"
              />

              <View style={styles.optionsContainer}>
                {unit.lessons.map((lesson, lessonIndex) => {
                  const status = lessonStatuses[statusIndex];
                  statusIndex += 1;

                  if (status === "incomplete") {
                    return (
                      <View
                        key={lesson._id}
                        style={{
                          width: 60,
                          height: 60,
                          marginLeft: lessonIndex % 2 === 1 ? 0 : -99,
                          marginRight: lessonIndex % 2 === 0 ? 0 : -99,
                          backgroundColor: "#E0E0E0",
                          borderRadius: 12,
                        }}
                      />
                    );
                  }

                  return (
                    <ActivityButton
                      key={lesson._id}
                      status={status}
                      color="green"
                      style={{
                        marginLeft: lessonIndex % 2 === 1 ? 0 : -99,
                        marginRight: lessonIndex % 2 === 0 ? 0 : -99,
                      }}
                      onPress={() => {
                        setCurrLesson(lesson);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        // Lesson activity view
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            {currentIndex > 0 && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="gray" />
              </TouchableOpacity>
            )}
            <Text style={styles.titleText}>{currLesson.title}</Text>
          </View>

          <ProgressBar progress={(currentIndex + 1) / currLesson.activities.length} />

          <View style={styles.main}>
            {currentQuestion && (
              <Question
                type={currentQuestion.type === "reflection" ? "shortAnswer" : "multipleChoice"}
                question={currentQuestion.question}
                options={currentQuestion.options?.map((o) => o.content) ?? []}
                otherOptions={[]}
                placeholder={
                  currentQuestion.type === "reflection" ? "Type your answer..." : undefined
                }
                onAnswer={handleAnswer}
                currentAnswer={currentAnswer}
                variant="activity"
              />
            )}
          </View>

          <View style={styles.nextButtonContainer}>
            <NextButton
              onPress={handleNext}
              disabled={!currentAnswer}
              textOption={
                currentIndex === currLesson.activities.length - 1 ? "Complete" : "Continue"
              }
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightModeColors.background },
  sectionContainer: { width: "100%", alignItems: "center" },
  optionsContainer: {
    marginTop: 40,
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    fontSize: 18,
    fontWeight: "600",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginRight: 24,
    color: "#6C6C6C",
    textTransform: "uppercase",
    fontFamily: "SG-DemiBold",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 50,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  main: { justifyContent: "center", alignItems: "center", marginTop: 20 },
  nextButtonContainer: { marginTop: 16, alignSelf: "center", width: "100%" },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    color: lightModeColors.title,
    fontFamily: "SG-Medium",
  },
  backButton: { position: "absolute", left: 5 },
});
