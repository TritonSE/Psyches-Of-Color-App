import { ScrollView, StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import { CharacterCard } from "@/components/CharacterCard";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import ProgressBar from "@/components/Onboarding/ProgressBar";
import Archivo from "@/assets/fonts/Archivo.ttf";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
  const [loading, setLoading] = useState(false);

  const handleScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    if (offsetX > CARD_TOTAL_WIDTH * (charactersState.length - 4)) {
      setCharactersState((prevState) => [...prevState, ...characters]);
    }

    if (offsetX < CARD_TOTAL_WIDTH * 3) {
      setCharactersState((prevState) => [...characters, ...prevState]);
    }
  };

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / CARD_TOTAL_WIDTH);
    const actualIndex = newIndex % characters.length;

    setSelectedIndex(actualIndex);

    if (offsetX > CARD_TOTAL_WIDTH * (charactersState.length - 4)) {
      setCharactersState((prevState) => [...characters, ...prevState]);
    }

    if (offsetX < CARD_TOTAL_WIDTH * 3) {
      setCharactersState((prevState) => [...prevState, ...characters]);

      if (offsetX === 0) {
        scrollViewRef.current.scrollTo({
          x: CARD_TOTAL_WIDTH * characters.length,
          animated: false,
        });
      }
    }
  };

  // const handleSubmit = async () => {
  //   if (loading) {
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     console.log(`Attempting to connect to: http://localhost:3000/api/whoami`);

  //     const currentUser = auth().currentUser;

  //     if (!currentUser) {
  //       console.log("User is not currently signed in");
  //       setLoading(false);
  //       return;
  //     }

  //     const idToken = await currentUser.getIdToken();

  //     // Retrieves uid of logged in user
  //     const userResponse = await fetch(`http://localhost:3000/api/whoami`, {
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!userResponse.ok) {
  //       throw new Error(`Error: ${userResponse.status}`);
  //     }

  //     const userData = await userResponse.json();
  //     const uid = userData.user.uid;

  //     console.log(`User uid: ${uid}`);

  //     try {
  //       const updateUserResponse = await fetch(`http://localhost:3000/users/${uid}`, {
  //         method: "PUT",
  //         headers: {
  //           Authorization: "Bearer ${idToken}",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           character: charactersState[selectedIndex].character,
  //         }),
  //       });

  //       if (!updateUserResponse.ok) {
  //         throw new Error(`Error: ${updateUserResponse.status}`);
  //       }

  //       const result = await updateUserResponse.json();
  //       console.log("User updated successfully: ", result);
  //     } catch (error) {
  //       console.error("Failed to update user", error);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch user: ", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.onboardingText}>Onboarding</Text>
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
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
          listener: handleScroll, // Add this listener
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

      <Button
        onPress={() => {
          console.log(charactersState[selectedIndex].character);
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
  characterCard: {
    width: WIDTH,
    height: 392,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING,
    marginBottom: -50,
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
