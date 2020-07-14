import React, { Component } from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

import SignupScreen from "../screens/Signup";
import LoginScreen from "../screens/Login";
import AddRecordingScreen from "../screens/AddRecording";
import ViewRecordingScreen from "../screens/ViewRecording";
import LinksScreen from "../screens/Links";
import DashboardScreen from "../screens/Dashboard";

export default function Routes(props) {
  return (
    <Router>
      <Stack hideNavBar key="root">
        {/* <Scene key="login" component={LoginScreen} /> */}
        {/* <Scene key="signup" component={SignupScreen} /> */}
        <Scene key="dashboard" component={DashboardScreen} />
        <Scene key="addRecording" component={AddRecordingScreen} />
        <Scene key="links" component={LinksScreen} title="Resources" />
        <Scene
          key="viewRecording"
          component={ViewRecordingScreen}
          recording={props.recording}
        />
      </Stack>
    </Router>
  );
}
