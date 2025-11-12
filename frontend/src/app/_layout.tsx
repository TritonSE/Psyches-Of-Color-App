import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import ArchivoItalic from "@/assets/fonts/Archivo-Italic.ttf";
import Archivo from "@/assets/fonts/Archivo.ttf";
import FigtreeItalic from "@/assets/fonts/Figtree-Italic.ttf";
import Figtree from "@/assets/fonts/Figtree.ttf";
import SGBold from "@/assets/fonts/Social-Gothic-Bold.otf";
import SGDemiBold from "@/assets/fonts/Social-Gothic-DemiBold.otf";
import SGMedium from "@/assets/fonts/Social-Gothic-Medium.otf";
import SGRegular from "@/assets/fonts/Social-Gothic-Regular.otf";
import SGRough from "@/assets/fonts/Social-Gothic-Rough.otf";
import SGSoft from "@/assets/fonts/Social-Gothic-Soft.otf";
import SGStencil from "@/assets/fonts/Social-Gothic-Stencil.otf";
import { UserContextProvider } from "@/contexts/userContext";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    // Social Gothic fonts are static, so can't change the font weight with styles
    "SG-Bold": SGBold,
    "SG-DemiBold": SGDemiBold,
    "SG-Medium": SGMedium,
    "SG-Regular": SGRegular,
    "SG-Rough": SGRough,
    "SG-Soft": SGSoft,
    "SG-Stencil": SGStencil,

    // Figtree and Archivo are variable weight, so the font weight can be changed with styles
    "Figtree-Italic": FigtreeItalic,
    Figtree,

    "Archivo-Italic": ArchivoItalic,
    Archivo,
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="characterSelection" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="changePassword" />
      </Stack>
    </UserContextProvider>
  );
};

export default RootLayout;
