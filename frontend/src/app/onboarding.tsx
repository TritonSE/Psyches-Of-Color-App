import { Redirect } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Onboarding from "@/components/Onboarding/Onboarding";
import { useAuth } from "@/contexts/userContext";

export default function OnboardingPage() {
  const { loadingUser, firebaseUser } = useAuth();
  if (!loadingUser && !firebaseUser) {
    return <Redirect href="/login" />;
  }

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
