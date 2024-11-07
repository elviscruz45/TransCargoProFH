import { StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../../../utils/firebase";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./item.styles";
import { History } from "../../../components/search/History/History";
import { useRouter } from "expo-router";
import { Date as Dates } from "../../../components/search/History/Date";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { DateScreen } from "../../../components/search/DateScreen/DateScreen";
import { GanttHistorial } from "../../../components/search/Gantt/Gantt";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AvatarImg } from "./AvatarImg";

export default function Item() {
  const [post, setPost] = useState(null);
  const [serviceInfo, setServiceInfo] = useState();
  //global state management for the user_uid
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const user_email: string | null = useSelector(
    (state: RootState) => state.userId.email
  );

  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );

  //global state management for the user_uid
  const { item }: any = useLocalSearchParams();

  //Data about the company belong this event
  function capitalizeFirstLetter(str: string = "") {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const regex = /@(.+?)\./i;
  const router = useRouter();
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const [currentAsset]: any = assetList.filter(
    (asset: any) => asset.idFirebaseAsset === item
  );

  // const dispatch = useDispatch();
  // const currentDate = new Date();
  // const currentTimestamp = currentDate.getTime();
  // console.log("currentTimestamp", currentTimestamp);

  // Get the current date
  const currentDate = new Date();

  // Subtract 30 days from the current date
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);

  const [startDate, setStartDate] = useState(pastDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [removeFilter, setRemoveFilter] = useState(true);

  const handleResetAction = () => {
    // navigation.goBack();
  };
  //this function goes to another screen to get more detail about the service state
  const MoreDetail = () => {
    router.push({
      pathname: "/search/moreDetail",
      params: { item: item },
    });
  };
  //Using navigation.navigate I send it to another screen (post)
  const goToDocs = () => {
    router.push({
      pathname: "/search/files",
      params: { item: item },
    });
  };

  //Changing the value to activate again the filter to rende the posts
  const filter = (start: any, end: any) => {
    setStartDate(start);
    setEndDate(end);
  };

  const quitfilter = () => {
    // Subtract 30 days from the current date
    const datewithNoFilter = new Date();
    datewithNoFilter.setDate(currentDate.getDate() - 30);
    setRemoveFilter((prev) => !prev);
    setStartDate(datewithNoFilter);
    setEndDate(new Date());
  };

  useEffect(() => {
    let q;
    if (startDate && endDate) {
      async function fetchData() {
        q = query(
          collection(db, "Events"),
          orderBy("createdAt", "desc"),
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate),
          where("emailCompany", "==", emailCompany),
          where("idFirebaseAsset", "==", item)
        );

        try {
          const querySnapshot = await getDocs(q);
          const lista: any = [];
          querySnapshot.forEach((doc) => {
            const dataschema = {
              ...doc.data(),
              createdAt: doc.data().createdAt,
              fechaPostFormato: doc.data().fechaPostFormato,
              emailPerfil: doc.data().emailPerfil,
              time: "27 Ago",
              title: doc.data().tipoEvento,
              description: doc.data().comentarios,
              lineColor: "skyblue",
              icon: require("../../../assets/pictures/empresa.png"),
              imageUrl: doc.data().fotoUsuarioPerfil,
              idDocAITFirestoreDB: item,
              idEventFirebase: doc.data().idEventFirebase,
            };

            lista.push(dataschema);

            // lista.push(doc.data());
          });
          // console.log("lista+para esquema", lista);
          setPost(lista);

          // setPost(lista.slice(0, 100));
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }

      fetchData();
    }
  }, [startDate, endDate, item]);

  return (
    <ScrollView
      style={{ backgroundColor: "#020617" }} // Add backgroundColor here
      showsVerticalScrollIndicator={false}
    >
      <Text> </Text>

      <View style={[styles.row, styles.center]}>
        <View>
          <AvatarImg currentAsset={currentAsset} idAsset={item} />
        </View>
        <Text> </Text>

        <View style={{ ...(Platform.OS === "web" && { marginLeft: 20 }) }}>
          <Text style={styles.name}>{currentAsset?.nombre}</Text>

          {currentAsset?.tipoActivo === "Equipo / Activo" && (
            <>
              <Text style={styles.info}>
                {"Placa:"} {currentAsset?.placa}
              </Text>
              {/* <Text style={styles.info}>{"Tipo:"} sdfd</Text> */}
              <Text style={styles.info}>
                {"Kilometraje:"}
                {currentAsset?.kilometraje} {"Km"}
              </Text>
              <Text style={styles.info}>
                {"Cambio aceite Prox:"}
                {currentAsset?.cambioAceiteProx}
                {" Km"}
              </Text>
              <Text style={[styles.info, { color: "blue" }]}>
                {"Gasto Combustible:"} {currentAsset?.gastoCombustible} {"Gls"}
              </Text>
              <Text style={styles.info}>
                {"Rendimiento Combustible:"}{" "}
                {currentAsset?.redimientoCombustible}
                {"Gls/Km"}
              </Text>

              <Text style={styles.info}>
                {"Facturacion a la fecha:"} {"S/."}
                {currentAsset?.facturacionFleteYTD}
              </Text>
              <Text style={styles.info}>
                {"Servicios a la fecha:"} {currentAsset?.cantidadServiciosYTD}
              </Text>
              <Text style={styles.info}>
                {"Gastos a la fecha:"} {"S/."} {currentAsset?.gastosTotalYTD}
              </Text>
            </>
          )}
        </View>
      </View>
      <Text></Text>

      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          // alignItems: "center",
          // backgroundColor: "white",
          // justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.btnContainer4}
          onPress={() => MoreDetail()}
        >
          <Image
            source={require("../../../assets/pictures/more_information.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer4}
          onPress={() => goToDocs()}
        >
          <Image
            source={require("../../../assets/pictures/addFilesIcon.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
      </View>
      <Text></Text>

      <Text
        style={{
          marginLeft: 15,
          borderRadius: 5,
          fontWeight: "700",
          alignSelf: "center",
          color: "#DCDCDF",
        }}
      >
        Historial de Eventos
      </Text>
      <Text></Text>

      <DateScreen filterButton={filter} quitFilterButton={quitfilter} />

      <Text></Text>
      <GanttHistorial
        datas={post}
        // comentPost={(item) => comentPost(item)}
      />
    </ScrollView>
  );
}
