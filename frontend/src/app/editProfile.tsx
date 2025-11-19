import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import { UserContext } from "@/contexts/userContext";
import { User } from "@/types";
import env from "@/util/validateEnv";

const styles = StyleSheet.create({
  editProfilePage: {
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
  inputBox: {
    borderRadius: 12,
    borderColor: "#EBEBEB",
    borderWidth: 2,
    gap: 8,
    height: 49,
    padding: 15,
  },
  cancelButton: {
    backgroundColor: "#D35144",
  },
});

export default function EditProfile() {
  const [name, setName] = useState("");
  const router = useRouter();
  const { mongoUser, setMongoUser } = useContext(UserContext);

  const onSave = async () => {
    const firebaseUser = auth().currentUser;
    const idToken = await firebaseUser?.getIdToken();

    if (!firebaseUser || !idToken) return;

    // Update both Firebase and Mongo users' names
    const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/users/${firebaseUser.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setMongoUser(((await res.json()) as { user: User }).user);
      await firebaseUser.updateProfile({
        displayName: name,
      });
      router.back();
    } else {
      const text = await res.text().catch(() => "");
      console.warn("Failed to update name: ", res.status, text);
    }
  };

  useEffect(() => {
    if (mongoUser?.name) {
      setName(mongoUser?.name);
    }
  }, [mongoUser]);

  const navigateBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.editProfilePage}>
      <View style={styles.profileNavbar}>
        <TouchableOpacity style={styles.returnArrow} onPress={navigateBack}>
          <Ionicons name="arrow-back-outline" size={24} color="#B4B4B4" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        {/* Place an empty view on the right so the arrow goes on the left and "Profile" text in the center */}
        <View />
      </View>
      <View style={styles.changeAvatarSection}>
        <Text style={styles.changeAvatarText}>Edit Profile</Text>
      </View>
      <View style={styles.updateInfoSection}>
        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Type here..."
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
      </View>
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
