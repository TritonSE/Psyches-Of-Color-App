import { useRouter } from "expo-router";
import { useContext } from "react";
import { useContext } from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { UserContext } from "../contexts/userContext";

import { UserContext } from "../contexts/userContext";

import BiFire from "@/assets/bi_fire.png";
import fire from "@/assets/fire.png";
import Media from "@/assets/media.png";
import nature from "@/assets/nature.png";
import Settings from "@/assets/settings.png";
import Trophy from "@/assets/trophy.png";
import water from "@/assets/water.png";
import ButtonItem from "@/components/ProfileButton";
import { lightModeColors } from "@/constants/colors";

// import SGDemiBold from "@/assets/fonts/Social-Gothic-DemiBold.otf";
type Character = {
  color: string;
  character: string;
  characterIcon: ImageSourcePropType;
};

const characters: Character[] = [
  {
    color: "#83B26D",
    character: "nature",
    characterIcon: nature,
  },
  {
    color: "#FFC97E",
    character: "fire",
    characterIcon: fire,
  },
  {
    color: "#FCA397",
    character: "water",
    characterIcon: water,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { mongoUser } = useContext(UserContext);
  const selectedCharacter =
    characters.find((c) => c.character === mongoUser?.character) ?? characters[1];
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
                    <Text style={styles.number}>3</Text>
                  </View>
                  <Text style={styles.label}>Activities Completed</Text>
                </View>
                <View style={styles.achievementCard}>
                  <View style={styles.imageNumberContainer}>
                    <Image source={BiFire} style={styles.achievementIcon} />
                    <Text style={styles.number}>3</Text>
                  </View>
                  <Text style={styles.label}>Days of Streaks</Text>
                </View>
              </View>
            </View>

            {/* Saved Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saved</Text>
              <ButtonItem icon={Media} title="Resources" isSaved={true} />
            </View>

            {/* Activity History Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activity History</Text>
              <ButtonItem
                icon={Media}
                title="Understanding SAD"
                subtitle="Seasonal Affective Disorder"
                position="top"
              />
              <ButtonItem
                icon={Media}
                title="Story: What If?"
                subtitle="Anxiety"
                position="middle"
              />
              <ButtonItem
                icon={Media}
                title="Understanding Depression"
                subtitle="Depression"
                position="bottom"
              />
              <TouchableOpacity disabled={true}>
                <Text style={[styles.viewAll, styles.disabledText]}>View all history →</Text>
              </TouchableOpacity>
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
    paddingBottom: 228,
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
});
