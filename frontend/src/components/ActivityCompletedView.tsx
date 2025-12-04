import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import NextButton from "@/components/NextButton";
import { lightModeColors } from "@/constants/colors";

type ActivityCompletedViewProps = {
  onFinish: () => void;
};

export default function ActivityCompletedView({ onFinish }: ActivityCompletedViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={120} color={lightModeColors.primaryGreen} />
        </View>

        <Text style={styles.title}>Activity Complete!</Text>
        <Text style={styles.subtitle}>{"Great job! Youve finished this lesson."}</Text>
      </View>

      <View style={styles.footer}>
        <NextButton onPress={onFinish} textOption="Finish" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: "SG-Bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "SG-Regular",
    color: "#666",
    textAlign: "center",
    maxWidth: "80%",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
