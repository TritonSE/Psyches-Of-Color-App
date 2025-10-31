import { useState } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import GreenCompletedClicked from "@/assets/green-completed-clicked.png";
import GreenCompleted from "@/assets/green-completed.png";
import GreenInProgressClicked from "@/assets/green-in-progress-clicked.png";
import GreenInProgress from "@/assets/green-in-progress.png";
import Incomplete from "@/assets/incomplete.png";
import RedCompletedClicked from "@/assets/red-completed-clicked.png";
import RedCompleted from "@/assets/red-completed.png";
import RedInProgressClicked from "@/assets/red-in-progress-clicked.png";
import RedInProgress from "@/assets/red-in-progress.png";
import YellowCompletedClicked from "@/assets/yellow-completed-clicked.png";
import YellowCompleted from "@/assets/yellow-completed.png";
import YellowInProgressClicked from "@/assets/yellow-in-progress-clicked.png";
import YellowInProgress from "@/assets/yellow-in-progress.png";

// Function to decide which image to show based on the color, status, and clicked state
// Clicked state doesn't work for red and yellow buttons because don't have those images yet
const decideImage = (
  color: "red" | "green" | "yellow",
  status: "completed" | "incomplete" | "inProgress",
  clicked: boolean,
) => {
  const images = {
    red: {
      completed: clicked ? RedCompletedClicked : RedCompleted,
      incomplete: Incomplete,
      inProgress: clicked ? RedInProgressClicked : RedInProgress,
    },
    green: {
      completed: clicked ? GreenCompletedClicked : GreenCompleted,
      incomplete: Incomplete,
      inProgress: clicked ? GreenInProgressClicked : GreenInProgress,
    },
    yellow: {
      completed: clicked ? YellowCompletedClicked : YellowCompleted,
      incomplete: Incomplete,
      inProgress: clicked ? YellowInProgressClicked : YellowInProgress,
    },
  };

  return images[color][status];
};

type ActivityButtonBaseProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

type ActivityButtonIncompleteProps = {
  status: "incomplete";
  color?: never;
};

type ActivityButtonNormalProps = {
  status: "completed" | "inProgress";
  color: "red" | "green" | "yellow";
};

type ActivityButtonProps = ActivityButtonBaseProps &
  (ActivityButtonIncompleteProps | ActivityButtonNormalProps);

const ActivityButton = ({ color = "red", status, onPress, style }: ActivityButtonProps) => {
  const [clicked, setClicked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, style]}
      onPressIn={() => {
        setClicked(true);
      }}
      onPressOut={() => {
        setClicked(false);
      }}
      onPress={onPress}
    >
      <Image source={decideImage(color, status, clicked)} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 98,
    height: 98,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ActivityButton;
