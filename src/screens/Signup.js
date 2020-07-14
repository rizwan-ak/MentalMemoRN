import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import StyledText from "../components/StyledText";
import Colors from "../config/Colors";
import Welcome from "../components/Welcome";
import { Actions } from "react-native-router-flux";

// import { Auth } from "aws-amplify";

export default function Login() {
  const [userName, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const signupFn = async () => {
    console.log(userName);

    // try {
    //   await Auth.signUp({
    //     username:
    //     console.log("Error while signing up!", err);
    //   });
    // } catch (err) {
    //   console.log("Error while signing up!", err);
    // }
  };
  return (
    <ScrollView>
      <View behavior="position" style={styles.container}>
        <Welcome />
        <View style={styles.form}>
          <StyledText>Username</StyledText>
          <TextInput
            style={styles.label}
            onChangeText={(text) => setUsername(text)}
            value={userName}
            placeholder="Enter Username"
          />

          <StyledText style={styles.myMargin}>Email</StyledText>
          <TextInput
            style={styles.label}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter Email"
          />

          <StyledText style={styles.myMargin}>Password</StyledText>
          <TextInput
            style={styles.label}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Enter Password"
          />

          <StyledText style={styles.myMargin}>Confirm Password</StyledText>
          <TextInput
            style={styles.label}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry
            placeholder="Re-enter Password"
          />
          <StyledText style={styles.fogotPassword}>Forgot Password?</StyledText>

          <TouchableOpacity
            style={[styles.signUpButton, styles.myMargin]}
            onPress={signupFn}
          >
            <StyledText style={styles.signUpText}>Sign Up</StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInButton, styles.myMargin]}
            onPress={() => Actions.dashboard()}
          >
            <StyledText style={styles.signInText}>Sign In</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
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
  signUpButton: {
    backgroundColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    fontWeight: "bold",
    color: "#fff",
  },
  signInText: {
    fontWeight: "bold",
    color: Colors.green,
  },
});
