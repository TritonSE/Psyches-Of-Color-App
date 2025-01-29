import { Tabs } from "expo-router";
import { StyleSheet, View, Platform } from "react-native";

import HomeIcon from "../../assets/home-icon.svg";
import ProfileIcon from "../../assets/profile-icon.svg";
import ResourcesIcon from "../../assets/resources-icon.svg";

export default function TabLayout() {
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
              {focused && <View style={styles.underline} />}
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
              {focused && <View style={styles.underline} />}
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
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

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
