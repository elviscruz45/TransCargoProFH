import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
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
    // flexDirection: "row",
    margin: 10,
    // width: "100%",
    alignItems: "center", // Align contents vertically
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: "bold",
    // marginRight: 100,
    alignItems: "center", // Align contents vertically
  },
  info: {
    color: "#828282",
    // paddingRight: 100,
    marginTop: 3,
  },
  name2: {
    fontWeight: "bold",
    // backgroundColor: "blue",
    // marginRight: 100,
    alignSelf: "center",
    alignItems: "center", // Align contents vertically
  },
  btnActualizarStyles: {
    // marginTop: 30,
    // paddingVertical: 30,
    // marginLeft: 100,
    // alignContent: "center",

    // verticalAlign: "bottom",
    // textAlignVertical: "center",
    borderRadius: 20,
    backgroundColor: "#2A3B76",
    marginHorizontal: windowWidth / 8,

    // borderTopWidth: 1,
    // borderTopColor: "#e3e3e3",
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3e3",
  },
  btnTextStyle: {
    color: "#ffff",
    fontWeight: "bold",
  },
});
