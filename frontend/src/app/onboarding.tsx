import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Onboarding from "@/components/Onboarding/Onboarding";

export default function OnboardingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Onboarding />
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
