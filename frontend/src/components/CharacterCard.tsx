import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 273,
    height: 376,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 24,
    textAlign: "center",
  },
  characterDescription: {
    width: 230,
    height: 60,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 14.52,
    textAlign: "center",
  },
  characterIcon: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  baseImage: {
    width: 186,
    height: 172,
  },
  overlayImage: {
    width: 180,
    height: 180,
    position: "absolute",
  },
});

export function CharacterCard(props: { color: string; character: string; characterIcon: any }) {
  const { color, character, characterIcon } = props;
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <View style={styles.characterIcon}>
          <Image source={require("@/assets/Vector.png")} style={styles.baseImage} />
          <Image source={characterIcon} style={styles.overlayImage} />
        </View>
        <Text style={styles.characterName}>{character}</Text>
        <Text style={styles.characterDescription}>
          “Hi! I’m Fire. I represent the power of transformation, motivation, and finding passion
          for growth and learning. Let’s find your spark together!”
        </Text>
      </View>
    </View>
  );
}
