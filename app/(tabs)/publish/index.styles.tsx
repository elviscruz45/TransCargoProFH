import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  equipments: {
    flexDirection: "row",
    margin: 10,
    width: "100%",
    alignItems: "center", // Align contents vertically
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontWeight: "bold",
    // marginRight: 100,
    alignSelf: "center",
    color: "",
  },
  name2: {
    fontWeight: "bold",
    // marginRight: 100,
    alignSelf: "flex-start",
    color: "",
  },
  info: {
    color: "",
    // paddingRight: 100,
    marginTop: 3,
    alignSelf: "flex-start",
  },
  btnContainer2: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    // marginHorizontal: 100,
    // paddingHorizontal: 60,
    borderRadius: 40,
  },
  roundImageUpload: {
    width: 50,
    height: 50,
    // borderRadius: 45, // half of width and height
  },
  btnContainer3: {
    // position: "absolute",
    // bottom: 80,
    // right: 10,
    // paddingHorizontal: 0,
  },
  btnContainer4: {
    // position: "absolute",
    // bottom: 150,
    // right: 10,
    // paddingHorizontal: 60,
  },
  roundImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 5,
    alignSelf: "center",
  },
});
