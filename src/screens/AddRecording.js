import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import StyledText from "../components/StyledText";
import Header from "../components/Header";
import Colors from "../config/Colors";

import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { Actions } from "react-native-router-flux";

import {
  millisToMinutesAndSeconds,
  setAudioMode,
  saveRecording,
  test,
} from "../utils/index.js";

export default function AddRecording() {
  const [
    haveRecordingPermissions,
    setHaveRecordingPermissions,
  ] = React.useState(false);
  const [recording, setRecording] = React.useState("");
  const [file, setFile] = React.useState("");
  const [isRecordig, setIsRecording] = React.useState(false);
  const [duration, setDuration] = React.useState("00:00");
  const [showButtons, setShowButtons] = React.useState(false);

  React.useEffect(() => {
    async function askForPermissions() {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      try {
        await setHaveRecordingPermissions(response.status === "granted");
      } catch (err) {
        console.log("useEffect: ", err);
      }
    }
    askForPermissions();
  }, []);

  const startRecording = async () => {
    console.log("Reached startRecording");

    const recording = new Audio.Recording();

    try {
      await setAudioMode({ allowsRecordingIOS: true });

      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
      await recording.startAsync();

      await setRecording(recording);

      await setIsRecording(true);
    } catch (err) {
      console.log("startRecording: ", err);
    }
    console.log("End startRecording");
  };

  const endRecording = async () => {
    console.log("Reached endRecording");

    try {
      await recording.stopAndUnloadAsync();
      await setAudioMode({ allowsRecordingIOS: false });
      await setIsRecording(false);
    } catch (err) {
      console.log("endRecording: ", err);
    }

    console.log(recording.getURI());
    setFile(recording.getURI());
  };

  const onRecordingStatusUpdate = (status) => {
    setDuration(status.durationMillis);
  };

  const clearRecording = async () => {
    // test();
    setDuration("00:00");
    setIsRecording(false);
    setRecording("");
    setFile("");
    setShowButtons(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Record" />
      <View style={styles.micContainer}>
        <Ionicons name="md-mic" size={150} color="black" />
        <StyledText>{millisToMinutesAndSeconds(duration)}</StyledText>
      </View>
      <View style={styles.icons}>
        {!isRecordig ? (
          <TouchableOpacity
            onPress={() => {
              startRecording();
              setShowButtons(false);
            }}
          >
            <MaterialCommunityIcons
              name="pause-circle"
              size={50}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              endRecording();
              setShowButtons(true);
            }}
          >
            <MaterialCommunityIcons name="stop-circle" size={50} color="red" />
          </TouchableOpacity>
        )}
      </View>
      {showButtons ? (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => Actions.viewRecording({ recording: file })}
            style={[styles.previewButton, styles.myMargin]}
          >
            <StyledText style={styles.previewText}>Preview</StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.addRecordingButton, styles.myMargin]}
            onPress={async () => {
              await saveRecording(file);
              Actions.pop();
            }}
          >
            <StyledText style={styles.addRecordingText}>
              Add Recording
            </StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.clearRecordingButton, styles.myMargin]}
            onPress={() => clearRecording()}
          >
            <StyledText style={styles.clearRecordingText}>
              Clear Recording
            </StyledText>
          </TouchableOpacity>
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
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttons: {
    padding: 20,
    flex: 1,
    justifyContent: "space-around",
  },
  addRecordingButton: {
    backgroundColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  previewButton: {
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  clearRecordingButton: {
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addRecordingText: {
    fontWeight: "bold",
    color: "#fff",
  },
  previewText: {
    fontWeight: "bold",
    color: Colors.green,
  },
  clearRecordingText: {
    fontWeight: "bold",
    color: Colors.red,
  },
});
