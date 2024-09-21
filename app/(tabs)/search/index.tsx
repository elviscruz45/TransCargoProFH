import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
import { styles } from "./index.styles";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { SearchBar, Icon } from "@rneui/themed";
import { assetLists } from "../../../utils/assetList";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

export default function SearchAsset() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //global state management for the user_uid
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  // console.log("HOlacomoestas", globalAssetList);
  //this method is used to go to a screen to see the status of the item
  const selectAsset = (item: any) => {
    //create a to go to the screen called item
    router.push({
      pathname: "/search/item",
      params: { item: item.idFirebaseAsset },
    });
    // navigation.navigate(screen.search.tab, {
    //   screen: screen.search.item,
    //   params: { Item: idServiciosAIT },
    // });
  };
  //hola

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(globalAssetList?.slice(0, 100));
    } else {
      const result = globalAssetList?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.nombre) || re.test(item.placa);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText, globalAssetList]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={searchResults}
        ListHeaderComponent={
          <SearchBar
            placeholder="Buscar Activo o Area"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            lightTheme={true}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => selectAsset(item)}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
            >
              <View style={styles.equipments}>
                {
                  <ImageExpo
                    source={
                      item?.photoServiceURL
                        ? { uri: item?.photoServiceURL }
                        : require("../../../assets/assetpics/carIcon.jpg")
                    }
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
                }
                <Text> {"  "}</Text>

                <View>
                  {item.placa ? (
                    <Text style={styles.info}>
                      {"Placa: "}
                      {item.placa}
                    </Text>
                  ) : item.nombre ? (
                    <Text style={[styles.info, { alignSelf: "center" }]}>
                      {item.nombre}
                    </Text>
                  ) : (
                    <Text style={[styles.info, { alignSelf: "center" }]}>
                      {item.NombreArea}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: any) => item.idFirebaseAsset}
      />
    </View>
  );
}
