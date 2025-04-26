import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
//import * as Progress from "react-native-progress";

import fireman from "@/assets/fireman.png";
import plantman from "@/assets/plantman.png";
import wateringCan from "@/assets/wateringcan.png";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hey Michael!</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>
        <View style={styles.crisisButton}>
          <Text style={styles.crisisText}>CRISIS</Text>
        </View>
      </View>

      {/* Quote Box */}
      <View style={styles.quoteBox}>
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
        <View style={styles.progressRow}>
        <Image source={fireman} style={styles.progressIcon} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.taskLabel}>Complete 3 Activities</Text>
          {/* <Progress.Bar*/}
          <Text style={styles.taskCount}>1/3</Text>
        </View>
      </View>
      
      {/* Divider 1 */}
      <View style={styles.divider} />

      
      {/* Row 2: Complete Journal */}
      <View style={styles.progressRow}>
        <Image source={plantman} style={styles.progressIcon} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.taskLabel}>Complete Journal</Text>
          {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
          <Text style={styles.taskCount}>0/1</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      <View style={styles.progressRow}>
        <Image source={wateringCan} style={styles.progressIcon} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.taskLabel}>Complete Weekly Check-in</Text>
          {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
          <Text style={styles.taskCount}>0/1</Text>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
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
    fontFamily: "Poppins",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Poppins",
    color: "#6C6C6C",
  },
  crisisButton: {
    backgroundColor: "#BF3B44",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  crisisText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Poppins",
    fontSize: 14,
  },
  quoteBox: {
    backgroundColor: "#FFE1AC",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    position: "relative",
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  quote: {
    fontFamily: "Figtree",
    fontSize: 16,
    fontWeight: "500", //og 500
    lineHeight: 24,
    color: "#1D1B20",
    textAlign: "center",
  },
  quoteImage: {
    width: 72,
    height: 72,
    position: "absolute",
    bottom: -16, 
    right: -16, 
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 32,
    marginBottom: 12,
    color: "#4B4B4B",
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
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3D3D3", // light gray border
    borderRadius: 16,
    padding: 1, //originally had at 8
    marginBottom: 20,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0", // thinner lighter gray divider between rows
    alignSelf: "stretch",
  },
  
});
