import React from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { StyleSheet, View } from "react-native";

import Colors from "./src/config/Colors";
import Routes from "./src/config/Routes";

import { withAuthenticator } from "aws-amplify-react-native";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

import { MyTheme } from "./src/components/MyTheme";
import MyGreetings from "./src/components/Welcome";

function App() {
  // console.log(Auth.user.username);

  const [loaded] = Font.useFonts({
    SpaceMonoRegular: require("./src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <Routes />
    </View>
  );
}
// const authComponents = [<Routes />, <LoginScreen />];

export default withAuthenticator(App, false, [], null, MyTheme);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    backgroundColor: Colors.green,
    height: StatusBar.currentHeight,
  },
});
