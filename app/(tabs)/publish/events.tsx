import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { Image as ImageExpo } from "expo-image";
import { Avatar, Button, Input } from "@rneui/themed";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
import { styles } from "./events.styles";
import { Modal } from "../../../components/shared/Modal";
import { MapForm } from "../../../components/publish/forms/map/mapForm";
import { initialValues, validationSchema } from "./events.data";
import { ChangeEvent } from "../../../components/publish/forms/ChangeEvent/Selection";
import { ChangeTipoGasto } from "@/components/publish/forms/ChangeTipoGasto/Selection";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
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
import { db } from "../../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import type { CurrentAsset } from "../../../types/publish";
import { uploadTires } from "../../../slices/publish";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// interface CurrentAsset {
//   image?: string;
//   // add other properties as needed
// }
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { dateFormat, useUserData, uploadImage } from "./event.cal";

export default function events(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [ubicacion, setUbicacion] = useState<Location.LocationObject | null>(
    null
  );
  const [evento, setEvento] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [tipoGasto, setTipoGasto] = useState<string | null>(null);
  const [permission, setPermission] = useState<string | null>(null); // To store permission status
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const tires: any =
    useSelector((state: RootState) => state.publish.tires) ?? [];
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

  const userType =
    useSelector((state: RootState) => state.userId.userType) ?? "";

  //global state management for the user_uid
  const dispatch = useDispatch();
  const currentAsset: CurrentAsset | any = useSelector(
    (state: RootState) => state.publish.asset
  );
  const photoUri =
    useSelector((state: RootState) => state.publish.cameraUri) ?? "";
  const asset: any =
    useSelector((state: RootState) => state.publish.asset) ?? "";

  // const name = useSelector((state: RootState) => state.userId.displayName);
  // const user_email = useSelector((state: RootState) => state.userId.email);
  // const companyName = useSelector(
  //   (state: RootState) => state.userId.companyName
  // );

  // const [gpsPermission, setGpsPermission] = useState(false);
  useEffect(() => {
    dispatch(uploadTires([]));
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission("granted");
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error requesting location permission", error);
      setErrorMsg("Failed to request location permission");
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     // setLocation(location);
  //     formik.setFieldValue("ubicacion", location);
  //   })();
  // }, []);

  useEffect(() => {
    const checkPermission = async () => {
      let location = await Location.getCurrentPositionAsync();
      formik.setFieldValue("ubicacion", location);
      setPermission("granted");
    };
    checkPermission();
  }, []);

  useEffect(() => {
    if (formik.values.llanta.length !== 0) {
      formik.setFieldValue("llanta", tires);
    }
  }, [tires]);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(1);

      try {
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

        newData.emailCompany = emailCompany || "Anonimo";

        // upload the photo or an pickimage to firebase Storage
        const snapshot = await uploadImage(photoUri, newData.emailCompany);

        const imagePath = snapshot.metadata.fullPath;

        const imageUrl = await getDownloadURL(ref(getStorage(), imagePath));

        newData.fotoPrincipal = imageUrl;
        newData.photoAssetURL = asset?.photoServiceURL;

        //Nombre
        newData.nombreAsset = asset?.nombre;
        newData.fechaPostFormato = formattedDate;

        //Photo Events
        newData.userType = userType;

        //Photo of the profile
        newData.photoProfileURL = photoURL;
        //Data about information profile and company
        newData.emailPerfil = email || "Anonimo";
        newData.llanta = tires || [];
        newData.nombrePerfil = displayName || "Anonimo";
        newData.idFirebaseAsset = currentAsset?.idFirebaseAsset;
        newData.placa = currentAsset?.placa;

        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName = companyName || "Anonimo";
        //Uploading data to Firebase and adding the ID firestore
        const docRef = doc(collection(db, "Events"));
        newData.idEventFirebase = docRef.id;

        await setDoc(docRef, newData);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha subido correctamente",
        });
        router.back();
        router.push({
          pathname: "/home",
          // params: { item: item },
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
    },
  });
  const selectComponent = (key: string) => {
    if (key === "ubicacion") {
      setRenderComponent(
        <MapForm
          onClose={onCloseOpenModal}
          formik={formik}
          setUbicacion={setUbicacion}
        />
      );
    }
    if (key === "tipoEvento") {
      setRenderComponent(
        <ChangeEvent
          onClose={onCloseOpenModal}
          formik={formik}
          setEvento={setEvento}
        />
      );
    }
    if (key === "tipoGasto") {
      setRenderComponent(
        <ChangeTipoGasto
          onClose={onCloseOpenModal}
          formik={formik}
          setTipoGasto={setTipoGasto}
        />
      );
    }
    onCloseOpenModal();
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  // Still loading or checking permission
  if (permission === null) {
    return <View />;
  }

  // Permission denied
  if (!permission) {
    return (
      // <View style={styles.container}>
      <View>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tu permiso para acceder a tu ubicación
        </Text>
        <Button onPress={requestPermission} title="Conceder Permiso" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white", flex: 1 }} // Add backgroundColor here
      // showsVerticalScrollIndicator={false}
    >
      <Text></Text>

      <Text style={styles.name}>{currentAsset.nombre}</Text>
      {currentAsset.placa ? (
        <Text style={styles.name}>
          {"Placa: "}
          {currentAsset.placa}
        </Text>
      ) : currentAsset.nombre ? (
        <Text style={[styles.name, { alignSelf: "center" }]}>
          {currentAsset.nombre}
        </Text>
      ) : (
        <Text style={[styles.name, { alignSelf: "center" }]}>
          {currentAsset.NombreArea}
        </Text>
      )}
      <View style={styles.equipments}>
        <ImageExpo
          source={
            currentAsset
              ? { uri: currentAsset.photoServiceURL }
              : require("../../../assets/assetpics/carIcon.jpg")
          }
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      </View>

      <View style={styles.equipments}>
        <ImageExpo
          source={
            photoUri
              ? { uri: photoUri }
              : require("../../../assets/assetpics/carIcon.jpg")
          }
          style={styles.postPhoto}
        />
        <View>
          <Input
            value={formik.values.tipoEvento}
            label="Tipo de Evento"
            // placeholder="Titulo del Evento"
            multiline={true}
            editable={true}
            errorMessage={formik.errors.tipoEvento}
            rightIcon={{
              type: "material-community",
              color: "#c2c2c2",
              name: "clipboard-list-outline",
              onPress: () => selectComponent("tipoEvento"),
            }}
          />
          <Input
            label="Comentarios"
            value={formik.values.comentarios}
            // placeholder="Comentarios"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChangeText={(text) => {
              formik.setFieldValue("comentarios", text);
            }} // errorMessage={formik.errors.observacion}
          />
        </View>
      </View>

      <View>
        <View style={styles.content}>
          {(formik.values.tipoEvento === "Inicio Viaje" ||
            formik.values.tipoEvento === "Final Viaje" ||
            formik.values.tipoEvento === "Gastos de Viaje" ||
            formik.values.tipoEvento === "Combustible" ||
            formik.values.tipoEvento === "Cambio de aceite" ||
            formik.values.tipoEvento === "CheckList" ||
            formik.values.tipoEvento === "Mantenimiento" ||
            formik.values.tipoEvento === "Cambio Llanta" ||
            formik.values.tipoEvento === "Reparacion Llanta" ||
            formik.values.tipoEvento === "Cambio Repuesto" ||
            formik.values.tipoEvento === "Reporte Varios") && (
            <Input
              value={formik.values.kilometraje}
              label="Kilometraje (Km)"
              keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("kilometraje", text);
              }}
            />
          )}

          {formik.values.tipoEvento === "Combustible" && (
            <Input
              label=" Combustible (Galones.)"
              value={formik.values.combustible.toString()}
              editable={true}
              keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("combustible", text);
              }}
              // errorMessage={formik.errors.visibilidad}
            />
          )}

          {/* {userType === "Facturacion" && (
            <Input
              value={formik.values.facturacionFlete.toString()}
              label="Costo Flete (S/.)"
              editable={true}
              keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("facturacionFlete", text);
              }}
            />
          )} */}

          {(formik.values.tipoEvento === "Cambio Llanta" ||
            formik.values.tipoEvento === "Reparacion Llanta") && (
            <Input
              value={
                tires.length !== 0 ? "Formulario llenado" : "Formulario vacio"
              }
              style={{ color: tires.length !== 0 ? "blue" : "red" }}
              // placeholder="Aprobador"

              label="Llanta"
              editable={false}
              multiline={true}
              // errorMessage={formik.errors.aprobacion}
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",

                name: "car-tire-alert",
                onPress: () => {
                  router.push({
                    pathname: "/(modals)/tires",
                    params: { item: currentAsset?.idFirebaseAsset },
                  });
                  // selectComponent("llanta")
                },
              }}
            />
          )}

          {(formik.values.tipoEvento === "Mantenimiento" ||
            formik.values.tipoEvento === "Cambio Repuesto") && (
            <Input
              value={formik.values.repuesto.toString()}
              label="Repuesto"
              // placeholder="Visibilidad del evento"
              editable={true}
              onChangeText={(text) => {
                formik.setFieldValue("repuesto", text);
              }}
              // errorMessage={formik.errors.visibilidad}
            />
          )}

          {(formik.values.tipoEvento === "Gastos de Viaje" ||
            formik.values.tipoEvento === "Combustible" ||
            formik.values.tipoEvento === "Cambio de aceite" ||
            formik.values.tipoEvento === "Mantenimiento" ||
            formik.values.tipoEvento === "Cambio Llanta" ||
            formik.values.tipoEvento === "Reparacion Llanta" ||
            formik.values.tipoEvento === "Cambio Repuesto" ||
            formik.values.tipoEvento === "Facturacion de Servicio" ||
            formik.values.tipoEvento === "Pago Servicios" ||
            formik.values.tipoEvento === "Compra Repuesto" ||
            formik.values.tipoEvento === "Otro") && (
            <>
              <Input
                value={formik.values.tipoGasto}
                label="Tipo"
                // placeholder="Titulo del Evento"
                multiline={true}
                editable={true}
                errorMessage={formik.errors.tipoEvento}
                rightIcon={{
                  type: "material-community",
                  color: "#c2c2c2",
                  name: "clipboard-list-outline",
                  onPress: () => selectComponent("tipoGasto"),
                }}
              />
              <Input
                value={formik.values.costo.toString()}
                label="Monto (S/.)"
                // placeholder="Visibilidad del evento"
                editable={true}
                keyboardType="numeric"
                onChangeText={(text) => {
                  formik.setFieldValue("costo", text);
                }}
                // errorMessage={formik.errors.visibilidad}
              />
            </>
          )}

          {/* {(formik.values.tipoEvento === "Inicio Viaje" ||
            formik.values.tipoEvento === "Final Viaje" ||
            formik.values.tipoEvento === "Gastos de Viaje" ||
            formik.values.tipoEvento === "Combustible" ||
            formik.values.tipoEvento === "Cambio de aceite" ||
            formik.values.tipoEvento === "CheckList" ||
            formik.values.tipoEvento === "Mantenimiento" ||
            formik.values.tipoEvento === "Cambio Llanta" ||
            formik.values.tipoEvento === "Reparacion Llanta" ||
            formik.values.tipoEvento === "Cambio Repuesto" ||
            formik.values.tipoEvento === "Reporte Varios") && (
            <Input
              // value={true ? `${avance} %` : null}
              value={JSON.stringify(formik.values.ubicacion)}
              label="Ubicacion"
              // onChangeText={(text) => {
              //   formik.setFieldValue("ubicacion", JSON.stringify(location));
              // }}
              // placeholder="Avance del ejecucion"
              editable={false}
              multiline={true}
              errorMessage={formik.errors.ubicacion}
              rightIcon={
                Platform.OS !== "web"
                  ? {
                      type: "material-community",
                      name: "map-marker-radius",
                      color: "#c2c2c2",
                      onPress: () => selectComponent("ubicacion"),
                    }
                  : {}
              }
            />
          )} */}
        </View>
      </View>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
      <Button
        title="Agregar Evento"
        buttonStyle={styles.addInformation}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}
