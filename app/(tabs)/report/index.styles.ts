import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  // },
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
    alignSelf: "center",
    flexDirection: "row",
    // marginLeft: windowWidth * 0.4,
  },
  roundImageUploadmas: {
    width: 30,
    height: 30,
    margin: 5,
  },
  company: {
    paddingHorizontal: 15,
    fontWeight: "900",
    textAlign: "center",
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
    backgroundColor: "#F5FCFF",
  },
  titleText: {
    paddingHorizontal: 15,
    fontWeight: "600",
    textAlign: "center",
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
    backgroundColor: "#fff",
  },
  titulo1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  titulo2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  titulo3: {
    flex: 0.45,
    // alignItems: "center",
  },
  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 2,
    alignSelf: "center",
  },
});
