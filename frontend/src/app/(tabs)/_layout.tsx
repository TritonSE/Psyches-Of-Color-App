import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

import HomeIcon from "../../assets/home-icon.svg";
import ResourcesIcon from "../../assets/resources-icon.svg";
import SimpleIcon from "../../assets/simple-icon.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the header on all tabs
        // tabBarActiveTintColor: "none", // Active tab icon color
        // tabBarActiveBackgroundColor
        tabBarShowLabel: false, // Hides the tab labels
        tabBarStyle: {
          paddingBottom: Platform.OS === "ios" ? 20 : 10, // Adjusts padding based on platform
          backgroundColor: "#fff",
          // borderRadius: 30,
          borderTopLeftRadius: 30, // this is in px since react native uses pixels instead of rem
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute",
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
          tabBarIcon: () => <HomeIcon fill={"black"} height={24} width={24} />,
        }}
      />

      {/* Resources Tab */}

      {/* Profile Tab */}

      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          // tabBarIcon: ({ color }) => <FontAwesome size={24} name="book" color={color} />,
          tabBarIcon: () => <ResourcesIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          // tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
          tabBarIcon: () => <SimpleIcon />,
        }}
      />
    </Tabs>
  );
}
