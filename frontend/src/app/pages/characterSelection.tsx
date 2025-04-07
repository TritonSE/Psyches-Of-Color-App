import { ScrollView, StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "../../components/Button";
import { useRef, useState } from "react";
import ProgressBar from "@/components/Onboarding/ProgressBar";

const { width } = Dimensions.get("window");
const WIDTH = 273;
const SPACING = 2;
const CARD_TOTAL_WIDTH = WIDTH + SPACING * 2;
const CENTER_OFFSET = (width - CARD_TOTAL_WIDTH) / 2;

const characters = [
  {
    color: "#83B26D",
    character: "Nature",
    characterIcon: require("@/assets/nature.png"),
  },
  {
    color: "#FFC97E",
    character: "Fire",
    characterIcon: require("@/assets/fire.png"),
  },
  {
    color: "#FCA397",
    character: "Water",
    characterIcon: require("@/assets/water.png"),
  },
];

const infiniteCharacters = [...characters, ...characters, ...characters];

export default function CharacterSelection() {
  const initialScrollPosition = CARD_TOTAL_WIDTH * (characters.length + 1);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const scrollX = useRef(new Animated.Value(initialScrollPosition)).current;
  const scrollViewRef = useRef(null);
  const [charactersState, setCharactersState] = useState(infiniteCharacters);

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / CARD_TOTAL_WIDTH);
    const actualIndex = newIndex % characters.length;

    setSelectedIndex(actualIndex);

    if (offsetX === 0) {
      setCharactersState((prevState) => [...characters, ...prevState]);

      scrollViewRef.current.scrollTo({
        x: CARD_TOTAL_WIDTH * characters.length,
        animated: false,
      });
    }

    if (offsetX === CARD_TOTAL_WIDTH * (charactersState.length - 1)) {
      setCharactersState((prevState) => [...prevState, ...characters]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <ProgressBar progress={0.1} />
      <Text style={styles.directions}>Choose your character</Text>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: initialScrollPosition, y: 0 }}
        pagingEnabled={true}
        snapToInterval={CARD_TOTAL_WIDTH}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        {charactersState.map((item, index) => {
          const inputRange = [
            (index - 1) * CARD_TOTAL_WIDTH,
            index * CARD_TOTAL_WIDTH,
            (index + 1) * CARD_TOTAL_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.88832, 1, 0.88832],
            extrapolate: "clamp",
          });

          const isSelected = index % characters.length === selectedIndex;

          return (
            <View key={index} style={{ width: CARD_TOTAL_WIDTH, alignItems: "center" }}>
              <Animated.View style={[styles.characterCard, { transform: [{ scale }] }]}>
                <CharacterCard
                  color={item.color}
                  character={item.character}
                  characterIcon={item.characterIcon}
                  selected={isSelected}
                />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "#F6F6EA",
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
    backgroundColor: "#2E563C",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  directions: {
    width: 226,
    height: 24,
    fontFamily: "Social-Gothic",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -2,
    textAlign: "center",
  },
  selected: {
    borderWidth: 1,
    borderColor: "#D35144",
  },
});
