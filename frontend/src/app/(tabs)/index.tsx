import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { StatusBar } from "expo-status-bar";
// import InternetError from "@/pages/internetError";

// Import SVG icons
import ArrowLeftIcon from "@/assets/icons/arrow-icon.svg";
import ArrowRightIcon from "@/assets/icons/arrow-icon-right.svg";

// Import colors
import { lightModeColors } from "@/constants/colors";

export default function Home() {
  // Hardcoded data for the chart
  const barData = [
    {
      value: 60,
      label: "12",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#7CAB4C" }]} />
        </View>
      ),
    },
    {
      value: 80,
      label: "13",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#EFB116" }]} />
        </View>
      ),
    },
    {
      value: 40,
      label: "14",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#EFB116" }]} />
        </View>
      ),
    },
    {
      value: 70,
      label: "15",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#D38718" }]} />
        </View>
      ),
    },
    {
      value: 50,
      label: "16",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#C13D2F" }]} />
        </View>
      ),
    },
    {
      value: 45,
      label: "17",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#EFB116" }]} />
        </View>
      ),
    },
    {
      value: 75,
      label: "18",
      frontColor: lightModeColors.primary,
      topLabelComponent: () => (
        <View style={styles.moodIndicator}>
          <View style={[styles.moodDot, { backgroundColor: "#7CAB4C" }]} />
        </View>
      ),
    },
  ];

  // Mood legend data
  const moodLegend = [
    { color: "#2E563C", label: "Happy" },
    { color: "#7CAB4C", label: "Good" },
    { color: "#EFB116", label: "Okay" },
    { color: "#D38718", label: "Meh" },
    { color: "#C13D2F", label: "Bad" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Title */}
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        {/* Date Navigation */}
        <View style={styles.dateNavigation}>
          <TouchableOpacity>
            <ArrowLeftIcon width={24} height={24} />
          </TouchableOpacity>

          <Text style={styles.dateRangeText}>Jan 12 — Jan 18, 2025</Text>

          <TouchableOpacity>
            <ArrowRightIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        {/* Charts */}
        <View style={styles.chartsArea}>
          <BarChart
            data={barData}
            width={300}
            height={200}
            barWidth={20}
            spacing={20}
            barBorderRadius={4}
            hideRules
            hideYAxisText
            xAxisThickness={0}
            yAxisThickness={0}
            hideOrigin
            backgroundColor="#F6F6EA"
            noOfSections={3}
            showGradient
            gradientColor={"transparent"}
          />
        </View>

        {/* Mood Legend */}
        <View style={styles.moodLegend}>
          {moodLegend.map((mood, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: mood.color }]} />
              <Text style={styles.legendText}>{mood.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Toggle View */}
      <View style={styles.toggleContainer}>
        <Text style={styles.monthlyText}>Monthly</Text>
        <View style={styles.activeToggle}>
          <Text style={styles.weeklyText}>Weekly</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2E563C",
    fontFamily: "Archivo",
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: lightModeColors.background,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#2E563C",
    padding: 16,
    marginBottom: 20,
  },
  dateNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  dateRangeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2E563C",
    fontFamily: "Archivo",
  },
  chartsArea: {
    alignItems: "center",
    marginVertical: 10,
  },
  moodIndicator: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  moodDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  moodLegend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
    gap: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#2E563C",
    fontFamily: "Archivo",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: lightModeColors.background,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2E563C",
    padding: 8,
    width: 184,
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  monthlyText: {
    fontSize: 14,
    color: "#2E563C",
    paddingHorizontal: 12,
    fontFamily: "Inter",
  },
  activeToggle: {
    backgroundColor: "#2E563C",
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  weeklyText: {
    fontSize: 14,
    color: "#F6F6EA",
    fontFamily: "Figtree",
  },
});
