import { Audio } from "expo-av";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);

import { DataStore } from "@aws-amplify/datastore";
import { Recording as Record } from "../models";
import { Auth } from "aws-amplify";

import { Storage, Predictions } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import "./test";
//Time formating
export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

//Recording Settings
export const setAudioMode = async ({ allowsRecordingIOS }) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: allowsRecordingIOS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
  } catch (err) {
    console.log("setAudioMode: ", err);
  }
};

//saving recording into DATA Store
export const saveRecording = async (file) => {
  try {
    const response = await fetch(file);
    const blob = await response.blob();
    const arr = await new Response(blob).arrayBuffer();
    const id = await uuidv4();
    const { key } = await Storage.put(id, blob, {
      contentType: blob.type,
    });
    console.log("File saved");
    await DataStore.save(
      new Record({
        recordedBy: Auth.user.username,
        file: key,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      })
    );
    console.log("Data saved");
    // Transcribe audio to text
    // const textToInterpret = await Predictions.convert({
    //   transcription: {
    //     source: {
    //       bytes: blob,
    //     },
    //     language: "en-US",
    //   },
    // });
    // console.log(textToInterpret);
    // Interpret sentiment
    // const sentiment = await Predictions.interpret({
    //   text: {
    //     source: {
    //       text: "Hello, i am happy",
    //     },
    //     type: "ALL",
    //   },
    // });
    // console.log(
    //   "Sentiment: ",
    //   sentiment.textInterpretation.sentiment.predominant
    // );
  } catch (err) {
    console.log("saveRecording: ", err);
  }
};

export const getRecordings = async () => {
  return await DataStore.query(Record, (r) =>
    r.recordedBy("eq", Auth.user.username)
  );
};

// export const test = async () => {
//   const test = await Storage.get("76031aa8-3f40-4fad-b36d-18af8d3086cb.mp3");

//   const response = await fetch(test);
//   const blob = await response.blob();
//   console.log(JSON.stringify(blob));
//   const buffer = await new Response(blob).arrayBuffer();

//   console.log(JSON.stringify(buffer));
//   console.log("THERE");

//   const jk = await Predictions.convert({
//     transcription: {
//       source: {
//         bytes: buffer,
//       },
//       language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
//     },
//   })
//     .then(({ transcription: { fullText } }) => console.log({ fullText }))
//     .catch((err) => console.log({ err }));
//   console.log("THIS IS JK: ", jk);
// };

export const getRecording = async (file) => {
  return await Storage.get(file);
};

export const deleteRecording = async (data) => {
  await Storage.remove(data.file);
  console.log("deleted file");
  await DataStore.delete(Record, (r) => r.file("eq", data.file));
  console.log("deleted data");
};
