import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Journal from "@/assets/journal.svg";
import Photo from "@/assets/photo.svg";
import Button from "@/components/Button";
import ExitJournal from "@/components/ExitJournal";
import { lightModeColors } from "@/constants/colors";
import { UserContext } from "@/contexts/userContext";
import { createJournalEntry } from "@/lib/journalEntries";

export default function CreateJournal() {
  const [titleText, setTitleText] = useState("");
  const [paragraphText, setParagraphText] = useState("");
  const currentDate = new Date();
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currMonth = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${currMonth.toUpperCase()} ${String(day)}, ${String(year)}`;

  const [image, setImage] = useState<string | null>(null);
  const { firebaseUser } = useContext(UserContext);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert("Permission required", "Camera permission is needed to take a photo.");
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert("Permission required", "Media library permission is needed to select a photo.");
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChoosePhoto = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSaveJournal = async () => {
    // TODO error handling
    try {
      if (!firebaseUser) return;
      const token = await firebaseUser.getIdToken();
      await createJournalEntry(token, titleText, paragraphText, image ?? undefined);
      router.back();
    } catch (error) {
      console.error(`Error saving journal: ${error as string}`);
    }
  };

  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showExitModal}
          onRequestClose={() => {
            setShowExitModal(false);
          }}
        >
          <View style={styles.blurContainer}>
            <ExitJournal
              onClose={() => {
                setShowExitModal(false);
              }}
            />
          </View>
        </Modal>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // Show the confirm exit modal if any fields were modified
              const isModified = titleText !== "" || paragraphText !== "" || image !== null;
              if (isModified) {
                setShowExitModal(true);
              } else {
                router.back();
              }
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Journal</Text>
        </View>
        <View style={styles.enterTitle}>
          <View style={styles.titleInputContainer}>
            {titleText === "" && <Text style={styles.titlePlaceholder}>Enter Title...</Text>}
            <TextInput
              style={styles.titleInput}
              value={titleText}
              onChangeText={setTitleText}
              placeholder=""
            />
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.subheader}>
          <Journal />
          <Text style={styles.subheadText}>Journal Entry</Text>
        </View>

        <View style={styles.inputContainer}>
          {paragraphText === "" && <Text style={styles.placeholder}>Type here</Text>}
          <TextInput
            style={styles.input}
            value={paragraphText}
            onChangeText={setParagraphText}
            placeholder=""
            multiline={true}
          />
        </View>

        <View style={styles.subheader}>
          <Photo />
          <Text style={styles.subheadText}>Add Photo</Text>
        </View>

        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View></View>
        )}

        <View style={styles.imageButtons}>
          <Button
            onPress={() => {
              void handleTakePhoto();
            }}
            style={styles.imageButton}
            textStyle={styles.imageButtonText}
          >
            Take Photo
          </Button>
          <Button
            onPress={() => {
              void handleChoosePhoto();
            }}
            style={styles.imageButton}
            textStyle={styles.imageButtonText}
          >
            Gallery
          </Button>
        </View>

        <Button
          style={
            titleText !== "" && paragraphText !== ""
              ? styles.submitButton
              : styles.submitButtonDisabled
          }
          disabled={titleText === "" || paragraphText === ""}
          onPress={() => {
            void onSaveJournal();
          }}
        >
          Log Journal
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(217, 217, 217, 0.5)",
  },
  imageContainer: {
    width: 358,
    height: 358,
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  submitButton: {
    backgroundColor: "#2E563C",
    marginTop: 24,
    marginBottom: 47,
  },
  submitButtonDisabled: {
    backgroundColor: "#B4B4B4",
    marginTop: 24,
    marginBottom: 47,
  },
  imageButton: {
    width: "46%",
    height: 48,
    borderWidth: 2,
    borderColor: "#2E563C",
    backgroundColor: "#F2F0D3",
  },
  imageButtonText: {
    color: "#2E563C",
    fontFamily: "Social Gothic",
    fontSize: 16,
    fontWeight: 600,
  },
  enterTitle: {
    display: "flex",
    gap: 8,
    marginBottom: 20,
  },
  subheader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: 24,
    gap: 4,
    marginBottom: 12,
  },
  subheadText: {
    fontFamily: "Social Gothic",
    fontSize: 16,
    fontWeight: 600,
  },
  date: {
    color: "#2E563C",
    fontSize: 14,
    fontFamily: "Archivo",
    fontWeight: 600,
  },
  titleInputContainer: {
    position: "relative",
    width: "100%",
    height: 29,
  },
  titlePlaceholder: {
    fontFamily: "Social Gothic",
    fontSize: 24,
    fontWeight: 600,
    position: "absolute",
    left: 0,
    right: 10,
    color: lightModeColors.mutedFont,
  },
  titleInput: {
    width: 358,
    height: 29,
    fontFamily: "Social Gothic",
    fontSize: 24,
    fontWeight: 600,
    color: "#2E563C",
  },
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: lightModeColors.background,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 28,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginRight: 24,
    color: "#6C6C6C",
    textTransform: "uppercase",
    fontFamily: "SG-DemiBold",
  },
  inputContainer: {
    position: "relative",
    width: 358,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 284,
    textAlignVertical: "top",
    backgroundColor: "white",
    marginTop: 12,
    marginBottom: 32,
  },
  placeholder: {
    position: "absolute",
    left: 10,
    right: 10,
    fontFamily: "Figtree",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#888",
    marginLeft: 5,
    top: 15,
  },
  input: {
    fontSize: 16,
    fontFamily: "Figtree",
    color: "#000",
  },
});
