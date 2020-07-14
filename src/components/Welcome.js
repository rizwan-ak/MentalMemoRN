import React from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import Colors from "../config/Colors";
import StyledText from "../components/StyledText";

import { Greetings } from "aws-amplify-react-native";

export default class Welcome extends Greetings {
  render() {
    return (
      <View style={styles.appInfo}>
        <Image style={styles.logo} source={require("../assets/favicon.png")} />
        <StyledText style={styles.appName}>Mental Memo</StyledText>
        <StyledText style={styles.title}>Welcome to our app</StyledText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appInfo: {
    backgroundColor: Colors.green,
    height: Dimensions.get("window").height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  appName: {
    fontSize: 40,
    color: "white",
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});
