import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./files.styles";
import { Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
// import { screen } from "../../../utils";
import { formatDate } from "../../../utils/formats";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { db } from "../../../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { SearchBar, Icon } from "@rneui/themed";
interface ItemType {
  tipoFile: string;
  pdfFileURLFirebase: string;
  FilenameTitle: string;
  fechaPostFormato: string;
  fechaVencimiento: Date;
  deactivated: boolean;
}
export default function FileScreen() {
  //  searching
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { item }: any = useLocalSearchParams();

  const router = useRouter();
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  const files = currentAsset?.files;

  const uploadFile = useCallback(async (uri: any) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se puede abrir el documento PDF",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se puede abrir el documento PDF",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }, []);

  const goToAddDocsForm = () => {
    router.push({
      pathname: "/search/addFiles",
      params: { item: item },
    });
  };
  const goToEditDocs = (
    tipoFile: any,
    FilenameTitle: any,
    fechaPostFormato: any,
    pdfFileURLFirebase: any
  ) => {
    router.push({
      pathname: "/search/editFiles",
      params: {
        tipoFile: tipoFile,
        uidDoc: item,
        FilenameTitle: FilenameTitle,
        fechaPostFormato: fechaPostFormato,
        pdfFileURLFirebase: pdfFileURLFirebase,
      },
    });
  };
  // go to delete screen
  const goToDeleteDocs = async (pdfFileURLFirebase: any) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Estas Seguro que deseas cambiar de Imagen?"
      );
      if (confirmed) {
        const Ref = doc(db, "Asset", item);
        const docSnapshot = await getDoc(Ref);
        const docList = docSnapshot?.data()?.files;

        const filteredList = docList.filter(
          (obj: any) => obj.pdfFileURLFirebase !== pdfFileURLFirebase
        );

        const updatedData = {
          files: filteredList,
        };

        await updateDoc(Ref, updatedData);
      }
    } else {
      Alert.alert(
        "Eliminar Documento",
        "Estas Seguro que desear Eliminar el evento?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              const Ref = doc(db, "Asset", item);
              const docSnapshot = await getDoc(Ref);
              const docList = docSnapshot?.data()?.files;

              const filteredList = docList.filter(
                (obj: any) => obj.pdfFileURLFirebase !== pdfFileURLFirebase
              );

              const updatedData = {
                files: filteredList,
              };

              await updateDoc(Ref, updatedData);
              Toast.show({
                type: "success",
                position: "bottom",
                text1: "Se ha eliminado correctamente",
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const deactivateNotification = async (pdfFileURLFirebase: any) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Estas Seguro que deseas cambiar la notificacion en tus reportes?"
      );
      if (confirmed) {
        const Ref = doc(db, "Asset", item);
        const docSnapshot = await getDoc(Ref);
        const docList = docSnapshot?.data()?.files;

        // const filteredList = docList.filter(
        //   (obj: any) => obj.pdfFileURLFirebase !== pdfFileURLFirebase
        // );

        const findIndex = docList.findIndex(
          (obj: any) => obj.pdfFileURLFirebase === pdfFileURLFirebase
        );

        // const updatedData = {
        //   files: filteredList,
        // };
        if (findIndex !== -1) {
          // const updatedData = {
          //   files: arrayRemove(docList[findIndex]),
          // };
          //add another property to the object called deactivated
          docList[findIndex].deactivated = !docList[findIndex].deactivated;

          const updatedData = {
            files: docList,
          };
          await updateDoc(Ref, updatedData);
        }

        // await updateDoc(Ref, updatedData);
      }
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(files?.slice(0, 100));
    } else {
      const result = files?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.tipoFile) || re.test(item.FilenameTitle);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText, files]);

  return (
    <>
      <SearchBar
        placeholder="Buscar Documento"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "white" }}
      />
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
      >
        {Platform.OS === "web" && <View style={{ marginTop: 20 }}></View>}
        <Text> </Text>
        <Text> </Text>

        {/* <Text style={styles.name}>{Item.asset}</Text> */}
        <Text></Text>
        <TouchableOpacity onPress={() => goToAddDocsForm()}>
          <ImageExpo
            source={require("../../../assets/pictures/addFilesIcon.png")}
            style={styles.image3}
            cachePolicy={"memory-disk"}
          />
        </TouchableOpacity>

        <FlatList
          data={searchResults}
          scrollEnabled={false}
          renderItem={({ item }: any) => {
            return (
              <View>
                {Platform.OS === "web" && (
                  <View style={{ marginTop: 20 }}></View>
                )}

                <View
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.tipoFile}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 3,
                      backgroundColor: "white",
                      borderWidth: 0.3,
                    }}
                  >
                    <View style={{ marginBottom: 20, width: "50%" }}>
                      <View style={styles.equipments2}>
                        <TouchableOpacity
                          onPress={() => uploadFile(item.pdfFileURLFirebase)}
                        >
                          <ImageExpo
                            source={require("../../../assets/pictures/pdf4.png")}
                            style={styles.image2}
                            cachePolicy={"memory-disk"}
                          />
                        </TouchableOpacity>

                        <View>
                          <View style={[{ flexDirection: "row" }]}>
                            <Text style={{ fontWeight: "bold" }}>
                              {"Titulo: "}
                            </Text>
                            <Text style={[styles.info2]}>
                              {item.FilenameTitle}{" "}
                            </Text>
                          </View>
                          {/* <View style={[{ flexDirection: "row" }]}>
                          <Text style={{ fontWeight: "bold" }}>{"Tipo: "}</Text>
                          <Text style={styles.info2}>{item.tipoFile}</Text>
                        </View> */}
                          {/* <View style={[{ flexDirection: "row" }]}>
                          <Text style={{ fontWeight: "bold" }}>
                            {"Autor: "}
                          </Text>
                          <Text style={styles.info2}>{item.autor}</Text>
                        </View> */}

                          <View style={[{ flexDirection: "row" }]}>
                            <Text style={{ fontWeight: "bold" }}>
                              {"Fecha:"}
                            </Text>
                            <Text style={{}}>
                              {item.fechaPostFormato || "No definido"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 0.3,
                    }} // Add backgroundColor here
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginTop: "2%",
                        marginLeft: "2%",
                      }}
                    >
                      Vencimiento:
                    </Text>
                    <Text style={{ alignSelf: "center" }}>
                      {/* {item.fechaVencimiento} */}

                      {formatDate(item.fechaVencimiento) || "No definido"}
                    </Text>
                    <Text></Text>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      {emailCompany === user_email && (
                        <TouchableOpacity
                          onPress={() =>
                            goToEditDocs(
                              item.tipoFile,
                              item.FilenameTitle,
                              item.fechaPostFormato,
                              item.pdfFileURLFirebase
                            )
                          }
                        >
                          <ImageExpo
                            source={require("../../../assets/pictures/editIcon2.png")}
                            style={[
                              styles.roundImage10,
                              { alignSelf: "center" },
                            ]}
                            cachePolicy={"memory-disk"}
                          />
                        </TouchableOpacity>
                      )}
                      <Text> {" -  "}</Text>

                      {emailCompany === user_email && (
                        <TouchableOpacity
                          onPress={() =>
                            goToDeleteDocs(item.pdfFileURLFirebase)
                          }
                        >
                          <View style={{ marginRight: "2%" }}>
                            <ImageExpo
                              source={require("../../../assets/pictures/deleteIcon.png")}
                              style={[
                                styles.roundImage10,
                                { alignSelf: "center" },
                              ]}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                      <Text> {" -  "}</Text>
                      {emailCompany === user_email && Platform.OS === "web" && (
                        <TouchableOpacity
                          onPress={() =>
                            deactivateNotification(item.pdfFileURLFirebase)
                          }
                        >
                          <View style={{ marginRight: "2%" }}>
                            <ImageExpo
                              source={
                                !item?.deactivated
                                  ? require("../../../assets/images/notification.png")
                                  : require("../../../assets/images/no_notifications.png")
                              }
                              style={[
                                styles.roundImage10,
                                { alignSelf: "center" },
                              ]}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item: any, index: number) =>
            `${item.FilenameTitle}-${item.fechaPostFormato}-${index}`
          } // Provide a unique key for each item
        />
      </ScrollView>
    </>
  );
}
