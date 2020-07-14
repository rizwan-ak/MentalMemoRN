import Colors from "../config/Colors";
import { AmplifyTheme } from "aws-amplify-react-native";

const Button = Object.assign({}, AmplifyTheme.button, {
  backgroundColor: Colors.green,
});
const SectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, {
  color: Colors.green,
});

const InputLabel = Object.assign({}, AmplifyTheme.InputLabel, {
  color: Colors.green,
});

export const MyTheme = Object.assign({}, AmplifyTheme, {
  button: Button,
  sectionFooterLink: SectionFooterLink,
  inputLabel: InputLabel,
});
