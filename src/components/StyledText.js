import * as React from "react";
import { Text } from "react-native";

export default function StyledText(props) {
  return (
    <Text
      {...props}
      style={[props.style, , { fontFamily: "SpaceMonoRegular" }]}
    />
  );
}
