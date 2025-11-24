import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import { CharacterCarousel, characters } from "@/components/CharacterCarousel";
import ProgressBar from "@/components/Onboarding/ProgressBar";
import { useAuth } from "@/contexts/userContext";
import { updateUserCharacter } from "@/lib/auth";

export default function CharacterSelection() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { loadingUser, firebaseUser } = useAuth();
  if (!loadingUser && !firebaseUser) {
    return <Redirect href="/login" />;
  }

  const navigateToOnboarding = async () => {
    const choice = characters[selectedIndex].character;
    try {
      await updateUserCharacter(choice);
      router.push("/onboarding");
    } catch (e) {
      Alert.alert(`Error saving user character: ${String(e)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.onboardingText}>Onboarding</Text>
      <ProgressBar progress={0.1} />

      <Text style={styles.directions}>Choose your character</Text>
      <CharacterCarousel selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

      <Button
        onPress={() => {
          void navigateToOnboarding();
        }}
        style={styles.nextButton}
        textStyle={styles.buttonText}
      >
        NEXT
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    backgroundColor: "#F6F6EA",
    flexDirection: "column",
    marginTop: 50,
  },
  onboardingText: {
    fontFamily: "Social Gothic",
    fontWeight: 600,
    fontSize: 18,
    color: "#6C6C6C",
    marginBottom: -20,
  },
  nextButton: {
    width: 358,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#2E563C",
    paddingVertical: 10,
    paddingHorizontal: 24,
    fontFamily: "Social Gothic",
    fontStyle: "normal",
    marginBottom: 25,
    marginTop: 0,
  },
  buttonText: {
    fontFamily: "Social Gothic",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 16,
  },
  directions: {
    fontFamily: "Archivo",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: -20,
  },
  selected: {
    borderWidth: 1.5,
    borderColor: "#D35144",
  },
});
