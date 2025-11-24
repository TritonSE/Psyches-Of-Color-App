import { useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from "react-native";

import FaceIcon from "@/assets/mood-illustration.svg";
import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";
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

const moodTextMap = {
  Happy: "So glad you're feeling happy today!",
  Good: "Glad you're feeling good!",
  Okay: "Feeling okay today? Nice — steady days count too.",
  Meh: "That's alright, we all have those days.",
  Bad: "Really sorry you're feeling bad — hope things brighten up soon.",
};

type MoodValue = (typeof moods)[number]["value"];

const { width: screenWidth } = Dimensions.get("window");

type CheckInPopupProps = {
  userId: string;
  // Parent-controlled flag indicating whether the user has logged today
  visible: boolean;
  // Setter from parent to mark the user as having logged today
  onClose: () => void;
};

export default function CheckInPopup({ userId, visible, onClose }: CheckInPopupProps) {
  const { firebaseUser, refreshMongoUser } = useAuth();
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    if (showConfirmation) {
      onClose();
      setShowConfirmation(false);
      setSelectedMood(null);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedMood) return;

    try {
      const token = await firebaseUser?.getIdToken();
      if (!firebaseUser || !token) {
        return;
      }

      await logMood(userId, selectedMood, token);
      await refreshMongoUser();

      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to log mood:", error);
    }
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View style={styles.bottomSheet}>
            {!showConfirmation ? (
              <>
                <Text style={styles.heading}>How are you today?</Text>

                <View style={styles.moodRow}>
                  {moods.map((mood) => (
                    <Pressable
                      key={mood.value}
                      onPress={() => {
                        setSelectedMood(mood.value);
                      }}
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
                  onPress={() => void handleCheckIn()}
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
                  {selectedMood ? moodTextMap[selectedMood] : "Mood logged!"}
                </Text>
                <Text style={styles.subtext}>Remember to log your mood every day.</Text>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
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
