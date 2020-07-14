import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";

import StyledText from "../components/StyledText";
import Colors from "../config/Colors";

import { AntDesign } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

import { getRecordings, getRecording } from "../utils";

function Item({ date, time, file, item }) {
  const [recording, setRecording] = React.useState("");
  React.useEffect(() => {
    async function callIt() {
      const recording = await getRecording(file);
      setRecording(recording);
    }
    callIt();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        Actions.viewRecording({
          recording: recording,
          data: item,
          sentiment: true,
        })
      }
      style={[styles.container]}
    >
      <View style={[styles.item]}>
        <StyledText style={styles.title}>
          {date}, {time}
        </StyledText>
        <AntDesign style={styles.title} name="arrowright" />
      </View>
    </TouchableOpacity>
  );
}

export default function RecordingsList() {
  const [recordings, setRecordings] = React.useState("");
  React.useEffect(() => {
    async function callIt() {
      const recordings = await getRecordings();
      setRecordings(recordings);
    }
    callIt();
  }, []);

  return (
    <FlatList
      data={recordings}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          date={item.date}
          time={item.time}
          file={item.file}
          item={item}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: Colors.gray,
    fontSize: 18,
  },
});
