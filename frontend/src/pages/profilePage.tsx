import { Link, useRouter } from "expo-router";
import { useContext, useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "../contexts/userContext";

import BiFire from "@/assets/bi_fire.png";
import Settings from "@/assets/settings.png";
import Trophy from "@/assets/trophy.png";
import { characters } from "@/components/CharacterCarousel";
import { lightModeColors } from "@/constants/colors";
import { useGetJournalEntries } from "@/lib/journalEntries";

const resourcesPhoneNumbers = [
  {
    name: "National Suicide Hotline",
    number: "988",
  },
  {
    name: "Extreme Emergency",
    number: "911",
  },
  {
    name: "LGBTQIA Hotline",
    number: "1-888-843-4564",
  },
  {
    name: "Trevor Project",
    number: "1-866-488-7386",
  },
  {
    name: "Teens & Young Adults",
    number: "1-800-950-6264",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { mongoUser } = useContext(UserContext);
  const selectedCharacter =
    characters.find((c) => c.character === mongoUser?.character) ?? characters[1];
  const lessonsCompletedCount = mongoUser?.completedLessons?.length ?? 0;

  const { data: journalEntries } = useGetJournalEntries();

  const streakDays = useMemo(() => {
    const completed = mongoUser?.completedLessons ?? [];
    const journals = journalEntries ?? [];

    if ((!completed || completed.length === 0) && (!journals || journals.length === 0)) return 0;

    const formatDate = (d: Date): string => {
      const year = d.getFullYear().toString();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    };

    const daySet = new Set<string>();
    // Add lesson completion dates
    for (const c of completed) {
      try {
        const d = new Date(c.completedAt);
        if (!Number.isNaN(d.getTime())) {
          daySet.add(formatDate(d));
        }
      } catch {
        // ignore malformed dates
      }
    }

    // Add journal entry dates
    for (const j of journals) {
      try {
        const d = new Date(j.createdAt);
        if (!Number.isNaN(d.getTime())) {
          daySet.add(formatDate(d));
        }
      } catch {
        // ignore malformed dates
      }
    }

    let streak = 0;
    const cursor = new Date();
    // Count consecutive days including today where at least one lesson or journal entry was completed
    while (daySet.has(formatDate(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  }, [mongoUser?.completedLessons, journalEntries]);
  // State for achievements and streaks
  // const [achievementsCompleted, setAchievementsCompleted] = useState(3);
  // const [daysOfStreaks, setDaysOfStreaks] = useState(3);

  // Function to increment achievements
  // const incrementAchievements = () => {
  //   setAchievementsCompleted((prev) => prev + 1);
  // };

  // Function to increment streak days
  // const incrementStreaks = () => {
  //   setDaysOfStreaks((prev) => prev + 1);
  // };

  const navigateToSettingsPage = () => {
    router.push("/settings");
  };

  const navigateToEditProfilePage = () => {
    router.push("/editProfile");
  };

  const navigateToEditCompanionPage = () => {
    router.push("/editCharacter");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={{ position: "relative" }}>
          {/* Profile Picture and Settings */}
          <View style={styles.topSection}>
            <TouchableOpacity style={styles.settingsIcon} onPress={navigateToSettingsPage}>
              <Image source={Settings} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Image
            source={selectedCharacter.characterIcon}
            style={[styles.profileImage, { backgroundColor: selectedCharacter.color }]}
          />

          {/* White Box at Bottom*/}
          <View style={styles.bottomSection}>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.name}>{mongoUser?.name}</Text>
            </View>

            {/* Edit Section */}
            <View style={styles.editContainer}>
              <TouchableOpacity onPress={navigateToEditProfilePage}>
                <View style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToEditCompanionPage}>
                <View style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit Companion</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Achievements Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <View style={styles.achievementContainer}>
                <View style={styles.achievementCard}>
                  <View style={styles.imageNumberContainer}>
                    <Image source={Trophy} style={styles.achievementIcon} />
                    <Text style={styles.number}>{lessonsCompletedCount}</Text>
                  </View>
                  <Text style={styles.label}>Lessons Completed</Text>
                </View>
                <View style={styles.achievementCard}>
                  <View style={styles.imageNumberContainer}>
                    <Image source={BiFire} style={styles.achievementIcon} />
                    <Text style={styles.number}>{streakDays}</Text>
                  </View>
                  <Text style={styles.label}>Current Streak</Text>
                </View>
              </View>
            </View>

            {/* Saved Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Crisis Numbers</Text>
              {resourcesPhoneNumbers.map(({ name, number }) => (
                <View key={name} style={styles.resourcesRow}>
                  <Text style={styles.resourcesText}>{name}: </Text>
                  <Link style={styles.resourcesLink} href={`tel:${number}`}>
                    {number}
                  </Link>
                </View>
              ))}
            </View>
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
    backgroundColor: lightModeColors.profileBackground,
    height: 300,
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
    borderRadius: 100,
    position: "absolute",
    top: 70,
    alignSelf: "center",
    zIndex: 2,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 0,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingTop: 112,
    paddingHorizontal: 20,
    marginTop: -126,
    marginBottom: -20,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 0,
  },
  name: {
    fontSize: 24,
    color: lightModeColors.darkFont,
    fontFamily: "SG-DemiBold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: lightModeColors.secondaryDarkFont,
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    marginBottom: 48,
  },
  editButton: {
    flex: 1,
    width: 169,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: lightModeColors.lightFont,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: lightModeColors.overlayBackground,
  },
  editButtonText: {
    color: "#1E1E1E",
    fontSize: 14,
  },
  achievementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  achievementCard: {
    flex: 1,
    width: 169,
    height: 114,
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: lightModeColors.lightFont,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: lightModeColors.overlayBackground,
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
    color: "#1E1E1E",
    textAlign: "left",
    marginTop: 5,
  },
  viewAll: {
    marginTop: 10,
    fontSize: 16,
    color: lightModeColors.neutralFont,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
  resourcesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  resourcesText: {
    fontSize: 18,
    color: lightModeColors.secondaryDarkFont,
  },
  resourcesLink: {
    fontSize: 18,
    color: lightModeColors.secondaryDarkFont,
    textDecorationLine: "underline",
  },
});
