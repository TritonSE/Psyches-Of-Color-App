import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { deleteAccount } from "@/lib/auth";

export default function SettingsScreen() {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  const navigateToChangePassword = () => {
    router.push("/changePassword");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            void (async () => {
              const result = await deleteAccount();
              if (result.success) {
                Alert.alert("Account Deleted", "Your account has been successfully deleted.", [
                  {
                    text: "OK",
                    onPress: () => {
                      router.replace("/(auth)/signIn");
                    },
                  },
                ]);
              } else {
                Alert.alert("Error", result.error ?? "Failed to delete account. Please try again.");
              }
            })();
          },
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons name="arrow-back-outline" size={24} color="#B4B4B4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={[styles.card, styles.topRoundedCard]}>
          <TouchableOpacity style={styles.row} onPress={navigateToChangePassword}>
            <Text style={styles.cardTitle}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.bottomRoundedCard]}>
          <TouchableOpacity style={styles.row} onPress={handleDeleteAccount}>
            <Text style={[styles.cardTitle, styles.deleteText]}>Delete Account</Text>
            <Ionicons name="chevron-forward" size={20} color="#c13d2f" />
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
  deleteText: {
    color: "#c13d2f",
  },
});
