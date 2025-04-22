import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BiFire from "@/assets/bi_fire.png";
import Frog from "@/assets/frog.png";
import Media from "@/assets/media.png";
import Settings from "@/assets/settings.png";
import Trophy from "@/assets/trophy.png";
import ButtonItem from "@/components/ProfileButton";
import { lightModeColors } from "@/constants/colors";

// import SGDemiBold from "@/assets/fonts/Social-Gothic-DemiBold.otf";

export default function ProfilePage() {
  const router = useRouter();

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

  // Navigate to randomPage when the button is pressed
  const navigateToRandomPage = () => {
    router.push("/randomPage");
  };

  const navigateToSettingsPage = () => {
    router.push("/settings");
  };

  const navigateToEditProfilePage = () => {
    router.push("/editProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture and Settings */}
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.settingsIcon} onPress={navigateToSettingsPage}>
            <Image source={Settings} style={styles.icon} />
          </TouchableOpacity>
          <Image source={Frog} style={styles.profileImage} />
        </View>

        {/* WHite Box at Bottom*/}
        <View style={styles.bottomSection}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>Michael Jordan</Text>
          </View>

          {/* Edit Section */}
          <View style={styles.editContainer}>
            <TouchableOpacity onPress={navigateToEditProfilePage}>
              <View style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToRandomPage}>
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
            <ButtonItem icon={Media} title="Story: What If?" subtitle="Anxiety" position="middle" />
            <ButtonItem
              icon={Media}
              title="Understanding Depression"
              subtitle="Depression"
              position="bottom"
            />
            <TouchableOpacity onPress={navigateToRandomPage}>
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
    backgroundColor: lightModeColors.profileBackground,
    alignItems: "center",
    paddingTop: 54.66,
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
});
