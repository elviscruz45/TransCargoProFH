import { StyleSheet, Dimensions } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  equipments: {
    flexDirection: "row",
    margin: 10,
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
    height: windowWidth * 0.45,
    width: windowWidth * 0.35,
    marginTop: 0,
    borderRadius: 20,
  },
  textArea: {
    // height: 100,
    width: windowWidth * 0.55,
    height: windowWidth * 0.2,
    padding: 0,
    margin: 0,
  },
  //events
  content: {
    marginHorizontal: 10,
  },
  subtitleForm: {
    color: "#2A3B76",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 9,
  },
});
