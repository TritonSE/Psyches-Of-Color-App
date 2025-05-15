import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-gifted-charts";

// import InternetError from "@/pages/internetError";

// Import SVG icons
import ArrowRightIcon from "@/assets/icons/arrow-icon-right.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-icon.svg";
// Import colors
import { lightModeColors } from "@/constants/colors";
import MoodCheckinPopup from "@/pages/checkInPopup";
import { getUserMoods, Mood } from "@/lib/api";

// Type definitions
type DayInfo = {
  day: number;
  moodColor: string;
};

// Map mood strings to numeric values for the chart
const moodToValue = {
  Happy: 100,
  Good: 80,
  Okay: 60,
  Meh: 40,
  Bad: 20,
};

// Map mood strings to colors
const moodToColor = {
  Happy: lightModeColors.moodAccent,
  Good: lightModeColors.moodGood,
  Okay: lightModeColors.moodOkay,
  Meh: lightModeColors.moodMeh,
  Bad: lightModeColors.moodBad,
};

function Home() {
  const [viewMode, setViewMode] = useState("weekly");
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch moods on component mount
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedMoods = await getUserMoods("demo-user"); // Replace with actual user ID
        setMoods(fetchedMoods);
      } catch (err) {
        setError("Failed to fetch moods");
        console.error("Error fetching moods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  // Transform mood data for the bar chart
  const barData = moods
    .slice(0, 7) // Get last 7 days
    .map((mood) => ({
      value: moodToValue[mood.moodreported as keyof typeof moodToValue] || 0,
      label: new Date(mood.createdAt).getDate().toString(),
      frontColor:
        moodToColor[mood.moodreported as keyof typeof moodToColor] || lightModeColors.moodMeh,
    }))
    .reverse(); // Show oldest to newest

  // Mood indicators with their colors
  const moodIndicators = [
    { color: lightModeColors.moodAccent, label: "Happy" },
    { color: lightModeColors.moodGood, label: "Good" },
    { color: lightModeColors.moodOkay, label: "Okay" },
    { color: lightModeColors.moodMeh, label: "Meh" },
    { color: lightModeColors.moodBad, label: "Bad" },
  ];

  // Generate calendar data for the monthly view
  const generateCalendarData = (): DayInfo[] => {
    const daysInMonth = 31;
    const days: DayInfo[] = [];

    // Create a map of day to mood for quick lookup
    const moodsByDay = new Map(
      moods.map((mood) => [
        new Date(mood.createdAt).getDate(),
        moodToColor[mood.moodreported as keyof typeof moodToColor] || lightModeColors.moodMeh,
      ]),
    );

    // Create days array (1-31)
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        moodColor: moodsByDay.get(i) || lightModeColors.background, // Use background color if no mood
      });
    }

    return days;
  };

  const calendarData = generateCalendarData();

  // Split calendar data into weeks for rendering
  const weeks: DayInfo[][] = [];
  let currentWeek: DayInfo[] = [];

  calendarData.forEach((day, index) => {
    currentWeek.push(day);

    if ((index + 1) % 7 === 0 || index === calendarData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={lightModeColors.moodAccent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
            onPress={() => setViewMode("monthly")}
          >
            <Text style={[styles.monthlyText, viewMode === "monthly" && styles.activeToggleText]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "weekly" && styles.activeToggleButton]}
            onPress={() => setViewMode("weekly")}
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

              <Text style={styles.dateRangeText}>
                {barData.length > 0
                  ? `${barData[0].label} — ${barData[barData.length - 1].label}, ${new Date().getFullYear()}`
                  : "No data available"}
              </Text>

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

                <Text style={styles.monthText}>
                  {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
                </Text>

                <TouchableOpacity>
                  <ArrowRightIcon width={24} height={24} />
                </TouchableOpacity>
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {weeks.map((weekDays, weekIndex) => (
                  <View key={`week-${weekIndex}`} style={styles.weekRow}>
                    {weekDays.map((day) => (
                      <View key={`day-${day.day}`} style={styles.dayContainer}>
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
      <MoodCheckinPopup userId="demo-user" />
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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: lightModeColors.moodBad,
    fontSize: 16,
    textAlign: "center",
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
