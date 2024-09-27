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
    router.push({
      pathname: "/search/item",
      params: { item: item.idFirebaseAsset },
    });
  };
  return (
    <>
      <View style={styles.container}>
        {Platform.OS === "web" && <View style={{ marginTop: 20 }}></View>}

        <Text></Text>
        <FlatList
          data={eventList}
          scrollEnabled={true}
          ListHeaderComponent={user_email === emailCompany ? <Header /> : null}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  // margin: 2,
                  borderBottomWidth: 5,
                  borderBottomColor: "#f0f8ff",
                  paddingVertical: 10,
                  // alignItems: "center",
                  // alignSelf: "center",
                }}
              >
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity
                      style={[styles.row, styles.center]}
                      onPress={() => selectAsset(item)}
                    >
                      <ImageExpo
                        source={{ uri: item.photoAssetURL }}
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
                            {item.NombreArea}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>

                    <ImageExpo
                      source={{ uri: item.photoProfileURL }}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text style={styles.NombrePerfilCorto}>
                      {item.nombrePerfil}
                    </Text>
                  </View>
                </View>

                <View style={[styles.row, styles.center]}>
                  <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                    {"Tipo:  "}
                    {item.tipoEvento}
                  </Text>
                </View>
                <View style={[styles.row, styles.center]}>
                  <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                    {"Empresa:  "}
                    {item.emailCompany}
                  </Text>
                </View>

                <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                  {"Fecha:  "}
                  {item.fechaPostFormato}
                </Text>
                <Text></Text>
                <View style={styles.equipments}>
                  <TouchableOpacity
                  // onPress={() => commentPost(item)}
                  >
                    <ImageExpo
                      source={{ uri: item.photoEvent }}
                      style={styles.postPhoto}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>

                  <View>
                    <Text style={styles.textAreaTitle}>{item.tipoEvento}</Text>
                    <Text></Text>
                    <Text style={styles.textAreaComment} selectable={true}>
                      {item.comentarios}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
