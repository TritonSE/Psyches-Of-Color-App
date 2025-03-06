import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionButton from "@/components/sectionButton"; // Import the SectionButton component

export default function ActivitiesScreen() {
  // Function to handle pressing a section button
  const handleSectionPress = (section: string) => {
    console.log(`Navigating to: ${section}`);
    // Implement navigation logic here if needed
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="gray" />
        <Text style={styles.headerTitle}>Activities</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Section 1 */}
        <SectionButton
          title="SECTION 1"
          subtitle="Understanding yourself"
          onPress={() => handleSectionPress("Section 1")}
        />

        {/* Images */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/yellowButton.png")}
            style={[styles.buttonImage, { marginLeft: -99 }]}
          />
          <Image
            source={require("@/assets/redButton.png")}
            style={[styles.buttonImage, { marginRight: -99 }]}
          />
          <Image
            source={require("@/assets/grayButton.png")}
            style={[styles.buttonImage, { marginLeft: -100 }]}
          />
          <Image
            source={require("@/assets/grayButton.png")}
            style={[styles.buttonImage, { marginRight: -99 }]}
          />
        </View>

        {/* Jump to Next Section */}
        <Text style={styles.jumpText}>
          ••• ••• ••• ••• Jump to the next section ••• ••• ••• •••
        </Text>

        {/* Section 2 */}
        <SectionButton
          title="SECTION 2"
          subtitle="Navigating Mental Health"
          onPress={() => handleSectionPress("Section 2")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 50,
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 40,
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginRight: 24,
    color: "#6C6C6C",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 32,
  },
  jumpText: {
    fontSize: 16,
    color: "#6C6C6C",
    marginVertical: 10,
    fontStyle: "normal",
    fontWeight: "400",
  },
  buttonImage: {
    width: 98,
    height: 98,
    marginVertical: 10,
  },
});
