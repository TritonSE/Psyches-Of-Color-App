import { Modal, View, Text, StyleSheet } from "react-native";
import Button from "@/components/Button";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CheckinPopup({ visible, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>You're on Track!</Text>
          <Text style={styles.text}>
            You have already completed your check-in for this week. Check back in after a few days.
          </Text>

          <Button
            onPress={onClose}
            style={{ alignSelf: "center", width: undefined, paddingHorizontal: 30 }}
          >
            Okay
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 320,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    elevation: 6,
  },
  title: {
    color: "#000000",
    fontFamily: "Inter",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 4,
  },
  text: {
    color: "#000000",
    fontFamily: "Open Sans",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.5,
  },
});
