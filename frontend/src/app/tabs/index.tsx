import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="heart"
        options={{
          title: "Heart",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="heart"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
