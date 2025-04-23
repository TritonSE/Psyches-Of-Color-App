// 

import { StyleSheet, SafeAreaView, View, Text, Image, Button } from "react-native";
import wateringCan from "@/assets/wateringcan.png"; // Update with your correct path

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  titleSection: {
    backgroundColor: "green",
    padding: 16,
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0,
    textAlign: "center",
  },
  textBox: {
    backgroundColor: "#FFC97E80",
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
  },
  subtitle: {
    color: "#6C6C6C",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19.2,
  },
  textReg: {
    color: "#1D1B20",
    textAlign: "center",
    fontFamily: "Figtree",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 27,
    letterSpacing: 0.15,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  }
});

export default function InternetError() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Hey Michael!</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
        {/* You can add a button below if needed */}
        {/* <Button title="Retry" onPress={() => {}} /> */}
      </View>

      <View style={styles.textBox}>
        <Text style={styles.textReg}>
          "Just like the seasons change, so do my feelings. This moment is temporary, and I will feel light again."
        </Text>
        <Image source={wateringCan} style={styles.image} />
      </View>
    </SafeAreaView>
  );
}
