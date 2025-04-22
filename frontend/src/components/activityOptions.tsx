import { StyleSheet, View } from "react-native";

import ActivityButton from "./activityButton";

const ActivityOptions = () => {
  return (
    <View style={styles.imageContainer}>
      <ActivityButton color="green" status="completed" style={{ marginLeft: -99 }} />
      <ActivityButton color="red" status="completed" style={{ marginRight: -99 }} />
      <ActivityButton status="incomplete" style={{ marginLeft: -99 }} />
      <ActivityButton color="yellow" status="completed" style={{ marginRight: -99 }} />
    </View>
  );
};

// Styles for the ActivityOptions component
const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivityOptions;
