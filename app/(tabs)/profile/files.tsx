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
import { documents } from "../../../utils/files";
import { Item } from "../../../utils/files";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
// import { screen } from "../../../utils";
import { formatDate } from "../../../utils/formats";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { SearchBar, Icon } from "@rneui/themed";
import { supabase } from "@/supabase/client";

export default function FileScreen() {
  //  searching
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { item }: any = useLocalSearchParams();

  const router = useRouter();
  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );

  const currentEmployee: any = employeesList.find(
    (user: any) => user.id === item
  );

  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
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
  const goToDeleteDocs = async (pdfFileURLFirebase: any) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Estas Seguro que desear Eliminar el evento?"
      );
      if (confirmed) {
        let { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", item)
          .single();
        if (error) {
          console.error("Error fetching asset files:", error);
          return;
        }
        const [filteredListtoDelete] = user?.files?.filter(
          (obj: any) => obj.pdfFileURLFirebase === pdfFileURLFirebase
        );

        const filteredList = user?.files?.filter(
          (obj: any) => obj.pdfFileURLFirebase !== pdfFileURLFirebase
        );

        const { data, error: errorData } = await supabase
          .from("users")
          .update({ files: filteredList })
          .eq("id", item)
          .select();

        if (errorData) {
          console.warn("errorData", errorData);

          return;
        }

        const { data: datastorage, error: errorStorage } =
          await supabase.storage
            .from("assets_documents")
            .remove([
              `noe_huachaca@fhingenieros.com.pe/pdfPost/profile/${filteredListtoDelete?.FilenameTitle}`,
            ]);

        if (errorStorage) {
          console.warn("errorData", errorStorage);

          return;
        }
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
              let { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", item)
                .single();

              const [filteredListtoDelete] = user?.files?.filter(
                (obj: any) => obj.pdfFileURLFirebase === pdfFileURLFirebase
              );

              const filteredList = user?.files?.filter(
                (obj: any) => obj.pdfFileURLFirebase !== pdfFileURLFirebase
              );

              const { data, error: errorData } = await supabase
                .from("users")
                .update({ files: filteredList })
                .eq("id", item)
                .select();

              if (errorData) {
                console.log("errorData", errorData);
                return;
              }

              const { data: datastorage, error: errorStorage } =
                await supabase.storage
                  .from("assets_documents")
                  .remove([
                    `noe_huachaca@fhingenieros.com.pe/pdfPost/profile/${filteredListtoDelete?.FilenameTitle}`,
                  ]);

              if (errorStorage) {
                console.log("errorStorage", errorStorage);
                return;
              }

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
                              item.fechaPostFormato
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
