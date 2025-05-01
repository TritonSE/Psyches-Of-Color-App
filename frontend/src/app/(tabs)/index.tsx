import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { StatusBar } from "expo-status-bar";
// import InternetError from "@/pages/internetError";

// Import SVG icons
import ArrowLeftIcon from "@/assets/icons/arrow-icon.svg";
import ArrowRightIcon from "@/assets/icons/arrow-icon-right.svg";

// Import colors
import { lightModeColors } from "@/constants/colors";

// Type definitions
type DayInfo = {
  day: number;
  moodColor: string;
};

function Home() {
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

  // Generate calendar data for the monthly view
  const generateCalendarData = (): DayInfo[] => {
    // In a real app, this would be dynamic based on the selected month
    // For demo purposes, we're creating a static January 2025 calendar
    const daysInMonth = 31;
    const days: DayInfo[] = [];

    // Create days array (1-31)
    for (let i = 1; i <= daysInMonth; i++) {
      // Randomly assign mood colors for demo
      const moodColors = [
        lightModeColors.moodAccent,
        lightModeColors.moodGood,
        lightModeColors.moodOkay,
        lightModeColors.moodMeh,
        lightModeColors.moodBad,
      ];
      const randomMoodColor = moodColors[Math.floor(Math.random() * moodColors.length)];

      days.push({
        day: i,
        moodColor: randomMoodColor,
      });
    }

    return days;
  };

  const calendarData = generateCalendarData();

  // Split calendar data into weeks for rendering
  const weeks: DayInfo[][] = [];
  let currentWeek: DayInfo[] = [];

  // For a real implementation, we'd need to handle the proper day of week start
  // This is a simplified version
  calendarData.forEach((day, index) => {
    currentWeek.push(day);

    // Start a new week after 7 days or at the end
    if ((index + 1) % 7 === 0 || index === calendarData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

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

        {viewMode === "weekly" ? (
          <>
            {/* Date Navigation for Weekly View */}
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
                  roundedTop
                  barBorderTopLeftRadius={8}
                  barBorderTopRightRadius={8}
                  barBorderBottomLeftRadius={0}
                  barBorderBottomRightRadius={0}
                  roundedBottom={false}
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
          </>
        ) : (
          <>
            {/* Monthly Calendar View */}
            <View style={styles.monthlyContainer}>
              {/* Month Navigation */}
              <View style={styles.monthNavigation}>
                <TouchableOpacity>
                  <ArrowLeftIcon width={24} height={24} />
                </TouchableOpacity>

                <Text style={styles.monthText}>January, 2025</Text>

                <TouchableOpacity>
                  <ArrowRightIcon width={24} height={24} />
                </TouchableOpacity>
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {weeks.map((weekDays, weekIndex) => (
                  <View key={`week-${weekIndex.toString()}`} style={styles.weekRow}>
                    {weekDays.map((day: DayInfo) => (
                      <View key={`day-${day.day.toString()}`} style={styles.dayContainer}>
                        <View style={[styles.dayCircle, { backgroundColor: day.moodColor }]}>
                          <Text style={styles.dayText}>{day.day}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </View>

              {/* Legend for Monthly View */}
              <View style={styles.monthlyLegend}>
                {moodIndicators.map((mood, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: mood.color }]} />
                    <Text style={styles.legendText}>{mood.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
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
    marginTop: 20,
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
  monthlyContainer: {
    paddingVertical: 10,
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    gap: 64,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "500",
    color: lightModeColors.moodAccent,
    fontFamily: "Inter",
  },
  calendarGrid: {
    marginTop: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  dayContainer: {
    alignItems: "center",
    width: 26,
  },
  dayCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 8,
    fontWeight: "600",
    color: lightModeColors.background,
    fontFamily: "Inter",
  },
  monthlyLegend: {
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
    color: lightModeColors.moodAccent,
    fontFamily: "Inter",
  },
});
