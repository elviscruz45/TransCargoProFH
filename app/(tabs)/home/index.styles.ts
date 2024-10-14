import { StyleSheet, Dimensions, Platform } from "react-native";
import type { RootState } from "../../store";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from "../../components/Themed";
import { Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../slices/counter";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...(Platform.OS === "web" && {
      marginHorizontal: "0%",
    }),
    // alignItems: "center",
    // marginHorizontal: 20,
    // justifyContent: "center",

    backgroundColor: "white",
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
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    margin: 5,
    borderColor: "black",
  },
  NombreServicio: {
    // maxWidth: windowWidth * 0.48,
    width: windowWidth * 0.4,
    // color: true ? "black" : "red",
  },
  NombrePerfilCorto: {
    width: windowWidth * 0.33,
  },
  postPhoto: {
    height: windowWidth * 0.48,
    width: windowWidth * 0.48,
    marginTop: 0,
    borderRadius: 5,
    borderWidth: 0.1,
  },
  textAreaTitle: {
    width: windowWidth * 0.45,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  textAreaComment: {
    width: windowWidth * 0.45,
    marginLeft: 10,
    fontSize: 14,
  },
  equipments: {
    flexDirection: "row",
    margin: 5,
  },
  btnActualizarStyles: {
    // marginTop: 30,
    // paddingVertical: 10,
    // marginLeft: 100,
    borderRadius: 20,
    backgroundColor: "#2A3B76",
    marginHorizontal: windowWidth / 5,

    // borderTopWidth: 1,
    // borderTopColor: "#e3e3e3",
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3e3",
  },
  btncerrarStyles: {
    // marginTop: 5,
    // marginBottom: 10,
    // paddingVertical: 10,
    // marginHorizontal: 150,
    borderRadius: 20,
    backgroundColor: "red",
    // borderTopWidth: 1,
    // borderTopColor: "#e3e3e3",
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3e3",
    // marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  btnTextStyle: {
    color: "#ffff",
    fontWeight: "bold",
  },
});
