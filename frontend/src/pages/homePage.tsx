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

      <View style={styles.progressCard}>
        <Image source={fireman} style={styles.progressIcon} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.taskLabel}>Complete 3 Activities</Text>
          {/* <Progress.Bar 
          progress={1 / 3} 
          width={null} 
          color="#BF3B44" 
          unfilledColor="#E5E5E5" 
          borderWidth={0} 
          height={10}
          /> */}
          <Text style={styles.taskCount}>1/3</Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <Image source={plantman} style={styles.progressIcon} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.taskLabel}>Complete Journal</Text>
          {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
          <Text style={styles.taskCount}>0/1</Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <Image source={wateringCan} style={styles.progressIcon} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.taskLabel}>Complete Weekly Check-in</Text>
          {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
          <Text style={styles.taskCount}>0/1</Text>
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
  },
  quote: {
    fontFamily: "Figtree",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    color: "#1D1B20",
    textAlign: "center",
  },
  quoteImage: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 10,
    right: 10,
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
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  progressIcon: {
    width: 30,
    height: 32,
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
});
