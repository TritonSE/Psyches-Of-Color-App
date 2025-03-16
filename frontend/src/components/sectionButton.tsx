import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SectionButtonProps = {
  title: string;
  subtitle: string;
  onPress: (header: string) => void;
};

const SectionButton: React.FC<SectionButtonProps> = ({ title, subtitle, onPress }) => {
  // State to track whether the dropdown is visible or not
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sectionCard} onPress={toggleDropdown}>
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="menu-outline" size={24} color="black" style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Conditionally render dropdown options if the state is true */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={() => {
              onPress("Header 1");
            }}
          >
            <Text style={styles.dropdownItem}>Header 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress("Header 2");
            }}
          >
            <Text style={styles.dropdownItem}>Header 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress("Header 3");
            }}
          >
            <Text style={styles.dropdownItem}>Header 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 10,
  },
  sectionCard: {
    backgroundColor: "#FFC97E",
    paddingVertical: 19.5,
    paddingHorizontal: 26,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: "rgba(30, 30, 30, 1)",
    fontWeight: "700",
    lineHeight: 24,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "rgba(30, 30, 30, 1)",
    fontWeight: "400",
    lineHeight: 24,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    backgroundColor: "#FAFAFA",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default SectionButton;
