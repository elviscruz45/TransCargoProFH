import { StyleSheet, Dimensions, Platform } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  equipments: {
    ...(Platform.OS === "web" && {
      paddingHorizontal: windowWidth * 0.2,
    }),
    flexDirection: "row",
    margin: 2,
    marginLeft: 2,
    alignSelf: "center",
  },
  roundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
  },
  name: {
    fontWeight: "bold",
    // marginRight: "30%",
    textAlign: "center",
    alignSelf: "center",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
    textAlign: "center",
  },
  addInformation: {
    backgroundColor: "#2A3B76",
    margin: 20,
  },
  //title
  postPhoto: {
    // height: 700,
    // width: windowWidth,
    ...(Platform.OS === "web"
      ? {
          height: windowWidth * 0.4,
          width: windowWidth * 0.3,
        }
      : {
          height: windowWidth * 0.45,
          width: windowWidth * 0.35,
        }),

    marginTop: 0,
    borderRadius: 20,
  },
  textArea: {
    ...(Platform.OS === "web"
      ? {
          height: windowWidth * 0.2,
          width: windowWidth * 0.3,
        }
      : {
          height: windowWidth * 0.2,
          width: windowWidth * 0.55,
        }),
    borderColor: "black",

    padding: 0,
    margin: 0,
  },
  //events
  content: {
    // marginHorizontal: 10,
  },
  subtitleForm: {
    color: "#2A3B76",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 9,
  },
});
