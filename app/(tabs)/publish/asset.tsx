import { View, Text, ScrollView } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./asset.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./asset.data";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
// import { saveActualPostFirebase } from "../../../actions/post";
// import { db } from "../../../utils";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
  setDoc,
} from "firebase/firestore";
// import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
// import { areaLists } from "../../../utils/areaList";
// import { saveTotalUsers } from "../../../actions/post";
import Toast from "react-native-toast-message";
import { Image as ImageExpo } from "expo-image";
import { AssetForm } from "../../../components/publish/forms/AssetForm/Asset";
import { useRouter, Redirect } from "expo-router";
import { supabase } from "@/supabase/client";

export default function Asset(props: any) {
  const emptyimage = require("../../../assets/assetpics/freight02.jpeg");
  // const navigation = useNavigation();
  const [nombre, setNombre] = useState();
  const router = useRouter();
  const email = useSelector((state: RootState) => state.userId.email) ?? "";
  const emailCompany =
    useSelector((state: RootState) => state.userId.emailCompany) ?? "";
  const photoURL =
    useSelector((state: RootState) => state.userId.photoURL) ?? "";
  const displayName =
    useSelector((state: RootState) => state.userId.displayName) ?? "";
  const companyName =
    useSelector((state: RootState) => state.userId.companyName) ?? "";

  // find Index of areaList array where there is the image of the area to render the icon Avatar

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;

        //Data about date time format
        const date = new Date();
        const monthNames = [
          "ene.",
          "feb.",
          "mar.",
          "abr.",
          "may.",
          "jun.",
          "jul.",
          "ago.",
          "sep.",
          "oct.",
          "nov.",
          "dic.",
        ];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
        newData.fechaPostFormato = formattedDate;

        //Photo of the service
        newData.photoServiceURL = "";
        //Data about information profile and company
        newData.emailPerfil = email || "Anonimo";
        newData.nombrePerfil = displayName || "Anonimo";
        newData.emailCompany = emailCompany || "Anonimo";
        newData.companyName = companyName || "Anonimo";

        // //Uploading data to Firebase and adding the ID firestore
        // const docRef = doc(collection(db, "Asset"));
        // newData.idFirebaseAsset = docRef.id;
        // await setDoc(docRef, newData);

        // const otherData = {
        //   tipoActivo: "hola",
        //   nombre: "df",
        //   // reporte: "sss",
        // };
        //----------SUPABASE-------------
        const { data, error } = await supabase
          .from("assets")
          .insert([newData])
          .select();

        if (error) {
          console.error("Error inserting data:", error);
        } else {
          console.log("Insert successful:", data);
        }
        //----------SUPABASE-------------

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha subido correctamente",
        });

        router.replace("/(tabs)/publish/");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <View style={{ alignSelf: "center" }}>
        <ImageExpo
          source={require("../../../assets/assetpics/truckIcon.png")}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
        <Text style={styles.name}>{nombre || "Nombre del activo"}</Text>
      </View>

      <View style={styles.sectionForms}></View>
      <AssetForm formik={formik} setNombre={setNombre} />

      <Button
        title="Agregar"
        buttonStyle={styles.addInformation}
        onPress={() => formik.handleSubmit()}
        // onPress={(event: GestureResponderEvent) => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}
