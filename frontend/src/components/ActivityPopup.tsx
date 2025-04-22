import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { lightModeColors } from "@/constants/colors";

type ActivityPopupProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onStart?: () => void;
  color: "red" | "green" | "yellow";
  onClose: () => void;
};

/**
 * ActivityPopup component
 *
 * @param props.title - The title of the activity
 * @param props.description - The description of the activity
 * @param props.isOpen - Whether the popup is open or not
 * @param props.onStart - Function to call when the start button is clicked
 * @param props.color - The color of the start button
 * @param props.onClose - Function to call when the close button is clicked
 * @returns
 */
const ActivityPopup = ({
  title,
  description,
  onStart,
  color,
  isOpen,
  onClose,
}: ActivityPopupProps) => {
  return (
    <>
      {/* Backdrop adjacent makes the Modal's sliding animation slightly laggy, but putting backdrop inside the Modal makes it also slide up with the modal which is even more ugly */}
      {isOpen && <View style={styles.backdrop} />}
      <Modal visible={isOpen} transparent={true} animationType="slide" onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{description}</Text>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    color === "red"
                      ? lightModeColors.primaryRed
                      : color === "green"
                        ? lightModeColors.primaryGreen
                        : lightModeColors.primaryYellow,
                },
              ]}
              onPress={() => {
                onClose();

                if (onStart) {
                  onStart();
                }
              }}
            >
              <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1, // Ensure it appears behind the modal content
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    zIndex: 2, // Ensure modal content is above the backdrop
  },
  content: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 18,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Figtree",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 18,
    color: lightModeColors.secondaryLightFont,
    marginBottom: 20,
    fontFamily: "Figtree",
    fontWeight: 400,
  },
  button: {
    backgroundColor: lightModeColors.primaryGreen,
    paddingVertical: 15,
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "SG-DemiBold",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ActivityPopup;
