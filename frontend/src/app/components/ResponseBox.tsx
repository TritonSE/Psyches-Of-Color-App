import { StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  textBox: {
    alignItems: "center",
  },
  paragraph: {
    borderWidth: 2,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 358,
  },
});

export function ResponseBox(props: { additionalStyle?: ViewStyle | TextStyle }) {
  // Update the type of onClick prop
  const { additionalStyle } = props;

  return (
    <View style={styles.textBox}>
      <TextInput style={[styles.paragraph, additionalStyle]}>
        <Text>Type here</Text>
      </TextInput>
    </View>
  );
}
