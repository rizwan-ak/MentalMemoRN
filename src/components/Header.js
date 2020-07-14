import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import StyledText from "../components/StyledText";
import Colors from "../config/Colors";
import { Actions } from "react-native-router-flux";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <StyledText style={styles.headerItem}>{title}</StyledText>
      </View>
      <TouchableOpacity
        style={[styles.title, styles.logo]}
        onPress={() => Actions.pop()}
      >
        <AntDesign style={[styles.headerItem]} name="arrowleft" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.green,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerItem: {
    color: "#fff",
    fontSize: 25,
  },
  logo: {
    position: "absolute",
    left: 12,
    top: 15,
  },
});
