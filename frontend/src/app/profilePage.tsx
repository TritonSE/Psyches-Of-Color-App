import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import mediaIcon from "@/assets/Media.png";
import fireIcon from "@/assets/bi_fire.png";
import frogImage from "@/assets/frog.png";
import settingsIcon from "@/assets/settings.png";
import trophyIcon from "@/assets/trophy.png";
import ButtonItem from "@/components/profileButton";

// Importing assets

export default function ProfilePage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture and Settings */}
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.settingsIcon}>
            <Image source={settingsIcon} style={styles.icon} />
          </TouchableOpacity>
          <Image source={frogImage} style={styles.profileImage} />
        </View>

        {/* Gray Box */}
        <View style={styles.bottomSection}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>Michael Jordan</Text>
            <TouchableOpacity>
              <Text style={styles.editProfile}>Edit profile</Text>
            </TouchableOpacity>
          </View>

          {/* Achievements Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementContainer}>
              <View style={styles.achievementCard}>
                <View style={styles.imageNumberContainer}>
                  <Image source={trophyIcon} style={styles.achievementIcon} />
                  <Text style={styles.number}>3</Text>
                </View>
                <Text style={styles.label}>Activities Completed</Text>
              </View>
              <View style={styles.achievementCard}>
                <View style={styles.imageNumberContainer}>
                  <Image source={fireIcon} style={styles.achievementIcon} />
                  <Text style={styles.number}>3</Text>
                </View>
                <Text style={styles.label}>Days of Streaks</Text>
              </View>
            </View>
          </View>

          {/* Saved Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved</Text>
            <ButtonItem icon={mediaIcon} title="Resources" isSaved={true} />
          </View>

          {/* Activity History Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity History</Text>
            <ButtonItem
              icon={mediaIcon}
              title="Understanding SAD"
              subtitle="Seasonal Affective Disorder"
              position="top"
            />
            <ButtonItem
              icon={mediaIcon}
              title="Story: What If?"
              subtitle="Anxiety"
              position="middle"
            />
            <ButtonItem
              icon={mediaIcon}
              title="Understanding Depression"
              subtitle="Depression"
              position="bottom"
            />
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all history →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    position: "relative",
  },
  settingsIcon: {
    position: "absolute",
    top: 10,
    right: 16,
    zIndex: 1,
  },
  icon: {
    width: 37,
    height: 37,
    resizeMode: "contain",
  },
  profileImage: {
    width: 194,
    height: 194,
    borderRadius: 50,
    marginBottom: 10,
    zIndex: 2,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 0,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingTop: 112,
    paddingHorizontal: 20,
    marginTop: -126,
    marginBottom: -20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  editProfile: {
    fontSize: 16,
    color: "#484848",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1D1B20",
  },
  achievementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  achievementCard: {
    width: "48%",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  achievementIcon: {
    width: 35,
    height: 35,
  },
  number: {
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "left",
  },
  label: {
    fontSize: 14,
    color: "#555",
    textAlign: "left",
    marginTop: 5,
  },
  viewAll: {
    marginTop: 10,
    fontSize: 18,
    color: "#484848",
  },
});
