import { StyleSheet, Dimensions, Platform } from "react-native";
import type { RootState } from "../../store";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from "../../components/Themed";
import { Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../slices/counter";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const getGridItemWidth = () => {
  console.log("windowWidth", windowWidth);
  if (windowWidth >= 1200) {
    return windowWidth / 3 - 20; // 4 columns
  } else if (windowWidth >= 800) {
    return windowWidth / 2 - 20; // 3 columns
  } else {
    return windowWidth / 1 - 20; // 2 columns
  }
};

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
  row1: {
    flexDirection: "row",
    // width: windowWidth * 0.2,
    alignItems: "center",

    // width: windowWidth * 0.5,
  },
  row: {
    flexDirection: "row",
    // width: windowWidth * 0.5,
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
    color: "",
    // color: true ? "black" : "red",
  },
  NombrePerfilCorto: {
    width: windowWidth * 0.33,
    color: "",
  },
  postPhoto: {
    ...(Platform.OS === "web"
      ? {
          // height: windowWidth * 0.35,
          // width: windowWidth * 0.3,
          height: 120,
          width: 100,
        }
      : {
          height: windowWidth * 0.48,
          width: windowWidth * 0.48,
        }),

    marginTop: 0,
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "",
  },
  textAreaTitle: {
    width: windowWidth * 0.45,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "",
  },
  textAreaComment: {
    width: windowWidth * 0.45,
    marginLeft: 10,
    fontSize: 14,
    // color: "black",
  },
  equipments: {
    flexDirection: "row",
    margin: 5,
    // backgroundColor: "green",
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
  webItemContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  gridItem: {
    // width: getGridItemWidth(),
    // padding: 10,
    // backgroundColor: "red",
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: "#ddd",
    // padding: 15,
    // borderWidth: 10,
    borderTopWidth: 10,
    backgroundColor: "white",
    // borderBottomColor: "",
    // paddingVertical: 10,
  },
  gridContainer: {
    // width: getGridItemWidth(),
    flex: 1,

    // flexDirection: "row",
    // flexWrap: "wrap",
    backgroundColor: "white",
    // justifyContent: "space-between",
    // backgroundColor: "red",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // padding: 10,
  },
});
