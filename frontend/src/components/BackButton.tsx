import Back from "@/assets/back.svg";
import Button from "./Button";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

type BackButtonProps = {
  path: string;
};

export default function BackButton({ path }: BackButtonProps) {
  return (
    <Button
      onPress={() => {
        router.navigate(path);
      }}
      style={styles.button}
    >
      <Back />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 37,
    height: 20,
    backgroundColor: "transparent",
    flex: 1,
    alignSelf: "flex-start",
    marginLeft: 16,
  },
});
