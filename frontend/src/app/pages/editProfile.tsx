import { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// import AvatarSelection from "../../assets/avatar-selection";
import { Button } from "../../components/Button";

const styles = StyleSheet.create({
  editProfilePage: {
    gap: 20,
    alignItems: "center",
  },
  profileNavbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  },
  saveButton: {
    backgroundColor: "#D35144",
  },
});

export default function EditProfile() {
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [isCanceled, setIsCanceled] = useState(true);
  const router = useRouter();
  const navigateToRandomPage = () => {
    router.push("/randomPage");
  };
  return (
    <SafeAreaView style={styles.editProfilePage}>
      <View style={styles.profileNavbar}>
        <TouchableOpacity style={styles.returnArrow} onPress={navigateToRandomPage}>
          <Text>Arrow</Text>
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      {/* <AvatarSelection /> */}
      <View style={styles.changeAvatarSection}>
        <Text style={styles.changeAvatarText}>Change Avatar</Text>
      </View>
      <View style={styles.updateInfoSection}>
        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Type here..."
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Type here..."
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Type here..."
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
      </View>
      <Button
        onClick={() => {
          setIsSaved(!isSaved);
        }}
        additionalStyle={styles.saveButton}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          setIsCanceled(!isCanceled);
        }}
      >
        Cancel
      </Button>
    </SafeAreaView>
  );
}
