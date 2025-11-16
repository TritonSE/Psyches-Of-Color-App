import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ActivityButton from "@/components/ActivityButton";
import ActivityPopup from "@/components/ActivityPopup";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>([]);

  // Fetch units
  const getAllSections = async () => {
    try {
      const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/units`);
      if (res.ok) {
        const fetchedUnits = (await res.json()) as Unit[];
        setUnits(fetchedUnits);
      } else {
        console.error("Failed to fetch units");
      }
    } catch (err) {
      console.error("Error fetching units:", err);
    }
  };

  useEffect(() => {
    void getAllSections();
  }, []);

  const getLessonStatuses = (lessons: Lesson[]) => {
    const statuses: ("inProgress" | "completed" | "incomplete")[] = [];
    lessons.forEach((lesson, index) => {
      const isCompleted = mongoUser?.completedLessons.find((les) => les._id === lesson._id);

      if (isCompleted) statuses.push("completed");
      else if (index === 0 || statuses[index - 1] === "completed") statuses.push("inProgress");
      else statuses.push("incomplete");
    });
    return statuses;
  };

  const allLessons = units.flatMap((unit) => unit.lessons);
  const lessonStatuses = getLessonStatuses(allLessons);

  useEffect(() => {
    if (!currLesson) return;
    setAnswers(Array(currLesson.activities.length).fill(undefined));
    setCurrentIndex(0);
  }, [currLesson]);

  const currentQuestion = currLesson?.activities[currentIndex];
  const currentAnswer = currentQuestion ? (answers[currentIndex] ?? "") : "";

  const handleAnswer = (answer: string) => {
    if (!currLesson) return;
    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);
  };

  const handleNext = async () => {
    if (!currLesson) return;

    if (currentIndex < currLesson.activities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // leaving lesson entirely
      setCurrLesson(null);
    }
  };

  const handleComplete = async () => {
    if (!mongoUser?.uid || !currLesson?._id) {
      alert("User or activity not found.");
      return;
    }

    try {
      const res = await fetch(
        `${env.EXPO_PUBLIC_BACKEND_URI}/users/${mongoUser.uid}/completed/${currLesson._id}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } },
      );

      if (res.ok) {
        alert("Activity completed!");
        void refreshMongoUser();
        setCurrLesson(null);
      } else {
        alert("Failed to update activity progress.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating activity progress.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!currLesson ? (
        // -----------------------------
        // Activities List View
        // -----------------------------
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
              <SectionButton title={unit.title} color="green" />

              <View style={styles.optionsContainer}>
                {unit.lessons.map((lesson, lessonIndex) => {
                  const precedingLessonsCount = units
                    .slice(0, sectionIndex)
                    .reduce((acc, u) => acc + u.lessons.length, 0);

                  const globalIndex = precedingLessonsCount + lessonIndex;
                  const status = lessonStatuses[globalIndex];

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
                        setIsModalOpen(true);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        // -----------------------------
        // Lesson Activity View
        // -----------------------------
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            {/* ALWAYS show back button like Activities page */}
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back-outline" size={24} color="gray" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{currLesson.title}</Text>
          </View>

          <ProgressBar progress={(currentIndex + 1) / currLesson.activities.length} />

          <View style={styles.main}>
            {currentQuestion && (
              <Question
                type={currentQuestion.type === "reflection" ? "shortAnswer" : "multipleChoice"}
                question={currentQuestion.question}
                options={currentQuestion.options?.map((o) => o.content) ?? []}
                onAnswer={handleAnswer}
                currentAnswer={currentAnswer}
                placeholder={
                  currentQuestion.type === "reflection" ? "Type your answer..." : undefined
                }
                variant="activity"
              />
            )}
          </View>

          <View style={styles.nextButtonContainer}>
            <NextButton
              onPress={() => {
                void handleNext(); // explicitly ignore the promise
              }}
              disabled={!currentAnswer}
              textOption={
                currentIndex === currLesson.activities.length - 1 ? "Complete" : "Continue"
              }
            />
          </View>
        </ScrollView>
      )}

      {currLesson && (
        <ActivityPopup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          color="green"
          title={currLesson.title}
          description={currLesson.description}
          onStart={() => {
            setIsModalOpen(false);
            setAnswers(Array(currLesson.activities.length).fill(undefined));
            setCurrentIndex(0);
          }}
        />
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
    paddingHorizontal: 20,
    paddingTop: 10,
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
});
