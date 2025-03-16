
import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ActivityOptions from "@/components/activityOptions"; // Import ActivityOptions component
import SectionButton from "@/components/sectionButton"; // Import the SectionButton component

export default function ActivitiesScreen() {
  // State to manage the visibility of dropdowns for each section
  // const [activeSection, setActiveSection] = useState<string | null>(null);

  // Function to handle section button press and toggle dropdown
  const handleSectionPress = (header: string) => {
    // You can add any logic here when a header is pressed
    console.log(header); // For now, just log the header name
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
          onPress={handleSectionPress}
        />

        {/* Circle Images - Use the ActivityOptions component here */}
        <ActivityOptions />

        {/* Jump to Next Section */}
        <Text style={styles.jumpText}>
          ••• ••• ••• ••• Jump to the next section ••• ••• ••• •••
        </Text>

        {/* Section 2 */}
        <SectionButton
          title="SECTION 2"
          subtitle="Navigating Mental Health"
          onPress={handleSectionPress}
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
});
