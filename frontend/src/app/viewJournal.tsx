import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Pencil from "@/assets/pencil.svg";
import { lightModeColors } from "@/constants/colors";
import { useGetJournalEntryById } from "@/lib/journalEntries";

export default function ViewJournal() {
  const params = useLocalSearchParams<{
    id?: string;
  }>();

  const id = typeof params.id === "string" ? params.id : undefined;
  const { data: journalEntry } = useGetJournalEntryById(id);

  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (!journalEntry) {
    return null;
  }

  const date = new Date(journalEntry.updatedAt);

  const monthLabel = months[date.getMonth()].toUpperCase();
  const day = String(date.getDate());
  const year = String(date.getFullYear());

  const formattedDate = `${monthLabel} ${day}, ${year}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.pageContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Journal</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.titleText}>{journalEntry.title}</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.bodyText}>{journalEntry.paragraph}</Text>
          </View>

          {journalEntry.imageUrl && (
            <>
              <View style={styles.subheader}>
                <Ionicons name="image-outline" size={20} color="#2E563C" />
                <Text style={styles.subheadText}>Photo</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: journalEntry.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.edit}
        onPress={() => {
          router.push({
            pathname: "/createJournal",
            params: {
              mode: "edit",
              id,
              title: journalEntry.title,
              paragraph: journalEntry.paragraph,
              imageUrl: journalEntry.imageUrl ?? "",
              date: journalEntry.updatedAt,
            },
          });
        }}
      >
        <Pencil />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
  },
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6C6C6C",
    textTransform: "uppercase",
    fontFamily: "SG-DemiBold",
  },
  titleSection: {
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  titleText: {
    fontFamily: "Social Gothic",
    fontSize: 28,
    fontWeight: "600",
    color: "#2E563C",
    marginBottom: 8,
    lineHeight: 34,
  },
  dateText: {
    color: "#2E563C",
    fontSize: 14,
    fontFamily: "Archivo",
    fontWeight: "600",
    opacity: 0.8,
  },
  subheader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 24,
    gap: 8,
    marginBottom: 12,
    marginTop: 12,
  },
  subheadText: {
    fontFamily: "Social Gothic",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    width: 358,
    minHeight: 150,
    padding: 20,
    marginBottom: 24,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: "Figtree",
    color: "#333",
    lineHeight: 24,
  },
  imageContainer: {
    width: 358,
    height: 358,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#EFEFEF",
  },
  image: {
    width: "100%",
    height: "100%",
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
