import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActivityButton from "@/components/ActivityButton";
import ActivityCompletedView from "@/components/ActivityCompletedView"; // Import the new view
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
  const { mongoUser, firebaseUser, refreshMongoUser } = useAuth();

  const [units, setUnits] = useState<Unit[]>([]);
  const [currLesson, setCurrLesson] = useState<Lesson | null>(null);
  const [isStartActivityModalOpen, setIsStartActivityModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // 1. New State for completion view
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch units
  const getAllSections = async () => {
    try {
      const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/units`);
      if (res.ok) {
        const fetchedUnits = (await res.json()) as Unit[];
        setUnits(fetchedUnits);
      } else {
        throw new Error(`HTTP error! status: ${res.status.toString()}`);
      }
    } catch (err) {
      Alert.alert(`Error fetching units: ${String(err)}`);
    }
  };

  useEffect(() => {
    void getAllSections();
  }, []);

  const getLessonStatuses = (lessons: Lesson[]) => {
    const statuses: ("inProgress" | "completed" | "incomplete")[] = [];
    lessons.forEach((lesson, index) => {
      if (!lesson) {
        statuses.push("incomplete");
        return;
      }
      const isCompleted = mongoUser?.completedLessons?.some((les) => les?.lessonId === lesson._id);
      if (isCompleted) statuses.push("completed");
      else if (index === 0 || statuses[index - 1] === "completed") statuses.push("inProgress");
      else statuses.push("incomplete");
    });
    return statuses;
  };

  const allLessons = units.flatMap((unit) => unit.lessons ?? []);
  const lessonStatuses = getLessonStatuses(allLessons);

  useEffect(() => {
    if (!currLesson) return;
    setAnswers(Array(currLesson.activities.length).fill(undefined));
    setCurrentIndex(0);
    setIsLessonCompleted(false); // Reset completion state when opening a new lesson
  }, [currLesson]);

  const currentQuestion = currLesson?.activities[currentIndex];
  const currentAnswer = currentQuestion ? (answers[currentIndex] ?? "") : "";
  const currentAffirmation =
    currentQuestion?.options?.find((option) => option.content === currentAnswer)?.affirmation ?? "";

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
      setCurrLesson(null);
    }
  };

  const handleComplete = async () => {
    if (!mongoUser?.uid || !currLesson?._id) {
      Alert.alert("User or activity not found.");
      return;
    }

    try {
      setIsLoading(true);
      const token = await firebaseUser?.getIdToken();
      if (!firebaseUser || !token) {
        return;
      }

      const res = await fetch(
        `${env.EXPO_PUBLIC_BACKEND_URI}/users/${mongoUser.uid}/completed/${currLesson._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        await refreshMongoUser();
        // 2. Instead of nulling currLesson immediately, show the completion screen
        setIsLessonCompleted(true);
      } else {
        throw new Error(`HTTP error! status: ${res.status.toString()}`);
      }
    } catch (err) {
      Alert.alert(`Error updating activity progress: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Handle closing the completion screen
  const handleFinishExit = () => {
    setIsLessonCompleted(false);
    setCurrLesson(null);
    setIsStartActivityModalOpen(false);
  };

  // 4. Render Completion View if state is true
  if (isLessonCompleted) {
    return <ActivityCompletedView onFinish={handleFinishExit} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!currLesson ? (
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
            <View key={unit._id || sectionIndex} style={styles.sectionContainer}>
              <SectionButton title={unit.title} color="green" />

              <View style={styles.optionsContainer}>
                {unit.lessons?.map((lesson, lessonIndex) => {
                  if (!lesson) return null;

                  const precedingLessonsCount = units
                    .slice(0, sectionIndex)
                    .reduce((acc, u) => acc + (u.lessons?.length ?? 0), 0);

                  const globalIndex = precedingLessonsCount + lessonIndex;
                  const status = lessonStatuses[globalIndex];

                  if (status === "incomplete") {
                    return (
                      <View
                        key={lesson._id || lessonIndex}
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
                      key={lesson._id || lessonIndex}
                      status={status} // "completed" | "inProgress"
                      color="green"
                      style={{
                        marginLeft: lessonIndex % 2 === 1 ? 0 : -99,
                        marginRight: lessonIndex % 2 === 0 ? 0 : -99,
                      }}
                      onPress={() => {
                        setCurrLesson(lesson);
                        setIsStartActivityModalOpen(true);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{currLesson.title}</Text>
          </View>

          <ProgressBar progress={(currentIndex + 1) / currLesson.activities.length} />

          <View style={styles.main}>
            {currentQuestion && (
              <>
                <Question
                  type={currentQuestion.type === "text" ? "longAnswer" : "multipleChoice"}
                  question={currentQuestion.question}
                  options={currentQuestion?.options?.map((o) => o.content) ?? []}
                  onAnswer={handleAnswer}
                  currentAnswer={currentAnswer}
                  placeholder={currentQuestion.type === "text" ? "Type your answer..." : undefined}
                  variant="activity"
                />
              </>
            )}
          </View>

          <View style={styles.nextButtonContainer}>
            <NextButton
              onPress={() => {
                setIsFeedbackModalOpen(true);
              }}
              disabled={!currentAnswer || isLoading}
              textOption={
                currentIndex === currLesson.activities.length - 1 ? "Complete" : "Continue"
              }
            />
          </View>
        </ScrollView>
      )}

      {currLesson && (
        <ActivityPopup
          isOpen={isStartActivityModalOpen}
          onClose={() => {
            setIsStartActivityModalOpen(false);
          }}
          color="green"
          title={currLesson.title}
          description={currLesson.description}
          onStart={() => {
            setIsStartActivityModalOpen(false);
            // Answers are reset in useEffect based on currLesson
          }}
          startText="START"
        />
      )}

      <ActivityPopup
        isOpen={isFeedbackModalOpen}
        onClose={() => {
          setIsFeedbackModalOpen(false);
        }}
        color="green"
        title=""
        description={currentAffirmation}
        onStart={() => {
          setIsFeedbackModalOpen(false);
          void handleNext();
        }}
        startText="NEXT"
      />
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
  main: { justifyContent: "center", alignItems: "center", marginTop: 20, width: "100%" },
  nextButtonContainer: { marginTop: 16, alignSelf: "center", width: "100%" },
  textInput: {
    width: "100%",
    marginTop: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
    color: "#333",
  },
});
