import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import { CharacterCarousel, characters } from "@/components/CharacterCarousel";
import { UserContext } from "@/contexts/userContext";
import { updateUserCharacter } from "@/lib/auth";

const styles = StyleSheet.create({
  editCompanionPage: {
    gap: 20,
    alignItems: "center",
  },
  profileNavbar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 58,
  },
  returnArrow: {
    paddingLeft: 0,
  },
  profileTitle: {
    textAlign: "center",
    color: "#6C6C6C",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0,
  },
  changeAvatarSection: {
    justifyContent: "center",
    marginBottom: 20,
  },
  changeAvatarText: {
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0.1,
    color: "#484848",
  },
  updateInfoSection: {
    gap: 10,
    marginBottom: 20,
    width: 356,
  },
  inputSection: {
    gap: 10,
  },
  inputTitle: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: 0,
  },
  cancelButton: {
    backgroundColor: "#D35144",
  },
});

export default function EditCharacter() {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(1);
  const [initialCharacterIndex, setInitialCharacterIndex] = useState(1);
  const router = useRouter();
  const { mongoUser, setMongoUser } = useContext(UserContext);

  useEffect(() => {
    if (mongoUser?.character) {
      for (let i = 0; i < characters.length; i++) {
        if (characters[i].character === mongoUser?.character) {
          setSelectedCharacterIndex(i);
          setInitialCharacterIndex(i);
          break;
        }
      }
    }
  }, [mongoUser]);

  const onSave = async () => {
    const user = await updateUserCharacter(characters[selectedCharacterIndex].character);
    setMongoUser(user);
    router.back();
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.editCompanionPage}>
      <View style={styles.profileNavbar}>
        <TouchableOpacity style={styles.returnArrow} onPress={navigateBack}>
          <Ionicons name="arrow-back-outline" size={24} color="#B4B4B4" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        {/* Place an empty view on the right so the arrow goes on the left and "Profile" text in the center */}
        <View />
      </View>
      <View style={styles.changeAvatarSection}>
        <Text style={styles.changeAvatarText}>Edit Companion</Text>
      </View>
      <CharacterCarousel
        initialCharacterIndex={initialCharacterIndex}
        selectedIndex={selectedCharacterIndex}
        setSelectedIndex={setSelectedCharacterIndex}
      />
      <Button
        onPress={() => {
          void onSave();
        }}
      >
        Save
      </Button>
      <Button onPress={navigateBack} style={styles.cancelButton}>
        Cancel
      </Button>
    </SafeAreaView>
  );
}
