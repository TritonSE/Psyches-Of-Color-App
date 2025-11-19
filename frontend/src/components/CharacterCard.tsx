import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import vector from "@/assets/Vector.png";

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
    fontWeight: 600,
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "Social Gothic",
    fontStyle: "normal",
  },
  characterDescription: {
    width: 230,
    height: 60,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 14.52,
    textAlign: "center",
    fontFamily: "Archivo",
    fontStyle: "normal",
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
  selected: {
    borderWidth: 1,
    borderColor: "#D35144",
  },
});

export function CharacterCard(props: {
  color: string;
  character: string;
  characterIcon: ImageSourcePropType;
  selected: boolean;
}) {
  const { color, character, characterIcon, selected } = props;
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: color }, selected && styles.selected]}>
        <View style={styles.characterIcon}>
          <Image source={vector} style={styles.baseImage} />
          <Image source={characterIcon} style={styles.overlayImage} />
        </View>
        <Text style={styles.characterName}>{character}</Text>
        <Text style={styles.characterDescription}>
          “Hi! I&apos;m {character}. I represent the power of transformation, motivation, and
          finding passion for growth and learning. Let&apos;s find your spark together!”
        </Text>
      </View>
    </View>
  );
}
