import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { lightModeColors } from "@/constants/colors";
import { useAuth } from "@/contexts/userContext";

const AuthLayout = () => {
  const { firebaseUser } = useAuth();

  if (firebaseUser) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: lightModeColors.background }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="email-sent" />
        <Stack.Screen name="forgot-password" />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
