import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BarChart } from "react-native-gifted-charts";
// import InternetError from "@/pages/internetError";

// Import SVG icons
import ArrowLeftIcon from "@/assets/icons/arrow-icon.svg";
import ArrowRightIcon from "@/assets/icons/arrow-icon-right.svg";

// Import colors
import { lightModeColors } from "@/constants/colors";

console.log("Home component is loaded");

function Home() {
  console.log("Home component is rendering");

  // Hardcoded data for the chart
  const barData = [
    {
      value: 60,
      label: "12",
      frontColor: lightModeColors.moodAccent,
    },
    {
      value: 80,
      label: "13",
      frontColor: lightModeColors.moodBad,
    },
    {
      value: 40,
      label: "14",
      frontColor: lightModeColors.moodGood,
    },
    {
      value: 70,
      label: "15",
      frontColor: lightModeColors.moodMeh,
    },
    {
      value: 50,
      label: "16",
      frontColor: lightModeColors.moodMeh,
    },
    {
      value: 45,
      label: "17",
      frontColor: lightModeColors.moodOkay,
    },
    {
      value: 75,
      label: "18",
      frontColor: lightModeColors.moodGood,
    },
  ];

  // Mood indicators with their colors
  const moodIndicators = [
    { color: lightModeColors.moodAccent, label: "Happy" },
    { color: lightModeColors.moodGood, label: "Good" },
    { color: lightModeColors.moodOkay, label: "Okay" },
    { color: lightModeColors.moodMeh, label: "Meh" },
    { color: lightModeColors.moodBad, label: "Bad" },
  ];

  // Toggle state for Monthly/Weekly view
  const [viewMode, setViewMode] = useState("weekly");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Title */}
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        {/* Toggle View */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "monthly" && styles.activeToggleButton]}
            onPress={() => {
              setViewMode("monthly");
            }}
          >
            <Text style={[styles.monthlyText, viewMode === "monthly" && styles.activeToggleText]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "weekly" && styles.activeToggleButton]}
            onPress={() => {
              setViewMode("weekly");
            }}
          >
            <Text style={[styles.weeklyText, viewMode === "weekly" && styles.activeToggleText]}>
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

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

        {/* Chart Area with Mood Indicators on Left */}
        <View style={styles.chartWithLegend}>
          {/* Mood Indicators (Left Side) */}
          <View style={styles.moodIndicatorsColumn}>
            {moodIndicators.map((mood, index) => (
              <View key={index} style={styles.moodIndicator}>
                <View style={[styles.moodDot, { backgroundColor: mood.color }]} />
              </View>
            ))}
          </View>

          {/* Charts (Right Side) */}
          <View style={styles.chartsArea}>
            <BarChart
              data={barData}
              width={270}
              height={200}
              barWidth={20}
              spacing={18}
              barBorderRadius={4}
              hideRules
              hideYAxisText
              xAxisThickness={0}
              yAxisThickness={0}
              hideOrigin
              backgroundColor={lightModeColors.background}
              noOfSections={3}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
// Make sure to export the component as default
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: lightModeColors.moodAccent,
    fontFamily: "Archivo",
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: lightModeColors.background,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: lightModeColors.moodAccent,
    padding: 16,
    marginBottom: 20,
  },
  dateNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 24,
  },
  dateRangeText: {
    fontSize: 14,
    fontWeight: "500",
    color: lightModeColors.moodAccent,
    fontFamily: "Archivo",
  },
  chartWithLegend: {
    flexDirection: "row",
    alignItems: "center",
  },
  moodIndicatorsColumn: {
    marginRight: 10,
    justifyContent: "space-between",
    height: 200,
    paddingVertical: 15,
  },
  chartsArea: {
    flex: 1,
    alignItems: "center",
  },
  moodIndicator: {
    marginVertical: 10,
  },
  moodDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: lightModeColors.background,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: lightModeColors.moodAccent,
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  toggleButton: {
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "center",
    minWidth: 92,
  },
  activeToggleButton: {
    backgroundColor: lightModeColors.moodAccent,
  },
  monthlyText: {
    fontSize: 14,
    color: lightModeColors.moodAccent,
    fontFamily: "Inter",
    textAlign: "center",
  },
  weeklyText: {
    fontSize: 14,
    color: lightModeColors.moodAccent,
    fontFamily: "Figtree",
    textAlign: "center",
  },
  activeToggleText: {
    color: lightModeColors.background,
  },
});
