// import InternetError from "@/pages/internetError";
import MoodCheckinPopup from "@/pages/checkInPopup";
import { View } from "react-native";

export default function HomeScreen({ user }) {
  return (
    <View style={{ flex: 1 }}>
      <MoodCheckinPopup userId="demo-user" />
    </View>
  );
}
