import { StyleSheet, Dimensions, Platform } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  // },
  table: {
    ...(Platform.OS === "web" && {
      paddingHorizontal: windowWidth * 0.15,
      marginBottom: 90,
    }),
  },
  chartContainer: {
    width: 200, // Adjust the width as needed
    height: 220, // Adjust the height as needed
    margin: 0,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "300",
  },
  roundImageUpload: {
    width: 40,
    height: 40,
    alignSelf: "center",
    flexDirection: "row",
    // marginLeft: windowWidth * 0.4,
  },
  excel: {
    width: 40,
    height: 40,
    marginLeft: 10,
    // alignSelf: "center",
    flexDirection: "row",
    // marginLeft: windowWidth * 0.4,
  },
  roundImageUploadmas: {
    width: 30,
    height: 30,
    margin: 5,
  },
  reporteTitulo: {
    paddingHorizontal: 15,
    ...(Platform.OS === "web" &&
      {
        // fontSize: 40,
      }),
    fontWeight: "900",
    textAlign: "center",
    color: "",
  },
  item: {
    paddingHorizontal: 15,
    ...(Platform.OS === "web" &&
      {
        // fontSize: 30,
      }),
    fontWeight: "900",
    textAlign: "center",
    color: "",
  },
  history: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: windowWidth * 0.1,
    marginLeft: windowWidth * 0.3,

    width: 40,
    height: 40,
    alignSelf: "flex-end",
    // marginRight: 10,

    // position: "absolute",
  },
  container22: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    paddingHorizontal: 15,
    fontWeight: "600",
    textAlign: "center",
    alignContent: "center",
    color: "",
    // fontSize: 30,
  },
  iconMinMax: {
    paddingHorizontal: 15,
    fontWeight: "600",
    alignSelf: "flex-end",
    flexDirection: "row",
    zIndex: 100,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  titulo1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  titulo2: {
    // flex: 1, // Adjust the value as per your requirement for the width
    // color: "",
    // // fontSize: 18,
    // fontWeight: "600",
  },
  titulo3: {
    // flex: 0.45,
    // // alignItems: "center",
    // color: "",
    // // fontSize: 18,
    // fontWeight: "bold",
  },
  roundImage10: {
    width: 20,
    height: 20,
    borderRadius: 20,
    // margin: 5,
    alignSelf: "flex-end",
  },
  roundImage11: {
    width: 20,
    height: 20,
    // borderRadius: 20,
    // margin: 5,
    alignSelf: "flex-end",
  },
  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    // flex: 1, // Adjust the value as per your requirement for the width
    // color: "",
    // // fontSize: 18,
    alignSelf: "center",
    textAlign: "left",
    width: 150,
  },
  multiLineColumn: {
    flex: 2,
    alignSelf: "center",
    color: "",
    // fontSize: 18,
  },
  btnContainer2: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    // marginHorizontal: 100,
    paddingHorizontal: 60,
    borderRadius: 40,
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
    paddingHorizontal: 60,
  },
});
