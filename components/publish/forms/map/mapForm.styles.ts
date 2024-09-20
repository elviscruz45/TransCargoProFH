import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  mapStyle: {
    width: "100%",
    height: "88%",
  },
  addInformation: {
    backgroundColor: "#2A3B76",
    margin: "1%",
  },
});
