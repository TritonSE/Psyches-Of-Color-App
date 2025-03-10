import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "../../components/Button";
import { useRef, useState } from "react";

const { width } = Dimensions.get("window");
const WIDTH = 273;
const SPACING = 16;
const CARD_TOTAL_WIDTH = WIDTH + SPACING * 2;
const CENTER_OFFSET = (width - CARD_TOTAL_WIDTH) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  characterCard: {
    width: WIDTH,
    height: 392,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING,
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
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / CARD_TOTAL_WIDTH);
    setSelectedIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Text>Choose your character</Text>
      <ScrollView
        horizontal={true}
        contentOffset={{ x: CARD_TOTAL_WIDTH * selectedIndex, y: 0 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={CARD_TOTAL_WIDTH}
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
        onMomentumScrollEnd={handleScrollEnd}
      >
        <View style={styles.characterCard}>
          <CharacterCard
            color="#83B26D"
            character="Nature"
            characterIcon={require("@/assets/nature.png")}
          ></CharacterCard>
        </View>
        <View style={styles.characterCard}>
          <CharacterCard
            color="#FFC97E"
            character="Fire"
            characterIcon={require("@/assets/fire.png")}
          ></CharacterCard>
        </View>
        <View style={styles.characterCard}>
          <CharacterCard
            color="#FCA397"
            character="Water"
            characterIcon={require("@/assets/water.png")}
          ></CharacterCard>
        </View>
      </ScrollView>
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
