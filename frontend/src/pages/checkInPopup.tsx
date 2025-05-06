import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

import FaceIcon from "@/assets/mood-illustration.svg";
import { lightModeColors } from "@/constants/colors";

const moodColorMap = {
  Amazing: lightModeColors.moodAccent,
  Good: lightModeColors.moodGood,
  Meh: lightModeColors.moodOkay,
  Bad: lightModeColors.moodMeh,
  Awful: lightModeColors.moodBad,
};

const moods = [
  { label: "Amazing", value: "amazing" },
  { label: "Good", value: "good" },
  { label: "Meh", value: "meh" },
  { label: "Bad", value: "bad" },
  { label: "Awful", value: "awful" },
];

const { width: screenWidth } = Dimensions.get("window");

export default function CheckInPopup({ userId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

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
    const today = new Date().toISOString().split("T")[0];
    const key = `moodCheckin-${userId}-${today}`;

    await AsyncStorage.setItem(key, selectedMood);
    setShowPopup(false);
  };

  return (
    <>
      <Modal visible={showPopup} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
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
                    color={selectedMood === mood.value ? moodColorMap[mood.label] : "#ccc"}
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
          </View>
        </View>
      </Modal>

      {/* Note: using this for testing purposes */}
      {__DEV__ && (
        <Pressable
          onPress={async () => {
            const today = new Date().toISOString().split("T")[0];
            const key = `moodCheckin-${userId}-${today}`;
            await AsyncStorage.removeItem(key);
            setShowPopup(true);
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
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
