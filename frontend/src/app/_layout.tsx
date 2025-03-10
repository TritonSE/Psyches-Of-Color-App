import { Stack } from "expo-router";

import { UserContextProvider } from "@/contexts/userContext";

const RootLayout = () => {
  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </UserContextProvider>
  );
};

export default RootLayout;
