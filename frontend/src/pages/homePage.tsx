import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { BarChart } from "react-native-gifted-charts";

import { UserContext } from "../contexts/userContext";

import type { ImageSourcePropType } from "react-native";

import CheckinPopup from "@/app/Checkin/CheckInCompletedPopup";
import checkinIcon from "@/assets/checkinIcon.png";
import crisisBtn from "@/assets/crisisBtn.png";
import fireman from "@/assets/fireman.png";
import journalIcon from "@/assets/journalIcon.png";
import lessonsIcon from "@/assets/lessonsIcon.png";
import moodIcon from "@/assets/moodIcon.png";
import pencilJournal from "@/assets/pencilJournal.png";
import plantman from "@/assets/plantman.png";
import txtBoxHomePage from "@/assets/txtBoxHomePage.png";
import wateringCan from "@/assets/wateringcan.png";
import Button from "@/components/Button";
import ProgressBar from "@/components/Onboarding/ProgressBar";
import ArrowRightIcon from "@/assets/icons/arrow-icon-right.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-icon.svg";
import { lightModeColors } from "@/constants/colors";
import { Mood, getUserMoods } from "@/lib/api";
import MoodCheckinPopup from "@/pages/checkInPopup";
import { getJournalEntries } from "@/lib/journalEntries";

// Ensure Image receives the correct source type when PNG modules are typed as string
const IMG = {
  checkinIcon: checkinIcon as unknown as ImageSourcePropType,
  crisisBtn: crisisBtn as unknown as ImageSourcePropType,
  fireman: fireman as unknown as ImageSourcePropType,
  journalIcon: journalIcon as unknown as ImageSourcePropType,
  lessonsIcon: lessonsIcon as unknown as ImageSourcePropType,
  moodIcon: moodIcon as unknown as ImageSourcePropType,
  pencilJournal: pencilJournal as unknown as ImageSourcePropType,
  plantman: plantman as unknown as ImageSourcePropType,
  txtBoxHomePage: txtBoxHomePage as unknown as ImageSourcePropType,
  wateringCan: wateringCan as unknown as ImageSourcePropType,
};

type NewDayProps = {
  hasLoggedToday: boolean;
  onOpenMoodPopup: () => void;
  currentMood: keyof typeof moodToColor | null;
};

