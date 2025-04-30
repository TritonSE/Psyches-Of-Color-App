import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ActivityPopup from "@/components/ActivityPopup";
import ActivityButton from "@/components/activityButton";
import SectionButton from "@/components/sectionButton";
import { lightModeColors } from "@/constants/colors";

export default function ActivitiesPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          color="green"
        />

        {/* Circle Images - Use the ActivityOptions component here */}
        <View style={styles.optionsContainer}>
          <ActivityButton color="green" status="completed" style={{ marginLeft: -99 }} />
          <ActivityButton color="green" status="completed" style={{ marginRight: -99 }} />
          <ActivityButton
            color="green"
            status="inProgress"
            style={{ marginLeft: -99 }}
            onPress={() => {
              setIsModalOpen(true);
            }}
          />
          <ActivityButton status="incomplete" style={{ marginRight: -99 }} />
          <ActivityButton status="incomplete" style={{ marginLeft: -99 }} />
        </View>

        <ActivityPopup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          color="green"
          title="Anxiety: Part I"
          description="Start this unit"
          onStart={() => {
            console.log("Starting activity...");
            setIsModalOpen(false);
            router.push("/activityPage");
          }}
        />

        {/* Jump to Next Section */}
        <Text style={styles.jumpText}>
          ••• ••• ••• ••• Jump to the next section ••• ••• ••• •••
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightModeColors.background,
    paddingVertical: 50,
  },
  optionsContainer: {
    marginTop: 40,
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    textTransform: "uppercase",
    fontFamily: "SG-DemiBold",
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
