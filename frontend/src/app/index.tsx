import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Mascots from "@/assets/Poc_Mascots.svg";
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
import Button from "@/components/Button";
import { UserContext } from "@/contexts/userContext";
import { logout } from "@/lib/auth";

export default function Loading() {
  const { firebaseUser } = useContext(UserContext);

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

  if (!firebaseUser) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Mascots style={styles.logo} />
      <Text style={styles.title}>Psyches of Color</Text>
      <Text style={styles.text}>slogan/mindful tip goes here</Text>
      <Button onPress={() => void logout()}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 253,
    height: 116,
    marginBottom: 16,
  },
  text: {
    color: "#000000",
    fontFamily: "Archivo",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
    marginBottom: 16,
  },
  title: {
    color: "#000000",
    fontFamily: "Archivo",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
});
