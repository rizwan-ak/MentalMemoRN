import React from "react";
import { StyleSheet, View, Linking, TouchableOpacity } from "react-native";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "../components/StyledText";
import Header from "../components/Header";
import Colors from "../config/Colors";

export default function Links() {
  const openLink = async () => {
    await Linking.openURL("https://www.google.com/");
  };
  return (
    <View style={styles.container}>
      <Header title="Resources" />

      <TouchableOpacity onPress={async () => openLink()}>
        <View style={styles.linkContainer}>
          <Entypo style={styles.icon} name="graduation-cap" />
          <StyledText style={styles.link}>
            Learn more about how this app works
          </StyledText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={async () => openLink()}>
        <View style={styles.linkContainer}>
          <MaterialCommunityIcons style={styles.icon} name="compass" />
          <StyledText style={styles.link}>Read articles</StyledText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={async () => openLink()}>
        <View style={styles.linkContainer}>
          <MaterialCommunityIcons style={styles.icon} name="message-text" />
          <StyledText style={styles.link}>
            Ask a question on the forums
          </StyledText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightgray,
  },
  linkContainer: {
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    color: Colors.green,
    marginRight: 15,
  },
  link: {
    fontSize: 12,
  },
});
