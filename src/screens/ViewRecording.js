import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import StyledText from "../components/StyledText";
import Header from "../components/Header";
import Sentiment from "../components/Sentiment";
import Colors from "../config/Colors";
import { Actions } from "react-native-router-flux";
import { Audio } from "expo-av";

import { millisToMinutesAndSeconds, deleteRecording } from "../utils/index.js";

export default function ViewRecording({ recording, data, sentiment }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [file, setFile] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState(0);

  React.useEffect(() => {
    async function loadRecording() {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({ uri: recording });
        await soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await soundObject.setProgressUpdateIntervalAsync(250);

        await setFile(soundObject);
      } catch (err) {
        console.log("useEffect: ", err);
      }
    }
    loadRecording();
  }, []);

  const playRecording = async () => {
    if (isPlaying) {
      console.log("playRecording IF: ");
      try {
        await file.pauseAsync();
        await setIsPlaying(false);
      } catch (err) {
        console.log("playRecording: ", err);
      }
    } else {
      console.log("playRecording ELSE: ");

      try {
        await file.replayAsync();
        setIsPlaying(true);
      } catch (err) {
        console.log("playRecording: ", err);
      }
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
      // await file.stopAsync();
    }

    if (status.progressUpdateIntervalMillis === 500) {
      setDuration(status.durationMillis);
    }

    if (status.isPlaying) {
      setPosition(status.positionMillis);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="View Recording" />
      <View style={styles.micContainer}>
        <Ionicons name="md-mic" size={150} color="black" />
      </View>
      <View style={styles.recordingInfo}>
        <TouchableOpacity onPress={() => playRecording()}>
          {isPlaying ? (
            <MaterialCommunityIcons name="pause-circle" size={32} color="red" />
          ) : (
            <MaterialCommunityIcons
              name="play-circle"
              size={32}
              color="black"
            />
          )}
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={0}
          value={position}
          maximumValue={duration}
          minimumTrackTintColor={Colors.green}
          maximumTrackTintColor="white"
          thumbTintColor={Colors.green}
        />
        <StyledText>{millisToMinutesAndSeconds(duration)}</StyledText>
      </View>
      {sentiment ? (
        <View>
          <View style={[styles.item]}>
            <StyledText style={styles.title}>20-02-2020</StyledText>
            <TouchableOpacity
              onPress={() => {
                deleteRecording(data);
                Actions.pop();
              }}
            >
              <MaterialIcons name="delete-forever" size={32} color="red" />
            </TouchableOpacity>
          </View>
          <StyledText style={{ padding: 20, fontWeight: "bold" }}>
            Recording Analysis
          </StyledText>
          <Sentiment />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  micContainer: {
    backgroundColor: Colors.lightgray,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingInfo: {
    backgroundColor: Colors.lightgray,
    paddingTop: 20,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flexGrow: 1,
  },
  item: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  title: {
    color: Colors.gray,
    fontSize: 18,
  },
});