const NewDayComponent: React.FC<NewDayProps> = ({
  hasLoggedToday,
  onOpenMoodPopup,
  currentMood,
}) => {
  const [isNewDay, setIsNewDay] = useState<boolean>(() => !hasLoggedToday);

  useEffect(() => {
    // Derive whether it's a new day from the parent-provided flag
    setIsNewDay(!hasLoggedToday);
  }, [hasLoggedToday]);

  const moodColor = currentMood ? moodToColor[currentMood] : styles.moodHighlight.color;
  const moodTextDisplay = currentMood ? currentMood.toLowerCase() : "good";

  return (
    <>
      {isNewDay ? (
        <Text>Welcome to a new day! 🌞</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Mood Check-In</Text>
          <View style={styles.moodCheckinContainer}>
            <View style={styles.moodCheckinBox}>
              <View style={styles.moodContent}>
                <Image source={IMG.moodIcon} style={styles.moodIcon} />
                <Text style={styles.moodText}>
                  You're feeling
                  <Text style={[styles.moodHighlight, { color: moodColor }]}>
                    {` ${moodTextDisplay} `}
                  </Text>
                  today - {moodToText[currentMood as keyof typeof moodToText] || "nice!"}
                </Text>
              </View>

              {/* Button container */}
              <View style={{ width: "100%", alignItems: "center" }}>
                <Button style={styles.changeMoodButton} onPress={onOpenMoodPopup}>
                  <Text style={styles.changeMoodButtonText}>CHANGE MOOD</Text>
                </Button>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

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

const moodToText = {
  Happy: "love to see it!",
  Good: "nice!",
  Okay: "totally okay! Take it at your own pace.",
  Meh: "that's alright, we all have those days.",
  Bad: "I'm here with you. Be gentle with yourself.",
};

export default function HomePage() {
  const { mongoUser, firebaseUser } = useContext(UserContext);

  const [lessonCompletedToday, setLessonCompletedToday] = useState(false);
  const [journalCompletedToday, setJournalCompletedToday] = useState(false);

  useEffect(() => {
    const checkLessonToday = () => {
      const completed = mongoUser?.completedLessons ?? [];
      if (!completed || completed.length === 0) {
        setLessonCompletedToday(false);
        return;
      }

      const today = new Date();

      const isSameLocalDate = (dateLike: string | Date) => {
        const d = new Date(dateLike);
        return (
          d.getFullYear() === today.getFullYear() &&
          d.getMonth() === today.getMonth() &&
          d.getDate() === today.getDate()
        );
      };

      const found = completed.some((c) => {
        try {
          return isSameLocalDate(c.completedAt);
        } catch {
          return false;
        }
      });

      setLessonCompletedToday(!!found);
    };

    checkLessonToday();
  }, [mongoUser]);

  useEffect(() => {
    const checkJournalToday = async () => {
      if (!firebaseUser) {
        setJournalCompletedToday(false);
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const entries = await getJournalEntries(token);
        if (!entries || entries.length === 0) {
          setJournalCompletedToday(false);
          return;
        }

        const today = new Date();

        const isSameLocalDate = (dateLike: string | Date) => {
          const d = new Date(dateLike);
          return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
          );
        };

        const found = entries.some((e) => {
          try {
            return isSameLocalDate(e.createdAt);
          } catch {
            return false;
          }
        });

        setJournalCompletedToday(!!found);
      } catch (err) {
        console.error("Error checking journal entries:", err);
        setJournalCompletedToday(false);
      }
    };

    void checkJournalToday();
  }, [firebaseUser]);

  const [showCheckinPopup, setShowCheckinPopup] = useState(false);
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [currentMood, setCurrentMood] = useState<keyof typeof moodToColor | null>(null);
  const [weeklyCheckInCompleted, setWeeklyCheckInCompleted] = useState(false);

  // Mood tracker states moved from app/(tabs)/index.tsx
  const [viewMode, setViewMode] = useState("weekly");
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  const fetchMoods = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!mongoUser) {
        setMoods([]);
        setHasLoggedToday(false);
        setCurrentMood(null);
        return;
      }

      const fetchedMoods = await getUserMoods(mongoUser.uid);
      setMoods(fetchedMoods);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize time to just the date

      const todaysMood = fetchedMoods.find((m) => {
        const moodDate = new Date(m.createdAt);
        moodDate.setHours(0, 0, 0, 0);

        return moodDate.getTime() === today.getTime();
      });

      if (todaysMood) {
        // Cast the moodreported string to the expected type for safety
        setCurrentMood(todaysMood.moodreported as keyof typeof moodToColor);
      } else {
        setCurrentMood(null);
      }

      try {
        const lastCheck = mongoUser?.lastCompletedDailyCheckIn ?? null;
        if (!lastCheck) {
          setHasLoggedToday(false);
        } else {
          const lastDate = new Date(lastCheck);
          const today = new Date();
          const isSameDay =
            lastDate.getFullYear() === today.getFullYear() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getDate() === today.getDate();

          setHasLoggedToday(isSameDay);
        }
      } catch (err) {
        console.warn(
          "Could not determine if user logged today from lastCompletedDailyCheckIn:",
          err,
        );
        setHasLoggedToday(false);
      }
    } catch (err) {
      setError("Failed to fetch moods");
      console.error("Error fetching moods:", err);
    } finally {
      setLoading(false);
    }
  };

  const initialWeeklyCheckInState = () => {
    if (mongoUser) {
      const last = mongoUser.lastCompletedWeeklyCheckIn ?? null;
      if (!last) {
        setWeeklyCheckInCompleted(false);
      } else {
        const lastDate = new Date(last);
        if (isDateInCurrentWeek(lastDate)) {
          setWeeklyCheckInCompleted(true);
        } else {
          setWeeklyCheckInCompleted(false);
        }
      }
    } else {
      setWeeklyCheckInCompleted(false);
    }
  };

  useEffect(() => {
    void fetchMoods();
    initialWeeklyCheckInState();
  }, [mongoUser]);

  const isDateInCurrentWeek = (d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);

    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const day = start.getDay(); // 0 (Sun) - 6 (Sat)
    start.setDate(start.getDate() - day);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return date >= start && date <= end;
  };

  const handleCheckinPress = () => {
    try {
      if (!mongoUser) {
        router.push("/Checkin/Start");
        return;
      }

      const last = mongoUser.lastCompletedWeeklyCheckIn ?? null;
      if (!last) {
        router.push("/Checkin/Start");
        setWeeklyCheckInCompleted(false);
        return;
      }

      const lastDate = new Date(last);
      if (isDateInCurrentWeek(lastDate)) {
        setShowCheckinPopup(true);
        setWeeklyCheckInCompleted(true);
      } else {
        setWeeklyCheckInCompleted(false);
        router.push("/Checkin/Start");
      }
    } catch (err) {
      console.warn("Error checking lastCompletedWeeklyCheckIn:", err);
      router.push("/Checkin/Start");
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + weekOffset * 7);

    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handlePreviousWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };
  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  const dates = getCurrentWeekDates();

  const barData = dates.map((date) => {
    const mood = moods.find((m) => {
      const moodDate = new Date(m.createdAt);
      return (
        moodDate.getDate() === date.getDate() &&
        moodDate.getMonth() === date.getMonth() &&
        moodDate.getFullYear() === date.getFullYear()
      );
    });
    return {
      value: mood ? moodToValue[mood.moodreported as keyof typeof moodToValue] || 0 : 0,
      label: date.getDate().toString(),
      frontColor: mood
        ? moodToColor[mood.moodreported as keyof typeof moodToColor] || lightModeColors.moodMeh
        : lightModeColors.background,
      date,
    };
  });

  const moodIndicators = [
    { color: lightModeColors.moodAccent, label: "Happy" },
    { color: lightModeColors.moodGood, label: "Good" },
    { color: lightModeColors.moodOkay, label: "Okay" },
    { color: lightModeColors.moodMeh, label: "Meh" },
    { color: lightModeColors.moodBad, label: "Bad" },
  ];

  const getMonthData = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + monthOffset);
    today.setDate(1);

    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days: DayInfo[] = [];

    const moodsByDay = new Map(
      moods
        .filter((mood) => {
          const moodDate = new Date(mood.createdAt);
          return (
            moodDate.getMonth() === today.getMonth() &&
            moodDate.getFullYear() === today.getFullYear()
          );
        })
        .map((mood) => [
          new Date(mood.createdAt).getDate(),
          moodToColor[mood.moodreported as keyof typeof moodToColor] || lightModeColors.moodMeh,
        ]),
    );

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, moodColor: moodsByDay.get(i) ?? lightModeColors.progressBarBackground });
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setMonthOffset((prev) => prev - 1);
  };
  const handleNextMonth = () => {
    setMonthOffset((prev) => prev + 1);
  };

  const calendarData = getMonthData();

  const getCurrentMonthDisplay = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const weeks: DayInfo[][] = [];
  let currentWeek: DayInfo[] = [];
  calendarData.forEach((day, index) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0 || index === calendarData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hey {mongoUser?.name ?? "there"}!</Text>
            <Text style={styles.subtitle}>Welcome Back</Text>
          </View>
          <Button style={styles.crisisButton}>
            <Image source={IMG.crisisBtn}></Image>
          </Button>
        </View>

        {/* Quote Box */}
        <View style={styles.quoteBox}>
          <Image source={IMG.txtBoxHomePage}></Image>
          <Text style={styles.quote}>
            “Just like the seasons change, so do my feelings. This moment is temporary, and I will
            feel light again.”
          </Text>
          <Image source={IMG.wateringCan} style={styles.quoteImage} />
        </View>

        {/* Mood Check-in Section */}
        <NewDayComponent
          hasLoggedToday={hasLoggedToday}
          onOpenMoodPopup={() => {
            setShowMoodPopup(true);
          }}
          currentMood={currentMood}
        />
        {/* Progress Section */}
        <Text style={styles.sectionTitle}>Today's Progress</Text>

        <View style={styles.progressContainer}>
          {/* Row 1: Complete 3 Activities */}
          <TouchableOpacity
            style={styles.progressRow}
            onPress={() => {
              router.push("/activities");
            }}
          >
            <Image source={IMG.fireman} style={styles.progressIcon} />
            <View style={styles.progressTextWrapper}>
              <Text style={styles.taskLabel}>Complete Lesson</Text>
              <ProgressBar
                progress={lessonCompletedToday ? 1 : 0}
                style={styles.progressBar}
                fillColor={styles.progressBarColor}
              />
              <Text style={styles.taskCount}>{lessonCompletedToday ? "1/1" : "0/1"}</Text>
            </View>
          </TouchableOpacity>

          {/* Divider 1 */}
          <View style={styles.divider} />

          {/* Row 2: Complete Journal */}
          <TouchableOpacity
            style={styles.progressRow}
            onPress={() => {
              router.push("/journal");
            }}
          >
            <Image source={IMG.plantman} style={styles.progressIcon} />
            <View style={styles.progressTextWrapper}>
              <Text style={styles.taskLabel}>Complete Journal</Text>
              {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
              <ProgressBar
                progress={journalCompletedToday ? 1 : 0}
                style={styles.progressBar}
                fillColor={styles.progressBarColor}
              />
              <Text style={styles.taskCount}>{journalCompletedToday ? "1/1" : "0/1"}</Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* TODO: link to weekly check-in page */}
          <TouchableOpacity style={styles.progressRow} onPress={handleCheckinPress}>
            <Image source={IMG.wateringCan} style={styles.progressIcon} />
            <View style={styles.progressTextWrapper}>
              <Text style={styles.taskLabel}>Complete Weekly Check-in</Text>
              {/* <ProgressBar progress={0} width={null} color="#BF3B44" unfilledColor="#E5E5E5" borderWidth={0} height={10} /> */}
              <ProgressBar
                progress={weeklyCheckInCompleted ? 1 : 0 / 1}
                style={styles.progressBar}
                fillColor={styles.progressBarColor}
              ></ProgressBar>
              <Text style={styles.taskCount}>{weeklyCheckInCompleted ? "1/1" : "0/1"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Continue your Journey</Text>
        <View style={styles.buttons}>
          <Button
            style={styles.lessons}
            onPress={() => {
              router.push("/activities");
            }}
          >
            <Text style={styles.lessonsTitle}>Lessons</Text>
            <Image source={IMG.lessonsIcon} style={styles.lessonIcon}></Image>
          </Button>
          <View style={styles.row}>
            <Button
              style={styles.journal}
              onPress={() => {
                router.push("/journal");
              }}
            >
              <Text style={styles.journalTitle}>Journal</Text>
              <Image source={IMG.journalIcon} style={styles.journalIcon}></Image>
              <Image source={IMG.pencilJournal} style={styles.pencilJournal}></Image>
            </Button>
            <Button style={styles.checkin} onPress={handleCheckinPress}>
              <Text style={styles.checkinTitle}>Check-in</Text>
              <Image source={IMG.checkinIcon} style={styles.checkinIcon}></Image>
            </Button>
          </View>
        </View>
        {/* Mood Tracker (moved from app/(tabs)/index.tsx) */}
        <View style={styles.containerMoodTracker}>
          <StatusBar style="auto" />

          <Text style={styles.moodTitle}>Mood Tracker</Text>

          <View style={styles.moodChartContainer}>
            <View style={styles.moodToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.moodToggleButton,
                  viewMode === "monthly" && styles.moodActiveToggleButton,
                ]}
                onPress={() => {
                  setViewMode("monthly");
                }}
              >
                <Text
                  style={[
                    styles.moodMonthlyText,
                    viewMode === "monthly" && styles.moodActiveToggleText,
                  ]}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.moodToggleButton,
                  viewMode === "weekly" && styles.moodActiveToggleButton,
                ]}
                onPress={() => {
                  setViewMode("weekly");
                }}
              >
                <Text
                  style={[
                    styles.moodWeeklyText,
                    viewMode === "weekly" && styles.moodActiveToggleText,
                  ]}
                >
                  Weekly
                </Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={[styles.moodContainerCenter, styles.moodCenterContent]}>
                <ActivityIndicator size="large" color={lightModeColors.moodAccent} />
              </View>
            ) : error ? (
              <View style={[styles.moodContainerCenter, styles.moodCenterContent]}>
                <Text style={styles.moodErrorText}>{error}</Text>
              </View>
            ) : (
              <>
                {viewMode === "weekly" ? (
                  <>
                    <View style={styles.moodDateNavigation}>
                      <TouchableOpacity onPress={handlePreviousWeek}>
                        <ArrowLeftIcon width={24} height={24} />
                      </TouchableOpacity>

                      <Text style={styles.moodDateRangeText}>
                        {barData.length > 0
                          ? `${barData[0].date.toLocaleString("default", { month: "long" })} ${barData[0].label} - ${barData[barData.length - 1].date.toLocaleString("default", { month: "long" })} ${barData[barData.length - 1].label}, ${barData[0].date.getFullYear()}`
                          : "No data available"}
                      </Text>

                      <TouchableOpacity onPress={handleNextWeek}>
                        <ArrowRightIcon width={24} height={24} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.moodChartWithLegend}>
                      <View style={styles.moodIndicatorsColumn}>
                        {moodIndicators.map((mood, index) => (
                          <View key={index} style={styles.moodIndicatorRow}>
                            <View style={[styles.moodDot, { backgroundColor: mood.color }]} />
                          </View>
                        ))}
                      </View>

                      <View style={styles.moodChartsArea}>
                        <BarChart
                          data={barData}
                          width={270}
                          height={200}
                          barWidth={26}
                          spacing={12}
                          roundedTop
                          barBorderTopLeftRadius={8}
                          barBorderTopRightRadius={8}
                          roundedBottom={false}
                          hideRules
                          hideYAxisText
                          xAxisThickness={0}
                          yAxisThickness={0}
                          hideOrigin
                          backgroundColor={lightModeColors.background}
                          noOfSections={3}
                          maxValue={80}
                        />
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.moodMonthlyContainer}>
                      <View style={styles.moodMonthNavigation}>
                        <TouchableOpacity onPress={handlePreviousMonth}>
                          <ArrowLeftIcon width={24} height={24} />
                        </TouchableOpacity>

                        <Text style={styles.moodMonthText}>{getCurrentMonthDisplay()}</Text>

                        <TouchableOpacity onPress={handleNextMonth}>
                          <ArrowRightIcon width={24} height={24} />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.moodCalendarGrid}>
                        {weeks.map((weekDays, weekIndex) => (
                          <View key={`week-${weekIndex}`} style={styles.moodWeekRow}>
                            {weekDays.map((day) => (
                              <View key={`day-${day.day}`} style={styles.moodDayContainer}>
                                <View
                                  style={[styles.moodDayCircle, { backgroundColor: day.moodColor }]}
                                >
                                  <Text style={styles.moodDayText}>{day.day}</Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        ))}
                      </View>

                      <View style={styles.moodMonthlyLegend}>
                        {moodIndicators.map((mood, index) => (
                          <View key={index} style={styles.moodLegendItem}>
                            <View style={[styles.moodLegendDot, { backgroundColor: mood.color }]} />
                            <Text style={styles.moodLegendText}>{mood.label}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </>
                )}
              </>
            )}
          </View>

          {(!hasLoggedToday || showMoodPopup) && mongoUser && (
            <MoodCheckinPopup
              userId={mongoUser.uid}
              onMoodLogged={() => {
                fetchMoods();
                setHasLoggedToday(true);
                // setShowMoodPopup(false);
              }}
              visible={showMoodPopup || !hasLoggedToday}
              onClose={() => {
                setShowMoodPopup(false);
              }}
            />
          )}
          <CheckinPopup
            visible={showCheckinPopup}
            onClose={() => {
              setShowCheckinPopup(false);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F6F6EA",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
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
    fontWeight: "800", // og 600
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
    width: "100%",
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
    flex: 1,
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
    flex: 1,
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

  //mood check-in styling
  moodCheckinContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 5,
  },
  moodCheckinBox: {
    backgroundColor: "#F6F6EA",
    borderWidth: 1,
    borderColor: "#2E563C",
    borderRadius: 16,
    padding: 19,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  moodContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  moodIcon: {
    width: 43.496,
    height: 43.672,
    marginLeft: 8,
    marginRight: 16,
  },
  moodText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "black",
    // color: "#2E563C",
    marginBottom: 12,
    flexShrink: 1,
  },
  moodHighlight: {
    fontWeight: "700",
    color: "#2E563C",
  },
  changeMoodButton: {
    backgroundColor: "#2E563C",
    height: 36,
    paddingVertical: 0, //og 8
    paddingHorizontal: 20,
    borderRadius: 160,
    alignSelf: "center",
    width: "53%",
    marginTop: 1, // og 2
  },
  changeMoodButtonText: {
    color: "#F6F6EA",
    fontFamily: "Poppins",
    fontSize: 14, //16
    fontWeight: "600",
  },
  // Mood tracker styles
  containerMoodTracker: {
    marginTop: 24,
    backgroundColor: lightModeColors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 0.5,
    borderColor: lightModeColors.moodAccent,
    marginBottom: 24,
  },
  moodTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: lightModeColors.moodAccent,
    fontFamily: "Archivo",
    marginBottom: 12,
  },
  moodChartContainer: {
    backgroundColor: lightModeColors.background,
  },
  moodToggleContainer: {
    flexDirection: "row",
    backgroundColor: lightModeColors.background,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: lightModeColors.moodAccent,
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
    marginBottom: 12,
  },
  moodToggleButton: {
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "center",
    minWidth: 92,
  },
  moodActiveToggleButton: {
    backgroundColor: lightModeColors.moodAccent,
  },
  moodMonthlyText: {
    fontSize: 14,
    color: lightModeColors.moodAccent,
    textAlign: "center",
  },
  moodWeeklyText: {
    fontSize: 14,
    color: lightModeColors.moodAccent,
    textAlign: "center",
  },
  moodActiveToggleText: {
    color: lightModeColors.background,
  },
  moodContainerCenter: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  moodCenterContent: {
    alignItems: "center",
  },
  moodErrorText: {
    color: lightModeColors.moodBad,
  },
  moodDateNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  moodDateRangeText: {
    fontSize: 12,
    color: lightModeColors.moodAccent,
  },
  moodChartWithLegend: {
    flexDirection: "row",
    alignItems: "center",
  },
  moodIndicatorsColumn: {
    justifyContent: "space-between",
    height: 200,
    marginRight: 8,
  },
  moodDot: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  moodIndicatorRow: {
    marginVertical: 6,
  },
  moodChartsArea: {
    flex: 1,
    alignItems: "center",
  },
  moodMonthlyContainer: {
    paddingVertical: 10,
  },
  moodMonthNavigation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    gap: 40,
  },
  moodMonthText: {
    fontSize: 14,
    fontWeight: "500",
    color: lightModeColors.moodAccent,
  },
  moodCalendarGrid: {
    marginTop: 10,
  },
  moodWeekRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    gap: 12,
  },
  moodDayContainer: {
    alignItems: "center",
    width: 26,
  },
  moodDayCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  moodDayText: {
    fontSize: 8,
    fontWeight: "600",
    color: lightModeColors.background,
  },
  moodMonthlyLegend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
    gap: 10,
  },
  moodLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  moodLegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  moodLegendText: {
    fontSize: 12,
    color: lightModeColors.moodAccent,
  },
});
