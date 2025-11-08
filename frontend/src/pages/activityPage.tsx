import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ActivityPopup from "@/components/ActivityPopup";
import ActivityButton from "@/components/activityButton";
import SectionButton from "@/components/sectionButton";
import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";
import { Lesson, Unit } from "@/types";
import env from "@/util/validateEnv";

export default function ActivitiesPage() {
  const router = useRouter();
  const { mongoUser } = useAuth();

  const [units, setUnits] = useState<Unit[]>([]);
  const [currLesson, setCurrLesson] = useState<Lesson | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllSections = async () => {
    const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/units`);

    if (res.ok) {
      const fetchedUnits = (await res.json()) as Unit[];

      setUnits(fetchedUnits);
    } else {
      console.error("Failed to fetch units");
    }
  };

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

  useEffect(() => {
    void getAllSections();
  }, []);

  const lessonStatuses = getLessonStatuses(units.flatMap((unit) => unit.lessons));

  // keep track of the index to retrieve the correct status
  let statusIndex = 0;

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {units.map((unit, sectionIndex) => {
          return (
            <View key={unit._id} style={styles.sectionContainer}>
              <SectionButton
                title={`Section ${(sectionIndex + 1).toString()}`}
                subtitle={unit.title}
                color="green"
              />

              <View style={styles.optionsContainer}>
                {unit.lessons.map((activity, activityIndex) => {
                  const status = lessonStatuses[statusIndex];
                  console.log(
                    `Lesson: ${activity.title}, Status: ${status}, Index: ${statusIndex.toString()}`,
                  );

                  statusIndex += 1;

                  if (status === "incomplete") {
                    return (
                      <ActivityButton
                        key={activity._id}
                        status={"incomplete"}
                        style={{
                          marginLeft: activityIndex % 2 === 1 ? 0 : -99,
                          marginRight: activityIndex % 2 === 0 ? 0 : -99,
                        }}
                      />
                    );
                  }

                  return (
                    <ActivityButton
                      key={activity._id}
                      color="green"
                      status={status}
                      style={{
                        marginLeft: activityIndex % 2 === 1 ? 0 : -99,
                        marginRight: activityIndex % 2 === 0 ? 0 : -99,
                      }}
                      onPress={() => {
                        setCurrLesson(activity);
                        setIsModalOpen(true);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}

        <Text style={styles.jumpText}>
          ••• ••• ••• ••• Jump to the next section ••• ••• ••• •••
        </Text>

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
              console.log("Starting activity...");
              setIsModalOpen(false);
              router.push({ pathname: "/activityPage", params: { lessonId: currLesson._id } });
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: lightModeColors.background,
    paddingVertical: 50,
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
  },
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
    fontStyle: "normal",
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
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 32,
  },
  jumpText: {
    fontSize: 16,
    color: "#6C6C6C",
    marginVertical: 10,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
