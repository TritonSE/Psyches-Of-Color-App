import { Redirect, Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

import HomeIcon from "@/assets/home-icon.svg";
import ProfileIcon from "@/assets/profile-icon.svg";
import ResourcesIcon from "@/assets/resources-icon.svg";
import { useAuth } from "@/contexts/userContext";

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30, // this is in px since react native uses pixels instead of rem
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: 24,
    backgroundColor: "#000",
    borderRadius: 1,
  },
});

export default function TabLayout() {
  const { firebaseUser } = useAuth();

  if (!firebaseUser) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hides the tab labels
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <HomeIcon width={24} height={24} />
              {focused ? <View style={styles.underline} /> : null}
            </View>
          ),
        }}
      />

      {/* Resources Tab */}
      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <ResourcesIcon width={24} height={24} />
              {focused ? <View style={styles.underline} /> : null}
            </View>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <ProfileIcon width={24} height={24} />
              {focused ? <View style={styles.underline} /> : null}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
