import { createStackNavigator } from "@react-navigation/stack"; // Import Stack Navigator
import React from "react";
import { Button, Text, View } from "react-native";

import LoginScreen from "./pages/LoginScreen"; // Import LoginScreen

// Create a stack navigator
const Stack = createStackNavigator();

// Home screen component
const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
