import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
// import reddue from @/asset;
//import { Button } from 

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
    backgroundColor: "#FFC97E80",
  },
  subtitle: {
    color: "#6C6C6C", 
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 19.2, 
  },
  textReg: {
    color: "#1D1B20",
    textAlign: "center",
    fontFamily: "Figtree",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 27, 
    letterSpacing: 0.15,
  }
});

export default function InternetError() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.titleSection}>
        <Text style={styles.title}> Hey Michael!</Text>
        <Text style={styles.subtitle}> Welcome Back </Text>
        {/* <Button style={styles.button}></Button> */}
      </View>
      <View style={styles.textBox}>
        <Text style={styles.textReg}> "Just like the seasons change, so do my feelings. This moment is temporary, and I will feel light again."</Text>
        {/* <Image source={wateringcan.png}></Image> */}
      </View>
      <View style={styles.textBox}>{/* <Image source = {redDude} style ={styles.image} */}</View>
    </SafeAreaView>
  );
}
