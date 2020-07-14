import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";

export default class Sentiment extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["red", "yellow", "green"]}
          style={styles.gradient}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>☹️</Text>
            <Text style={styles.emoji}>😐</Text>
            <Text style={styles.emoji}>🙂</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  gradient: {
    height: 10,
    borderRadius: 5,
  },
  emojiContainer: {
    marginVertical: -18,
    marginHorizontal: -10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emoji: {
    fontSize: 32,
  },
});
