import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import BottomNav from "../components/BottomNav";
import RecordingsList from "../components/RecordingsList";
import DashboardHeader from "../components/DashboardHeader";
import Sentiment from "../components/Sentiment";

import StyledText from "../components/StyledText";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <DashboardHeader />
      <View>
        <Sentiment />
        <StyledText style={{ alignSelf: "center" }}>Feeling Sad...</StyledText>
      </View>
      <View style={{ marginBottom: 70 }}>
        <RecordingsList />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
