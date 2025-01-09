import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./headerAssets.styles";
import { Image as ImageExpo } from "expo-image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { useRouter } from "expo-router";
import { useState } from "react";

export function Reporte({ setAsset }: any) {
  const [selected, setSelected] = useState("");
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );

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
        style={{ backgroundColor: "white" }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setAsset(item?.idFirebaseAsset);
                setSelected(item?.idFirebaseAsset);
              }}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
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
                    borderWidth: selected === item?.idFirebaseAsset ? 3 : 0,
                    borderColor:
                      selected === item?.idFirebaseAsset ? "blue" : "",
                  }}
                />
                {item.placa ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      color: selected === item?.idFirebaseAsset ? "blue" : "",
                      fontWeight:
                        selected === item?.idFirebaseAsset ? "bold" : "400",
                    }}
                  >
                    {ShortTextComponent(item.placa)}
                  </Text>
                ) : (
                  <Text
                    style={{
                      alignSelf: "center",
                      color: selected === item?.idFirebaseAsset ? "blue" : "",
                      fontWeight:
                        selected === item?.idFirebaseAsset ? "bold" : "400",
                    }}
                  >
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
