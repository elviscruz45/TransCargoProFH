import { StyleSheet, Platform } from "react-native";
import { useState, useEffect } from "react";
// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View, Image } from "react-native";
import { styles } from "./index.styles";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { assetLists } from "../../../utils/assetList";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { pickAsset } from "../../../slices/publish";
import Toast from "react-native-toast-message";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { takePhoto } from "../../../slices/publish";
import { SearchBar } from "react-native-elements"; // or wherever your SearchBar component is from

export default function Publish() {
  const router = useRouter();
  const [asset, setAsset] = useState<any>(null);
  const [searchText, setSearchText] = useState<any>("");
  const [searchResults, setSearchResults] = useState([]);
  //global state management for the user_uid
  const globalAsset = useSelector((state: RootState) => state.publish.asset);
  const dispatch = useDispatch();
  const assetLists: any =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  type AppRoutes =
    | "/"
    | "/(modals)"
    | "/(modals)/tires"
    | "/(modals)/tires.styles"
    | "/(routes)/login"
    | "/(tabs)"
    | "/(tabs)/home"
    | "/(tabs)/home/index.styles"
    | "/(tabs)/profile"
    | "/(tabs)/publish"
    | "/publish/camera"
    | "/publish/asset"
    | "/publish/events"
    | `${string}:${string}`; // Keep this for dynamic routes

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(assetLists?.slice(0, 100));
    } else {
      const result = assetLists?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.nombre) || re.test(item.placa);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText]);

  // go to another screen to take a photo before put data to the form
  const camera = (item: any) => {
    if (!asset) {
      Toast.show({
        type: "error",
        text1: "Escoge un servicio para continuar",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }
    router.push({
      pathname: "/publish/camera",
      params: { item: item },
    });
    setAsset(null);
    // setAIT(null);
  };

  const addAsset = () => {
    router.push({
      pathname: "/publish/asset",
    });
    // navigation.navigate(screen.post.aitform);
    setAsset(null);
    // setAIT(null);
  };
  const selectAsset = (item: any) => {
    // const area = AIT.AreaServicio;
    // const indexareaList = areaLists.findIndex((item) => item.value === area);
    // const imageSource = areaLists[indexareaList]?.image;
    // const imageUpdated = AIT.photoServiceURL;
    // if (imageUpdated) {
    //   setEquipment({ uri: imageUpdated });
    //   console.log("selectAsset");
    // } else {
    //   setEquipment(imageSource);
    //   console.log("selectAsset111", imageSource);
    // }
    setAsset(item);
    dispatch(pickAsset(item));
    // props.saveActualServiceAIT(AIT);
  };

  //method to retrieve the picture required in the event post (pick Imagen, take a photo)
  const pickImage = async (item: any) => {
    if (!asset) {
      Toast.show({
        type: "error",
        text1: "Escoge un servicio para continuar",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.canceled) {
      Toast.show({
        type: "error",
        text1: "No se ha seleccionado ninguna imagen",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        {
          compress: 0.1,
          base64: true,
          // , format: "jpeg"
        }
      );
      // props.savePhotoUri(resizedPhoto.uri);
      // navigation.navigate(screen.post.form);
      dispatch(takePhoto(resizedPhoto.uri));
      setAsset(null);

      router.push({
        pathname: "/publish/events",
        // params: { item: item },
      });
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SearchBar
        placeholder="Buscar Activo o Area"
        value={searchText}
        platform="default"
        onChangeText={(text?: string) => setSearchText(text)}
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "white" }}
        loadingProps={{}}
        showLoading={false}
        round={false}
        onClear={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        onCancel={() => {}}
        cancelButtonTitle=""
        cancelButtonProps={{}}
        searchIcon={{ name: "search" }} // Provide the required properties
        clearIcon={{ name: "clear" }}
        showCancel={false}
      />
      <ImageExpo
        source={
          asset?.photoServiceURL
            ? { uri: asset?.photoServiceURL }
            : require("../../../assets/assetpics/carIcon.jpg")
        }
        style={styles.roundImage}
        cachePolicy={"memory-disk"}
      />

      {asset ? (
        <Text style={styles.name}>{asset.placa}</Text>
      ) : (
        <Text style={styles.name}>"Escoger Activo"</Text>
      )}
      {Platform.OS === "web" && <View style={{ marginTop: 20 }}></View>}

      <Text></Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",

          // paddingHorizontal: 150,
        }}
      >
        <TouchableOpacity
          style={styles.btnContainer2}
          onPress={() => pickImage(asset)}
        >
          <ImageExpo
            source={require("../../../assets/pictures/AddImage.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer3}
          onPress={() => camera("hola")}
        >
          <ImageExpo
            source={require("../../../assets/pictures/TakePhoto2.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
        {user_email === emailCompany && (
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => addAsset()}
          >
            <ImageExpo
              source={require("../../../assets/pictures/newService7.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={searchResults}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => selectAsset(item)}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
            >
              <View style={styles.equipments}>
                <ImageExpo
                  source={
                    item?.photoServiceURL
                      ? { uri: item?.photoServiceURL }
                      : require("../../../assets/assetpics/carIcon.jpg")
                  }
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />

                <View>
                  <Text style={styles.name2}></Text>

                  {item.placa ? (
                    <Text style={styles.info}>
                      {"  "}
                      {"Placa: "}
                      {item.placa}
                    </Text>
                  ) : item.nombre ? (
                    <Text style={[styles.info, { alignSelf: "center" }]}>
                      {"  "}

                      {item.nombre}
                    </Text>
                  ) : (
                    <Text style={[styles.info, { alignSelf: "center" }]}>
                      {"  "}

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
