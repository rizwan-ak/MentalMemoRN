import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../config/Colors";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "../components/StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

export default function BottomNav() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => Actions.dashboard()}
      >
        <Entypo name="home" size={24} color={Colors.green} />
        <StyledText style={styles.greenColor}>Dashboard</StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => Actions.addRecording()}
      >
        <Ionicons name="ios-recording" size={24} color={Colors.gray} />
        <StyledText style={styles.grayColor}>Record</StyledText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => Actions.links()}>
        <MaterialCommunityIcons
          name="book-open-variant"
          size={24}
          color={Colors.gray}
        />
        <StyledText style={styles.grayColor}>Resources</StyledText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    position: "absolute",
    bottom: 0,
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  greenColor: {
    color: Colors.green,
  },
  grayColor: {
    color: Colors.gray,
  },
});
