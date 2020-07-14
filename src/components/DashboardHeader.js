import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import StyledText from "../components/StyledText";
import Colors from "../config/Colors";

import { Auth } from "aws-amplify";

export default function DashboardHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <StyledText style={styles.headerItem}>Dashboard</StyledText>
      </View>
      <TouchableOpacity
        style={[styles.title, styles.logo]}
        onPress={() => Auth.signOut()}
      >
        <Entypo style={[styles.headerItem]} name="log-out" />
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
    right: 12,
    top: 15,
  },
});
