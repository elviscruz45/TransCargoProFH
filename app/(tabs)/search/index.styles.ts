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
    marginRight: 100,
  },
  info: {
    color: "#DCDCDF",
    paddingRight: 100,
    marginTop: 3,
  },
  name2: {
    fontWeight: "bold",
    // marginRight: 100,
    alignSelf: "flex-start",
  },
});
