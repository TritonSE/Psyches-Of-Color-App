import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import ActivityPageScreens from "@/pages/activityPageScreens";

export default function ActivityPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ActivityPageScreens />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
