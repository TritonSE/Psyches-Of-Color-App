import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import CalendarIcon from "@/assets/calendar.svg";
import ClockIcon from "@/assets/clock.svg";

type JournalCardProps = {
  title: string;
  preview: string;
  time: string;
  date: string;
  imageSourceUrl?: string;
  onPress?: () => void;
};

export default function JournalCard({
  title,
  preview,
  time,
  date,
  imageSourceUrl,
  onPress,
}: JournalCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageSourceUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.preview}>
            {preview}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <ClockIcon width={14} height={14} />
            <Text style={styles.metaText}>{time}</Text>
          </View>
          <View style={styles.metaItem}>
            <CalendarIcon width={14} height={14} />
            <Text style={styles.metaText}>{date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2E563C",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "stretch",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Social Gothic",
    fontWeight: "600",
    fontSize: 18,
    color: "#2E563C",
    marginBottom: 2,
  },
  preview: {
    fontFamily: "Archivo",
    fontSize: 14,
    color: "#000000",
    marginTop: 6,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: "Archivo",
    color: "#2E563C",
  },
  textGroup: {
    flexShrink: 1,
  },
});
