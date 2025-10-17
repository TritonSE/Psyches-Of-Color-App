import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Mascots from "@/assets/Poc_Mascots.svg";
import Button from "@/components/Button";
import { logout } from "@/lib/auth";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "green",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "#ffffff",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });

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
    fontFamily: "Open Sans",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25.5,
    marginBottom: 16,
  },
  title: {
    color: "#000000",
    fontFamily: "Inter",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 38.4,
    letterSpacing: -0.64,
    marginBottom: 16,
  },
});

export default function Resources() {
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.text}>Resources</Text>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <Mascots style={styles.logo} />
      <Text style={styles.title}>Psyches of Color</Text>
      <Text style={styles.text}>slogan/mindful tip goes here</Text>
      <Button
        onPress={() => {
          void logout();
          // return <Redirect href="/login" />;
          router.replace("/login");
        }}
      >
        Logout
      </Button>
    </View>
  );
}
