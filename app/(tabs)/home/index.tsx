import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./index.styles";
import { Header } from "@/components/home/header/header";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const eventList: any = useSelector(
    (state: RootState) => state.home.eventList
  );
  const router = useRouter();
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const dispatch = useDispatch();
  const selectAsset = (item: any) => {
    //create a to go to the screen called item
    console.log("itemHOME", item);

    console.log("itemHOME", item.id);
    router.push({
      pathname: "/search/item",
      params: { item: item.idFirebaseAsset },
    });
    // setInterval(() => {
    //   router.push({
    //     pathname: "/search/item",
    //     params: { item: item.id },
    //   });
    // }, 500);
  };
  return (
    <>
      <View style={styles.container}>
        {Platform.OS === "web" && <View style={{ marginTop: 20 }}></View>}

        <FlatList
          data={eventList}
          scrollEnabled={true}
          ListHeaderComponent={<Header />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
          style={{ backgroundColor: "white" }}
          renderItem={({ item }) => {
            const arrayLlanta =
              item?.llanta?.filter((item: any) => item.selected) || [];

            return (
              <View
                style={{
                  // margin: 2,
                  borderBottomWidth: 1,
                  borderBottomColor: "",
                  paddingVertical: 10,

                  // alignItems: "center",
                  // alignSelf: "center",
                }}
              >
                <View style={[styles.row, styles.center]}>
                  <Text> </Text>
                  <Text> </Text>
                  <Text> </Text>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity
                      style={[styles.row, styles.center]}
                      onPress={() => selectAsset(item)}
                    >
                      <ImageExpo
                        source={
                          item.photoAssetURL
                            ? { uri: item.photoAssetURL }
                            : require("../../../assets/assetpics/truckIcon.png")
                        }
                        style={styles.roundImage}
                        cachePolicy={"memory-disk"}
                      />
                      <View>
                        {item.placa ? (
                          <Text style={styles.NombreServicio}>
                            {"Placa: "}
                            {item.placa}
                          </Text>
                        ) : item.nombre ? (
                          <Text
                            style={[
                              styles.NombreServicio,
                              { alignSelf: "center" },
                            ]}
                          >
                            {item.nombre}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              styles.NombreServicio,
                              { alignSelf: "center" },
                            ]}
                          >
                            {item.nombreAsset}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>

                    <ImageExpo
                      source={
                        item.photoProfileURL
                          ? { uri: item.photoProfileURL }
                          : require("../../../assets/assetpics/userIcon.png")
                      }
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text style={styles.NombrePerfilCorto}>
                      {item.nombrePerfil}
                    </Text>
                  </View>
                </View>
                <Text> </Text>
                <View style={[styles.row, styles.center]}>
                  <Text
                    style={{ marginLeft: 15, color: "", fontWeight: "bold" }}
                  >
                    {"Tipo de Información:"}
                  </Text>
                  <Text style={{ marginLeft: 5, color: "" }}>
                    {item.tipoEvento}
                  </Text>
                </View>
                {/* <View style={[styles.row, styles.center]}>
                  <Text
                    style={{ marginLeft: 15, color: "", fontWeight: "bold" }}
                  >
                    {"Empresa:"}
                  </Text>
                  <Text style={{ marginLeft: 5, color: "" }}>
                    {item.emailCompany}
                  </Text>
                </View> */}
                <View style={[styles.row, styles.center]}>
                  <Text
                    style={{ marginLeft: 15, color: "", fontWeight: "bold" }}
                  >
                    {"Usuario:"}
                  </Text>
                  <Text style={{ marginLeft: 5, color: "" }}>
                    {item.emailPerfil}
                  </Text>
                </View>
                <View style={[styles.row, styles.center]}>
                  <Text
                    style={{ marginLeft: 15, color: "", fontWeight: "bold" }}
                  >
                    {"Fecha:"}
                  </Text>
                  <Text style={{ marginLeft: 1, color: "" }}>
                    {item.fechaPostFormato}
                  </Text>
                </View>

                <Text> </Text>
                <View style={styles.equipments}>
                  <TouchableOpacity
                  // onPress={() => commentPost(item)}
                  >
                    <ImageExpo
                      source={
                        item?.fotoPrincipal
                          ? { uri: item?.fotoPrincipal }
                          : require("../../../assets/assetpics/fhlogoiconver3.png")
                      }
                      style={styles.postPhoto}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>
                  <Text>{"     "} </Text>

                  <View>
                    <Text style={styles.textAreaTitle}>{item.tipoEvento}</Text>
                    <Text> </Text>
                    <Text style={styles.textAreaComment} selectable={true}>
                      {item.comentarios}{" "}
                      {arrayLlanta?.length > 0 &&
                        arrayLlanta?.map((item: any, index: any) => (
                          <Text key={index}>Llanta N: {item.value}, </Text>
                        ))}
                    </Text>
                  </View>
                </View>
                <Text> </Text>
                <Text> </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
