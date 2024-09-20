import React, { useCallback } from "react";
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
import { documents } from "../../../utils/files";
import { Item } from "../../../utils/files";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
// import { screen } from "../../../utils";
import { formatDate } from "../../../utils/formats";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { db } from "../../../utils/firebase";

export default function FileScreen() {
  const { item }: any = useLocalSearchParams();

  const router = useRouter();
  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );
  const currentEmployee: any = employeesList.find(
    (user: any) => user.uid === item
  );

  const files = currentEmployee?.files;

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
      pathname: "/profile/addFiles",
      params: { item: item },
    });
  };
  const goToEditDocs = (
    tipoFile: any,
    FilenameTitle: any,
    fechaPostFormato: any
  ) => {
    router.push({
      pathname: "/profile/editFiles",
      params: {
        tipoFile: tipoFile,
        uidDoc: item,
        FilenameTitle: FilenameTitle,
        fechaPostFormato: fechaPostFormato,
      },
    });
  };

  // go to delete screen
  const goToDeleteDocs = (pdfFileURLFirebase: any) => {
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
            const Ref = doc(db, "users", item);
            const docSnapshot = await getDoc(Ref);
            const docList = docSnapshot?.data()?.files;

            const filteredList = docList.filter(
              (obj: any) => obj.pdfFileURLFirebase !== pdfFileURLFirebase
            );
            console.log("docList", filteredList);

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
  };


  return (
    <ScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>

      <Text></Text>
      <TouchableOpacity onPress={() => goToAddDocsForm()}>
        <ImageExpo
          source={require("../../../assets/pictures/addFilesIcon.png")}
          style={styles.image3}
          cachePolicy={"memory-disk"}
        />
      </TouchableOpacity>

      <FlatList
        data={files}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View>
              <View
                style={{ marginBottom: 10, marginTop: 10, alignSelf: "center" }}
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
                          <Text style={{ fontWeight: "bold" }}>{"Fecha:"}</Text>
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
                      marginTop: "10%",
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
                    <TouchableOpacity
                      onLongPress={() =>
                        goToEditDocs(
                          item.tipoFile,
                          item.FilenameTitle,
                          item.fechaPostFormato
                        )
                      }
                    >
                      <ImageExpo
                        source={require("../../../assets/pictures/editIcon2.png")}
                        style={[styles.roundImage10, { alignSelf: "center" }]}
                        cachePolicy={"memory-disk"}
                      />
                    </TouchableOpacity>
                    <Text> {" -  "}</Text>

                    <TouchableOpacity
                      onLongPress={() =>
                        goToDeleteDocs(item.pdfFileURLFirebase)
                      }
                    >
                      <View style={{ marginRight: "2%" }}>
                        <ImageExpo
                          source={require("../../../assets/pictures/deleteIcon.png")}
                          style={[styles.roundImage10, { alignSelf: "center" }]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) =>
          `${item.FilenameTitle}-${item.fechaPostFormato}`
        } // Provide a unique key for each item
      />
    </ScrollView>
  );
}
