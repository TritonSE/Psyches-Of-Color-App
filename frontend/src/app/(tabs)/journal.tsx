import { StyleSheet, Text, View, Image } from "react-native";

import { lightModeColors } from "@/constants/colors";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import LeftIcon from "@/assets/left.svg";
import RightIcon from "@/assets/right.svg";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  //   header: {
  //     display: "flex",
  //     flexDirection: "row",
  //     justifyContent: "center",
  //     width: 390,
  //     height: 106,
  //     marginBottom: 0,
  //     marginTop: 70,
  //     gap: 150,
  //     // marginRight: 125,
  //     paddingBottom: 0,
  //   },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginBottom: 246,
  },
  mascot: {
    width: 159,
    height: 159,
    backgroundColor: lightModeColors.background,
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
    width: 8,
    height: 16,
    backgroundColor: "transparent",
  },
  time: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 358,
    marginBottom: 138,
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
});

export default function Journal() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="gray" />
        <Text style={styles.headerTitle}>Journal</Text>
      </View>
      <View style={styles.time}>
        <Button style={styles.timeButton} children={<LeftIcon />} />
        <Text style={styles.timeText}>MAR 2025</Text>
        <Button style={styles.timeButton} children={<RightIcon />} />
      </View>
      <View style={styles.body}>
        <Image source={require("@/assets/journalIcon.png")} style={styles.mascot} />
        <Text style={styles.noEntryMessage}>Looks like you haven't wrote an entry this month.</Text>
      </View>
    </View>
  );
}
