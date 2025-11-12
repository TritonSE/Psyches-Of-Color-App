import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "./Button";

import Exit from "@/assets/exit.svg";
import Fire from "@/assets/fire.svg";

const ExitJournal = ({ onClose }: { onClose: () => void }) => {
  const handleExit = () => {
    onClose();
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <Exit style={styles.close} />
      </TouchableOpacity>

      <Fire />

      <Text style={styles.title}>Journal Will Not Save</Text>

      <Text style={styles.text}>If you exit now, your progress will not save.</Text>

      <View style={styles.buttons}>
        <Button style={styles.delete} textStyle={styles.deleteText} onPress={handleExit}>
          Exit anyway
        </Button>
        <Button style={styles.continue} textStyle={styles.continueText} onPress={onClose}>
          Keep writing
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "83%",
    borderRadius: 16,
    backgroundColor: "#FFF",
    margin: "auto",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  close: {
    marginLeft: "auto",
    marginBottom: 16,
  },
  closeText: {
    fontSize: 24,
    textAlign: "right",
  },
  title: {
    color: "#B93B3B",
    fontFamily: "Social Gothic",
    fontWeight: 600,
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    width: "80%",
    marginHorizontal: 24,
    fontWeight: 400,
    fontFamily: "Archivo",
    color: "#010101",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 32,
  },
  delete: {
    width: "48%",
    backgroundColor: "#F2F0D3",
    borderColor: "#2E563C",
    borderWidth: 2,
  },
  continue: {
    width: "48%",
    backgroundColor: "#2E563C",
    borderColor: "#2E563C",
    borderWidth: 2,
  },
  deleteText: {
    fontFamily: "Social Gothic",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    color: "#2E563C",
  },
  continueText: {
    fontFamily: "Social Gothic",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    color: "#FFF",
  },
});

export default ExitJournal;
