import React, { useState } from "react";
import { Avatar, Icon } from "@rneui/themed";
import { Image as ImageExpo } from "expo-image";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import Toast from "react-native-toast-message";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "@/supabase/client";

export const AvatarImg = ({ currentAsset, idAsset }: any) => {
  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.canceled) uploadImage(result.assets[0].uri);
  };
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = `${emailCompany}/pdfPost/assets/${idAsset}`;
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("assets_documents")
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) throw error;

    // Get Public URL
    const publicUrlImage = supabase.storage
      .from("assets_documents")
      .getPublicUrl(fileName).data.publicUrl;

    console.log("Public URL:", publicUrlImage);
    const { data: dataAsset, error: dataError } = await supabase
      .from("assets")
      .update({ photoServiceURL: publicUrlImage })
      .eq("id", idAsset)
      .select();

    Toast.show({
      type: "success",
      text1: "Imagen Actualizada",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  const editPhoto = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Estas Seguro que deseas cambiar de Imagen?"
      );
      if (confirmed) {
        changeAvatar();
      }
    } else {
      Alert.alert(
        "Editar",
        "Estas Seguro que deseas cambiar de Imagen?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              changeAvatar();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={emailCompany === user_email ? () => editPhoto() : () => {}}
    >
      <ImageExpo
        source={
          currentAsset?.photoServiceURL
            ? { uri: currentAsset.photoServiceURL }
            : require("../../../assets/assetpics/truckIcon.png")
        }
        style={{
          // alignContent: "center",
          marginLeft: "5%",
          marginTop: "5%",
          width: 80,
          height: 80,
          borderRadius: 80,
          // alignSelf: "center",
        }}
      />
    </TouchableOpacity>
  );
};
