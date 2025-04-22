import { StatusBar, StyleSheet, View } from "react-native";

import ActivitiesPage from "../../pages/activityPage";

import { lightModeColors } from "@/constants/colors";

export default function Home() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: lightModeColors.background,
    },
    text: {
      color: lightModeColors.darkFont,
    },
  });

  return (
    <View style={styles.container}>
      <ActivitiesPage />
      <StatusBar />
    </View>
  );
}
