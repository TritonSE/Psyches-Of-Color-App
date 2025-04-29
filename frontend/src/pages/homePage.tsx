import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import checkinIcon from "@/assets/checkinIcon.png";
import crisisBtn from "@/assets/crisisBtn.png";
import fireman from "@/assets/fireman.png";
import journalIcon from "@/assets/journalIcon.png";
import lessonsIcon from "@/assets/lessonsIcon.png";
import pencilJournal from "@/assets/pencilJournal.png";
import plantman from "@/assets/plantman.png";
import txtBoxHomePage from "@/assets/txtBoxHomePage.png";
import wateringCan from "@/assets/wateringcan.png";
import Button from "@/components/Button";
import ProgressBar from "@/components/Onboarding/ProgressBar";
// import { sortRoutesWithInitial } from "expo-router/build/sortRoutes";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hey Michael!</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>
        <Button style={styles.crisisButton}>
          <Image source={crisisBtn}></Image>
        </Button>
      </View>

      {/* Quote Box */}
      <View style={styles.quoteBox}>
        <Image source={txtBoxHomePage}></Image>
        <Text style={styles.quote}>
          “Just like the seasons change, so do my feelings. This moment is temporary, and I will
          feel light again.”
        </Text>
        <Image source={wateringCan} style={styles.quoteImage} />
      </View>

      {/* Progress Section */}
      <Text style={styles.sectionTitle}>Today’s Progress</Text>

      <View style={styles.progressContainer}>
        {/* Row 1: Complete 3 Activities */}
        <TouchableOpacity style={styles.progressRow}>
          <Image source={fireman} style={styles.progressIcon} />
          <View style={styles.progressTextWrapper}>
            <Text style={styles.taskLabel}>Complete 3 Activities</Text>
            {/* <Progress.Bar*/}
            <ProgressBar
              progress={1 / 3}
              style={styles.progressBar}
              fillColor={styles.progressBarColor}
            ></ProgressBar>
            <Text style={styles.taskCount}>1/3</Text>
          </View>
        </TouchableOpacity>

        {/* Divider 1 */}
        <View style={styles.divider} />

        {/* Row 2: Complete Journal */}
        <TouchableOpacity style={styles.progressRow}>
          <Image source={plantman} style={styles.progressIcon} />
          <View style={styles.progressTextWrapper}>
            <Text style={styles.taskLabel}>Complete Journal</Text>
            {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
            <ProgressBar
              progress={0 / 1}
              style={styles.progressBar}
              fillColor={styles.progressBarColor}
            ></ProgressBar>
            <Text style={styles.taskCount}>0/1</Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        <TouchableOpacity style={styles.progressRow}>
          <Image source={wateringCan} style={styles.progressIcon} />
          <View style={styles.progressTextWrapper}>
            <Text style={styles.taskLabel}>Complete Weekly Check-in</Text>
            {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
            <ProgressBar
              progress={0 / 1}
              style={styles.progressBar}
              fillColor={styles.progressBarColor}
            ></ProgressBar>
            <Text style={styles.taskCount}>0/1</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Continue on Journey</Text>
      <View style={styles.buttons}>
        <Button style={styles.lessons}>
          <Text style={styles.lessonsTitle}>Lessons</Text>
          <Image source={lessonsIcon} style={styles.lessonIcon}></Image>
        </Button>
        <View style={styles.row}>
          <Button style={styles.journal}>
            <Text style={styles.journalTitle}>Journal</Text>
            <Image source={journalIcon} style={styles.journalIcon}></Image>
            <Image source={pencilJournal} style={styles.pencilJournal}></Image>
          </Button>
          <Button style={styles.checkin}>
            <Text style={styles.checkinTitle}>Check-in</Text>
            <Image source={checkinIcon} style={styles.checkinIcon}></Image>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F6F6EA",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    fontFamily: "Social Gothic",
    color: "#2E563C",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Poppins",
    color: "#2E563C",
  },
  crisisButton: {
    backgroundColor: "white",
    width: 50,
    height: 50,
  },
  quoteBox: {
    marginTop: 24,
    position: "relative",
  },
  quote: {
    fontFamily: "Figtree",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
    color: "#2E563C",
    textAlign: "center",
    top: 60,
    right: 50,
    width: 275,
    position: "absolute",
  },
  quoteImage: {
    width: 72,
    height: 72,
    position: "absolute",
    bottom: 0,
    right: -16,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 32,
    marginBottom: 12,
    color: "#2E563C",
    fontFamily: "Poppins",
  },
  //dont know if we need this since ive been replacing with progress row (progressCard)
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  progressBar: {
    width: 233,
  },
  progressBarColor: {
    backgroundColor: "#C13D2F",
  },
  progressIcon: {
    width: 56,
    height: 56,
    resizeMode: "contain",
    marginRight: 12,
  },
  progressTextWrapper: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "500",
    marginBottom: 6,
  },
  taskCount: {
    fontSize: 12,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  // trying to put in new dividers like the figma with these styles down below
  progressContainer: {
    backgroundColor: "#F6F6EA",
    borderWidth: 1,
    borderColor: "#2E563C",
    borderRadius: 16,
    padding: 1, //originally had at 8
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#2E563C", // thinner lighter gray divider between rows
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  buttons: {
    gap: 15,
  },
  lessons: {
    backgroundColor: "#2E563C",
    width: 359,
    height: 114,
    borderRadius: 10,
    justifyContent: "center",
  },
  lessonsTitle: {
    fontFamily: "Social-Gothic",
    color: "#F6F6EA",
    fontSize: 26,
    marginRight: 200,
    fontWeight: 600,
  },
  lessonIcon: {
    left: 175,
    top: 14,
    position: "absolute",
  },
  journal: {
    backgroundColor: "#C13D2F",
    width: 171,
    height: 114,
    borderRadius: 10,
    justifyContent: "center",
  },
  journalTitle: {
    fontFamily: "Social Gothic",
    color: "#F6F6EA",
    fontSize: 16,
    marginRight: 75,
    fontWeight: 600,
    zIndex: 1,
  },
  journalIcon: {
    left: 40,
    top: 14,
    position: "absolute", // makes the image fill the parent
    opacity: 1,
  },
  pencilJournal: {
    left: 100,
    position: "absolute", // makes the image fill the parent
    opacity: 1,
  },
  checkin: {
    backgroundColor: "#EFB116",
    width: 175,
    height: 114,
    borderRadius: 10,
    justifyContent: "center",
  },
  checkinTitle: {
    fontFamily: "Social Gothic",
    color: "#F6F6EA",
    fontSize: 16,
    marginRight: 75,
    fontWeight: 600,
    zIndex: 1,
  },
  checkinIcon: {
    position: "absolute",
    width: 100,
    top: 10,
    left: 75,
    color: "#F0A639",
  },
});
