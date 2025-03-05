import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { PermissionStatus } from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [dailyReminder, setDailyReminder] = useState(false);
  const [locationTracking, setLocationTracking] = useState(false);
  const [reminderTime] = useState("9:00 AM");
  const [setErrorMsg] = useState<string | null>(null);

  // Navigation functions
  const navigateToProfilePage = () => {
    router.push("/profilePage");
  };

  const navigateToRandomPage = () => {
    router.push("/randomPage");
  };
  const handleLocationToggle = async () => {
    if (!locationTracking) {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status:", status);
      if (status !== PermissionStatus.GRANTED) {
        setErrorMsg("Permission to access location was denied.");
        Alert.alert(
          "Location Permission Denied",
          "Please enable location permissions in your device settings.",
        );
        return;
      }

      // Start location tracking
      try {
        const location = await Location.getCurrentPositionAsync({});
        console.log("Location:", location);
        Alert.alert("Location Enabled", "Location tracking is now active.");
        setLocationTracking(true);
      } catch (error) {
        console.error("Error starting location tracking:", error);
        setErrorMsg("Failed to start location tracking.");
      }
    } else {
      // Stop location tracking
      setLocationTracking(false);
      Alert.alert("Location Disabled", "Location tracking has been turned off.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToProfilePage}>
            <Ionicons name="arrow-back-outline" size={24} color="#B4B4B4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={[styles.card, styles.topRoundedCard]}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardTitle}>Daily reminder</Text>
              <Text style={styles.cardSubtitle}>Enable reminders to stay on track</Text>
            </View>
            <Switch
              value={dailyReminder}
              onValueChange={() => {
                setDailyReminder(!dailyReminder);
              }}
              trackColor={{ false: "#E5E7EB", true: "#c13d2f" }}
              thumbColor={dailyReminder ? "#FFFFFF" : "#B4B4B4"}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        <View style={[styles.card, styles.bottomRoundedCard]}>
          <View style={styles.row}>
            <Text style={styles.cardTitle}>Reminder Time</Text>
            <Text style={styles.time}>{reminderTime}</Text>
          </View>
        </View>

        {/* Privacy */}
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Location Tracking</Text>
              <Text style={styles.cardSubtitle}>
                Enable location to help us find resources near you
              </Text>
            </View>
            <Switch
              value={locationTracking}
              onValueChange={handleLocationToggle}
              trackColor={{ false: "#E5E7EB", true: "#c13d2f" }}
              thumbColor={locationTracking ? "#FFFFFF" : "#B4B4B4"}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Support */}
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={[styles.card, styles.topRoundedCard]}>
          <TouchableOpacity style={styles.row} onPress={navigateToRandomPage}>
            <Text style={styles.cardTitle}>App support</Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.bottomRoundedCard]}>
          <TouchableOpacity style={styles.row} onPress={navigateToRandomPage}>
            <Text style={styles.cardTitle}>Feedback</Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 176,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginRight: 24,
  },
  textContainer: {
    flexShrink: 1,
    marginRight: 10,
  },
  sectionTitle: {
    color: "#484848",
    fontFamily: "Social Gothic",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.15,
    marginTop: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    marginTop: 10,
  },
  topRoundedCard: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  bottomRoundedCard: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -1,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  cardTitle: {
    color: "#000",
    fontFamily: "Archivo",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  cardSubtitle: {
    color: "#6C6C6C",
    fontFamily: "Archivo",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  time: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Archivo",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
});