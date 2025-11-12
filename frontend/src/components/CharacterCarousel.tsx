import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import fire from "@/assets/fire.png";
import nature from "@/assets/nature.png";
import water from "@/assets/water.png";
import { CharacterCard } from "@/components/CharacterCard";

const { width } = Dimensions.get("window");
const WIDTH = 273;
const SPACING = 2;
const CARD_TOTAL_WIDTH = WIDTH + SPACING * 2;
const CENTER_OFFSET = (width - CARD_TOTAL_WIDTH) / 2;

export type Character = {
  color: string;
  character: string;
  characterIcon: ImageSourcePropType;
};

export const characters: Character[] = [
  {
    color: "#83B26D",
    character: "Nature",
    characterIcon: nature,
  },
  {
    color: "#FFC97E",
    character: "Fire",
    characterIcon: fire,
  },
  {
    color: "#FCA397",
    character: "Water",
    characterIcon: water,
  },
];

const infiniteCharacters = [...characters, ...characters, ...characters];

export const CharacterCarousel = ({
  initialCharacterIndex,
  selectedIndex,
  setSelectedIndex,
}: {
  initialCharacterIndex?: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => unknown;
}) => {
  const initialScrollPosition =
    CARD_TOTAL_WIDTH *
    (initialCharacterIndex === undefined ? characters.length + 1 : initialCharacterIndex + 3);
  const [charactersState, setCharactersState] = useState(infiniteCharacters);

  const scrollX = useRef(new Animated.Value(initialScrollPosition)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / CARD_TOTAL_WIDTH);
    const actualIndex = newIndex % characters.length;

    setSelectedIndex(actualIndex);

    if (offsetX > CARD_TOTAL_WIDTH * (charactersState.length - 4)) {
      setCharactersState((prevState) => [...characters, ...prevState]);
    }

    if (offsetX < CARD_TOTAL_WIDTH * 3) {
      setCharactersState((prevState) => [...prevState, ...characters]);

      if (offsetX === 0 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: CARD_TOTAL_WIDTH * characters.length,
          animated: false,
        });
      }
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    if (offsetX > CARD_TOTAL_WIDTH * (charactersState.length - 4)) {
      setCharactersState((prevState) => [...prevState, ...characters]);
    }

    if (offsetX < CARD_TOTAL_WIDTH * 3) {
      setCharactersState((prevState) => [...characters, ...prevState]);
    }
  };

  return (
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
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
        listener: handleScroll,
      })}
      onMomentumScrollEnd={handleScrollEnd}
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
  );
};

const styles = StyleSheet.create({
  characterCard: {
    width: WIDTH,
    height: 392,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING,
  },
});
