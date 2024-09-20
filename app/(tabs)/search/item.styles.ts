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
    marginRight: 100,
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    marginLeft: "2%",
    // justifyContent: "space-between",
  },
  alert1: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
    marginLeft: windowWidth / 32,
    // color: "red",
  },
  alert2: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
    marginLeft: windowWidth / 32,
    // color: "blue",
  },
  btnContainer4: {
    // position: "absolute",
    // bottom: 80,
    // right: 10,
    // paddingHorizontal: 90,
    // marginLeft: windowWidth / 2,
    paddingHorizontal: 20,
  },
  roundImageUpload: {
    width: 50,
    height: 50,
    marginHorizontal: "5%",
    // paddingHorizontal: 40,
    // borderRadius: 50, // half of width and height
  },

  // history
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    // justifyContent: "center",
  },
  timeWrapper: {
    // alignItems: "flex-end",
  },
  timeContainer: {
    minWidth: 45,
  },
  timeContainerStyle: { minWidth: 52, marginTop: -5, marginRight: 0 },
  time: {
    textAlign: "right",
    color: "black",
    overflow: "hidden",
  },
  timeStyle: {
    textAlign: "right",
    backgroundColor: "#2A3B76",
    color: "white",
    padding: 5,
    borderRadius: 13,
    // zIndex: 100,
  },
  circle: {
    // width: 16,
    // height: 16,
    // borderRadius: 10,
    marginLeft: 57,
    marginTop: 10,
    zIndex: 1,
    position: "absolute",
    // alignItems: "flex-start",
    // justifyContent: "center",
  },
  details: {
    borderLeftWidth: 2,
    marginRight: 30,
    marginLeft: 65,
    marginTop: 0,
    marginBottom: 0,
    // flexDirection: "column",
    // flex: 1,
  },
  titledetails: {
    width: windowWidth * 0.75,
    marginLeft: 5,
    marginRight: 35,
    marginBottom: 10,
    // alignSelf: "center",
    fontWeight: "bold",
  },
  textdetail: {
    width: windowWidth * 0.65,

    marginLeft: 5,
    marginRight: 35,
    textAlign: "left",
    // alignItems: "flex-start",
  },
  rowavanceNombre: {
    flexDirection: "row",
    marginTop: 0,
    marginLeft: 5,
    // alignSelf: "flex-end",
  },
  avanceNombre: {
    fontWeight: "600",
    color: "grey",
  },
  detail: {
    marginLeft: 5,
    marginRight: 35,
    alignItems: "flex-start",
    color: "grey",
  },
});
