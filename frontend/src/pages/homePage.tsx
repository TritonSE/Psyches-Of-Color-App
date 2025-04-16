import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
// import reddue from @/asset;
import { Button } from 

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  titleSection: {
    backgroundColor: "green",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 28,
    lineHeight: 120,
    letterSpacing: 0,
    textAlign: "center",
    verticalAlign: "middle",
  },
  textBox: {
    backgroundColor: "orange",
  },
});

export default function InternetError() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.titleSection}>
        <Text style={styles.title}></Text>
        {/* <Button style={styles.button}></Button> */}
      </View>
      <View style={styles.textBox}>{/* <Image source = {redDude} style ={styles.image} */}</View>
    </SafeAreaView>
  );
}
