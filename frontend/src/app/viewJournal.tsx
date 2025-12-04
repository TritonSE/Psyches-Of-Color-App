import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { lightModeColors } from "@/constants/colors";
import Pencil from "@/assets/pencil.svg";

export default function ViewJournal() {
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    paragraph?: string;
    imageUrl?: string;
    date: string;
  }>();

  const id = typeof params.id === "string" ? params.id : undefined;
  const title = typeof params.title === "string" ? params.title : "Untitled Entry";
  const paragraph = typeof params.paragraph === "string" ? params.paragraph : "";
  const imageUrl = typeof params.imageUrl === "string" ? params.imageUrl : null;
  const dateParam = typeof params.date === "string" ? new Date(params.date) : new Date();

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

  const monthLabel = months[dateParam.getMonth()].toUpperCase();
  const day = String(dateParam.getDate());
  const year = String(dateParam.getFullYear());

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
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.bodyText}>{paragraph}</Text>
          </View>

          {imageUrl && (
            <>
              <View style={styles.subheader}>
                <Ionicons name="image-outline" size={20} color="#2E563C" />
                <Text style={styles.subheadText}>Photo</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
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
              title,
              paragraph,
              imageUrl: imageUrl ?? "",
              date: params.date as string | undefined,
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
