import { Image, StyleSheet, Text, View } from "react-native";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "../../components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  characterCard: {
    width: 273,
    height: 392,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    width: 358,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#D35144",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  directions: {
    width: 226,
    height: 24,
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -2,
    textAlign: "center",
  },
});

export default function CharacterSelection() {
  return (
    <View style={styles.container}>
      <Text>Choose your character</Text>
      <View style={styles.characterCard}>
        <CharacterCard
          color="#FFC97E"
          character="Fire"
          characterIcon={require("@/assets/fire.png")}
        ></CharacterCard>
      </View>
      <Button
        onClick={() => {
          console.log("test");
        }}
        additionalStyle={styles.nextButton}
      >
        NEXT
      </Button>
    </View>
  );
}
