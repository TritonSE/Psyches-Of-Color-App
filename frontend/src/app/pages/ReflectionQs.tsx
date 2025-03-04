import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Button } from "../components/Button";
import { ResponseBox } from "../components/ResponseBox";

// const styles = StyleSheet.create({
//   paragraph: {
//     justifyContent: "center",
//   },
// });

export default function ReflectionQs() {
  return (
    <SafeAreaView>
      <View>
        <Text>Time to Reflect</Text>
        <View>
          <Text>HI</Text>
        </View>
        <View>
          <Text>HI</Text>
        </View>
        <ResponseBox></ResponseBox>
      </View>
      <Button onClick={(): void => {}}>Continue</Button>
    </SafeAreaView>
  );
}
