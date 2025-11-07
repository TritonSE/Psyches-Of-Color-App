import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import ActivitiesPage from "../pages/activityPage";

export default function Activities() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ActivitiesPage />
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
