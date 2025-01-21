import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the header on all tabs
        tabBarActiveTintColor: "blue", // Active tab icon color
        tabBarStyle: {
          paddingBottom: Platform.OS === "ios" ? 20 : 10, // Adjusts padding based on platform
          backgroundColor: "#fff", // Tab bar background color
          // borderRadius: 30,
          borderTopLeftRadius: 30, // this is in px since react native uses pixels instead of rem
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 14, // Label font size
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}
      />

      {/* Resources Tab */}

      {/* Profile Tab */}

      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
