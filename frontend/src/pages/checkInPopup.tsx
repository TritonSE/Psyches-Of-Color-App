import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

import FaceIcon from "@/assets/mood-illustration.svg";
import { lightModeColors } from "@/constants/colors";
import { logMood } from "@/lib/api";

// Update color map to match mood values
const moodColorMap = {
  Happy: lightModeColors.moodAccent,
  Good: lightModeColors.moodGood,
  Okay: lightModeColors.moodOkay,
  Meh: lightModeColors.moodMeh,
  Bad: lightModeColors.moodBad,
};

const moods = [
  { label: "Happy", value: "Happy" },
  { label: "Good", value: "Good" },
  { label: "Okay", value: "Okay" },
  { label: "Meh", value: "Meh" },
  { label: "Bad", value: "Bad" },
] as const;

type MoodValue = (typeof moods)[number]["value"];

const { width: screenWidth } = Dimensions.get("window");

interface CheckInPopupProps {
  userId: string;
}

export default function CheckInPopup({ userId }: CheckInPopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const checkMoodStatus = async () => {
      const today = new Date().toISOString().split("T")[0];
      const key = `moodCheckin-${userId}-${today}`;
      const hasCheckedIn = await AsyncStorage.getItem(key);

      if (!hasCheckedIn) {
        setShowPopup(true);
      }
    };

    checkMoodStatus();
  }, [userId]);

  const handleCheckIn = async () => {
    if (!selectedMood) return;

    try {
      // Log the mood to the backend - no need to convert case since values match
      await logMood(userId, selectedMood);

      // Store in AsyncStorage to prevent multiple check-ins
      const today = new Date().toISOString().split("T")[0];
      const key = `moodCheckin-${userId}-${today}`;
      await AsyncStorage.setItem(key, selectedMood);

      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to log mood:", error);
      // You might want to show an error message to the user here
    }
  };

  const selectedMoodLabel = moods.find((m) => m.value === selectedMood)?.label;

  return (
    <>
      <Modal visible={showPopup} transparent animationType="slide">
        <Pressable
          style={styles.overlay}
          onPress={() => {
            if (showConfirmation) {
              setShowPopup(false);
              setShowConfirmation(false);
              setSelectedMood(null);
            }
          }}
        >
          <View style={styles.bottomSheet}>
            {!showConfirmation ? (
              <>
                <Text style={styles.heading}>How are you today?</Text>

                <View style={styles.moodRow}>
                  {moods.map((mood) => (
                    <Pressable
                      key={mood.value}
                      onPress={() => setSelectedMood(mood.value)}
                      style={styles.faceContainer}
                    >
                      <FaceIcon
                        width={50}
                        height={50}
                        color={selectedMood === mood.value ? moodColorMap[mood.value] : "#ccc"}
                      />
                      <Text style={styles.label}>{mood.label}</Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  onPress={handleCheckIn}
                  style={[styles.logButton, !selectedMood && { opacity: 0.5 }]}
                >
                  <Text style={styles.logButtonText}>LOG MOOD</Text>
                </Pressable>
              </>
            ) : (
              <>
                <FaceIcon
                  width={80}
                  height={80}
                  color={selectedMood ? moodColorMap[selectedMood] : "#ccc"}
                />
                <Text style={styles.subtext}>
                  {`Glad you're feeling ${selectedMoodLabel?.toLowerCase() ?? ""}!`}
                </Text>
                <Text style={styles.subtext}>Remember to log your mood every day.</Text>
              </>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Note: using this for testing purposes */}
      {__DEV__ && (
        <Pressable
          onPress={async () => {
            const today = new Date().toISOString().split("T")[0];
            const key = `moodCheckin-${userId}-${today}`;
            await AsyncStorage.removeItem(key);
            setShowPopup(true);
            setShowConfirmation(false);
            setSelectedMood(null);
          }}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset Check-In (Test)</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    width: screenWidth,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subtext: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  faceContainer: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  logButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginTop: 10,
  },
  logButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
