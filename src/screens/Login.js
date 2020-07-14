import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import StyledText from "../components/StyledText";
import Colors from "../config/Colors";
import Welcome from "../components/Welcome";
import { Actions } from "react-native-router-flux";

export default function Login() {
  const [userName, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <Welcome />
        <View style={styles.form}>
          <StyledText>Username</StyledText>
          <TextInput
            style={styles.label}
            onChangeText={(text) => setUsername(text)}
            value={userName}
            placeholder="Enter Username"
          />

          <StyledText style={styles.myMargin}>Password</StyledText>
          <TextInput
            style={styles.label}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Enter Password"
          />
          <StyledText style={styles.fogotPassword}>Forgot Password?</StyledText>

          <TouchableOpacity
            onPress={() => Actions.dashboard()}
            style={[styles.signInButton, styles.myMargin]}
          >
            <StyledText style={styles.signInText}>Sign In</StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signUpButton, styles.myMargin]}
            onPress={() => Actions.signup()}
          >
            <StyledText style={styles.signUpText}>Sign Up</StyledText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    color: "gray",
    marginTop: 10,
  },
  myMargin: {
    marginTop: 20,
  },
  fogotPassword: {
    width: "100%",
    color: Colors.green,
    textAlign: "right",
  },
  signInButton: {
    backgroundColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    fontWeight: "bold",
    color: "#fff",
  },
  signUpText: {
    fontWeight: "bold",
    color: Colors.green,
  },
});
