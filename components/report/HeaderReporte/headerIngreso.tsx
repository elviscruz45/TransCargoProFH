import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./headerAssets.styles";
import { Image as ImageExpo } from "expo-image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { useRouter } from "expo-router";

export function Reporte({ setAsset }: any) {
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );

  console.log("globalAssetList", globalAssetList);

  const globalFilteredAssetList = globalAssetList?.filter(
    (item: any) =>
      item.reporte === "Visible" && item.tipoActivo === "Equipo / Activo"
  );

  const ShortTextComponent = (item: any) => {
    const longText = item;
    const maxLength = 20; // Maximum length of the short text
    let shortText = longText;
    if (longText?.length > maxLength) {
      shortText = `${longText.substring(0, maxLength)}...`;
    }
    return <Text>{shortText}</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={globalFilteredAssetList}
        horizontal={true}
        style={{ backgroundColor: "" }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => setAsset(item?.idFirebaseAsset)}
              style={{ backgroundColor: "" }} // Add backgroundColor here
            >
              <View
                style={{
                  marginHorizontal: 10,
                  // backgroundColor: "green",
                  marginBottom: 20,
                  // alignSelf: "center",
                }}
              >
                <ImageExpo
                  source={
                    item?.photoServiceURL
                      ? { uri: item?.photoServiceURL }
                      : require("../../../assets/assetpics/carIcon.jpg")
                  }
                  style={{
                    alignSelf: "center",
                    // marginLeft: 20,
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                  }}
                />
                {item.placa ? (
                  <Text style={{ alignSelf: "center", color: "" }}>
                    {ShortTextComponent(item.placa)}
                  </Text>
                ) : (
                  <Text style={{ alignSelf: "center" }}>
                    {ShortTextComponent(item.nombre ?? item.NombreArea)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
