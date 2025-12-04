import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { useContext, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LeftIcon from "@/assets/left.svg";
import Pencil from "@/assets/pencil.svg";
import RightIcon from "@/assets/right.svg";
import Button from "@/components/Button";
import { characters } from "@/components/CharacterCarousel";
import JournalCard from "@/components/JournalCard";
import { lightModeColors } from "@/constants/colors";
import { UserContext } from "@/contexts/userContext";
import { useGetJournalEntries } from "@/lib/journalEntries";

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginBottom: 48,
  },
  mascot: {
    width: 159,
    height: 159,
    backgroundColor: lightModeColors.background,
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  noEntryMessage: {
    width: 306,
    fontFamily: "Archivo",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0.32,
    textAlign: "center",
    textDecorationStyle: "solid",
  },
  title: {
    color: lightModeColors.secondaryLightFont,
    fontFamily: "Social Gothic",
    fontWeight: 600,
    fontSize: 18,
    textAlign: "center",
  },
  timeText: {
    color: "#2E563C",
    fontFamily: "Social Gothic",
    fontSize: 18,
    fontWeight: 600,
  },
  timeButton: {
    width: 12,
    height: 24,
    backgroundColor: "transparent",
  },
  time: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 358,
    marginBottom: 24,
    marginTop: 24,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
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
  edit: {
    width: 52,
    height: 52,
    backgroundColor: "#2E563C",
    borderRadius: 50,
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function Journal() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const { mongoUser } = useContext(UserContext);

  const [monthStart, monthEnd] = useMemo(() => {
    const monthStartLocal = new Date(year, month, 0, 0, 0, 0, 0);
    const monthEndLocal = new Date(monthStartLocal);
    monthEndLocal.setMonth(monthStartLocal.getMonth() + 1);
    if (month === 11) {
      monthEndLocal.setFullYear(monthStartLocal.getFullYear() + 1);
    }
    return [monthStartLocal, monthEndLocal];
  }, [month, year]);

  const { data: journalEntries } = useGetJournalEntries(monthStart.toString(), monthEnd.toString());
  const selectedCharacter =
    characters.find((c) => c.character === mongoUser?.character) ?? characters[1];

  const handleIncrease = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDecrease = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageContainer}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Journal</Text>
          </View>
          <View style={styles.time}>
            <Button style={styles.timeButton} onPress={handleDecrease}>
              <LeftIcon />
            </Button>

            <Text style={styles.timeText}>
              {months[month]} {year}
            </Text>
            <Button style={styles.timeButton} onPress={handleIncrease}>
              <RightIcon />
            </Button>
          </View>
          <View style={styles.body}>
            {journalEntries?.map((entry) => (
              <JournalCard
                key={entry._id}
                title={entry.title}
                preview={entry.paragraph.slice(0, 100)}
                time={format(entry.createdAt, "h:mm a")}
                date={format(entry.createdAt, "MMMM d, yyyy")}
                imageSourceUrl={entry.imageUrl}
                onPress={() => {
                  router.push({
                    pathname: "/viewJournal",
                    params: {
                      id: entry._id,
                      title: entry.title,
                      paragraph: entry.paragraph,
                      date: entry.updatedAt,
                      imageUrl: entry.imageUrl ?? "",
                    },
                  });
                }}
              />
            ))}

            {journalEntries && journalEntries.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Image source={selectedCharacter.characterIcon} style={styles.mascot} />

                <Text style={styles.noEntryMessage}>
                  Looks like you haven&apos;t written an entry this month yet.
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.edit}
          onPress={() => {
            router.push("/createJournal");
          }}
        >
          <Pencil />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
