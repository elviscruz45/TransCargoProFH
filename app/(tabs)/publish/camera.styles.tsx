import { StyleSheet } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  cameraButton: {
    // borderRadius: 50,
    alignSelf: "flex-end",
    marginLeft: 80,
  },
});
