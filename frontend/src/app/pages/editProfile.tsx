import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
// import AvatarSelection from "../../assets/avatar-selection";
import { Button } from "../../components/Button";

const styles = StyleSheet.create({
  editProfilePage: {
    gap: 20,
    alignItems: "center",
  },
  profileNavbar: {
    backgroundColor: "green",
    justifyContent: "center",
    marginBottom: 20,
    height: 58,
  },
  profileTitle: {
    textAlign: "center",
  },
  changeAvatarSection: {
    justifyContent: "center",
    marginBottom: 20,
  },
  changeAvatarText: {
    textAlign: "center",
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
  return (
    <View style={styles.editProfilePage}>
      <View style={styles.profileNavbar}>
        <Text style={styles.profileTitle}>Edit Profile</Text>
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
    </View>
  );
}
