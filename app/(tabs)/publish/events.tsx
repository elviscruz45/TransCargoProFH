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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";

// interface CurrentAsset {
//   image?: string;
//   // add other properties as needed
// }
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { dateFormat, useUserData, uploadImage, uploadPdf } from "./event.cal";
import { ChangeUnidadMedida } from "@/components/publish/forms/ChangeUnidadMedida/Selection";
import { ChangeMoneda } from "@/components/publish/forms/ChangeMoneda/Selection";
import { ChangeMantto } from "@/components/publish/forms/ChangeTipoMantto/Selection";
import { ChangePagado } from "@/components/publish/forms/ChangePagado/Selection";
import { ChangeIgv } from "@/components/publish/forms/ChangeIgv/Selection";
import { ChangeComprobante } from "@/components/publish/forms/ChangeTipoComprobante/Selection";
import { ChangeConductor } from "@/components/publish/forms/ChangeConductor/Selection";

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
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  const [shortNameFileUpdated, setShortNameFileUpdated] = useState("");
  const [shortNameFileUpdated2, setShortNameFileUpdated2] = useState("");

  //algorith to pick a pdf File to attach to the event
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.assets) {
        setShortNameFileUpdated(result?.assets[0]?.name);
        formik.setFieldValue("pdfFile", result?.assets[0]?.uri);
        formik.setFieldValue("FilenameTitle", result?.assets[0]?.name);
      } else {
        setShortNameFileUpdated("");
      }
    } catch (err) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al adjuntar el documento",
      });
    }
  };

  const pickDocument2 = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.assets) {
        setShortNameFileUpdated2(result?.assets[0]?.name);
        formik.setFieldValue("pdfFile2", result?.assets[0]?.uri);
        formik.setFieldValue("FilenameTitle2", result?.assets[0]?.name);
      } else {
        setShortNameFileUpdated2("");
      }
    } catch (err) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al adjuntar el documento",
      });
    }
  };

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

  // function capitalizeFirstLetter(str: string) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

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

        //manage the file 1
        let imageUrlPDF;
        if (newData.pdfFile) {
          const snapshotPDF = await uploadPdf(
            newData.pdfFile,
            newData.FilenameTitle,
            newData.fechaPostFormato,
            newData.emailCompany
          );
          const imagePathPDF = snapshotPDF?.metadata.fullPath ?? "";
          imageUrlPDF = await getDownloadURL(ref(getStorage(), imagePathPDF));
        }

        newData.pdfPrincipal = imageUrlPDF || "";
        newData.pdfFile = "";
        console.log("111111");

        //manage the file 2
        let imageUrlPDF2;
        if (newData.pdfFile2) {
          const snapshotPDF2 = await uploadPdf(
            newData.pdfFile2,
            newData.FilenameTitle2,
            newData.fechaPostFormato,
            newData.emailCompany
          );
          const imagePathPDF2 = snapshotPDF2?.metadata.fullPath ?? "";
          imageUrlPDF2 = await getDownloadURL(ref(getStorage(), imagePathPDF2));
        }

        newData.pdfPrincipal2 = imageUrlPDF2 || "";
        newData.pdfFile2 = "";

        // upload the photo or an pickimage to firebase Storage
        const snapshot = await uploadImage(photoUri, newData.emailCompany);

        const imagePath = snapshot.metadata.fullPath;

        const imageUrl = await getDownloadURL(ref(getStorage(), imagePath));

        newData.fotoPrincipal = imageUrl;
        newData.photoAssetURL = asset?.photoServiceURL;
        console.log("2222");

        //Nombre
        newData.nombreAsset = asset?.nombre;
        newData.fechaPostFormato = formattedDate;

        //Kilometraje de mantenimiento
        newData.kilometrajeMantto = currentAsset?.kilometraje ?? 0;
        newData.cambioAceiteProx = currentAsset?.cambioAceiteProx ?? 0;
        newData.cambioAceiteCajaProx = currentAsset?.cambioAceiteCajaProx ?? 0;
        newData.cambioAceiteDifProx = currentAsset?.cambioAceiteDifProx ?? 0;
        newData.cambioHidrolinaProx = currentAsset?.cambioHidrolinaProx ?? 0;
        newData.cambioRefrigeranteProx =
          currentAsset?.cambioRefrigeranteProx ?? 0;
        newData.cambioFiltrosProx = currentAsset?.cambioFiltrosProx ?? 0;

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
        console.log("33333");

        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName = companyName || "Anonimo";
        //Uploading data to Firebase and adding the ID firestore
        const docRef = doc(collection(db, "Events"));
        newData.idEventFirebase = docRef.id;
        console.log("444");

        await setDoc(docRef, newData);
        console.log("555");

        router.push({
          pathname: "/publish",
          // params: { item: item },
        });
        router.push({
          pathname: "/home",
          // params: { item: item },
        });

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha subido correctamente",
        });
      } catch (error) {
        console.log("Error al tratar de subir estos datos", error);
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
        <MapForm onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "tipoEvento") {
      setRenderComponent(
        <ChangeEvent onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "tipoComprobante") {
      setRenderComponent(
        <ChangeComprobante onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "tipoGasto") {
      setRenderComponent(
        <ChangeTipoGasto onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "unidadMedida") {
      setRenderComponent(
        <ChangeUnidadMedida onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "moneda") {
      setRenderComponent(
        <ChangeMoneda onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "tipoMantto") {
      setRenderComponent(
        <ChangeMantto onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "facturaPagada") {
      setRenderComponent(
        <ChangePagado onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "nombreConductor") {
      setRenderComponent(
        <ChangeConductor onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "igv") {
      setRenderComponent(
        <ChangeIgv onClose={onCloseOpenModal} formik={formik} />
      );
    }

    onCloseOpenModal();
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

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

  // // Still loading or checking permission
  // if (permission === null) {
  //   return <Text style={{ textAlign: "center" }}>Necesitamoss</Text>;
  // }

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

  console.log("sfasd");

  return (
    <KeyboardAwareScrollView
      style={
        Platform.OS === "web"
          ? { backgroundColor: "white", flex: 1 }
          : { backgroundColor: "white", flex: 1 }
      } // Add backgroundColor here
      // showsVerticalScrollIndicator={false}
    >
      <Text> </Text>

      {/* <Text style={styles.name}>{currentAsset.nombre}</Text> */}
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
        <Text> </Text>
        <Text> </Text>
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
            inputStyle={{ color: "grey" }}
            onChangeText={(text) => {
              formik.setFieldValue("comentarios", text);
            }} // errorMessage={formik.errors.observacion}
          />
        </View>
      </View>

      <Text> </Text>

      <View style={styles.content}>
        {formik.values.tipoEvento === "1. Inicio Viaje" && (
          <>
            {Platform.OS === "web" && (
              <View style={{ marginHorizontal: 10 }}>
                <Text> </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Fecha de Viaje
                </Text>
                <Text> </Text>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={(event: any) => {
                    const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                    const [year, month, day] = selectedDateString.split("-");
                    const selectedDate = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day)
                    ); // month is 0-indexed in JavaScript Date
                    formik.setFieldValue("fechaContable", selectedDate);
                  }}
                />
                <Text> </Text>
                <Text> </Text>
              </View>
            )}
            <Input
              value={formik.values.tipoCarga}
              label="Nombre del material de que se transporta"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("tipoCarga", text);
              }}
            />
            <Input
              value={formik.values.clienteNombre}
              label="Nombre del Cliente"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("clienteNombre", text);
              }}
            />
            <Input
              value={formik.values.guiaRemitente.toString()}
              label="Guia de Remitente"
              // placeholder="Visibilidad del evento"
              editable={true}
              onChangeText={(text) => {
                formik.setFieldValue("guiaRemitente", text);
              }}
            />
            <Input
              value={formik.values.guiTransportista.toString()}
              label="Guia de Transportista"
              // placeholder="Visibilidad del evento"
              editable={true}
              onChangeText={(text) => {
                formik.setFieldValue("guiTransportista", text);
              }}
            />
            <Input
              value={formik.values.kilometraje}
              label="Kilometraje (Km)"
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");

                formik.setFieldValue("kilometraje", numericText);
              }}
            />
            <Input
              value={formik.values.puntoInicio}
              label="Punto de Inicio"
              onChangeText={(text) => {
                formik.setFieldValue("puntoInicio", text);
              }}
            />
            <Input
              value={formik.values.puntoLlegada}
              label="Punto de Llegada"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("puntoLlegada", text);
              }}
            />
            <Input
              value={formik.values.numeroFactura.toString()}
              label="Numero de Factura"
              // placeholder="Visibilidad del evento"
              editable={true}
              onChangeText={(text) => {
                formik.setFieldValue("numeroFactura", text);
              }}
            />
            <Input
              value={formik.values.cantidad.toString()}
              label="Cantidad de Carga"
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, "");
                formik.setFieldValue("cantidad", numericText);
              }}
            />
            <Input
              value={formik.values.unidadMedida}
              label="Unidad de Medida de la carga"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("unidadMedida"),
              }}
            />
            <Input
              value={formik.values.precioUnitario.toString()}
              label="Precio Unitario"
              // placeholder="Visibilidad del evento"
              editable={true}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, "");

                formik.setFieldValue("precioUnitario", numericText);
              }}
            />
            <Input
              value={formik?.values?.nombreConductor}
              label="Nombre del conductor"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("nombreConductor"),
              }}
            />
            <Input
              value={formik.values.moneda.toString()}
              label="Moneda"
              // placeholder="Visibilidad del evento"
              editable={true}
              // keyboardType="numeric"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("moneda"),
              }}
            />
            <Input
              value={formik.values.igv.toString()}
              label="IGV"
              // placeholder="Visibilidad del evento"
              editable={true}
              keyboardType="numeric"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("igv"),
              }}
            />
            <Input
              value={formik.values.facturaPagada}
              label="Factura Pagada?"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("facturaPagada"),
              }}
            />
            {Platform.OS === "web" && (
              <View style={{ marginHorizontal: 10 }}>
                <Text> </Text>

                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}
                >
                  Fecha de pago de la factura
                </Text>
                <Text> </Text>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={(event: any) => {
                    const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                    const [year, month, day] = selectedDateString.split("-");
                    const selectedDate = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day)
                    ); // month is 0-indexed in JavaScript Date
                    formik.setFieldValue("fechadePago", selectedDate);
                  }}
                />
                <Text> </Text>
                <Text> </Text>
              </View>
            )}
            <Input
              value={formik.values.carroceria}
              label="Placa Carroceria"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("carroceria", text);
              }}
            />

            <Input
              value={formik.values.clienteRUC}
              label="Cliente RUC de la carga"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("clienteRUC", text);
              }}
            />
          </>
        )}

        {formik.values.tipoEvento === "2. Egreso" && (
          <>
            {Platform.OS === "web" && (
              <View style={{ marginHorizontal: 10 }}>
                <Text> </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Fecha de Viaje
                </Text>
                <Text> </Text>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={(event: any) => {
                    const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                    const [year, month, day] = selectedDateString.split("-");
                    const selectedDate = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day)
                    ); // month is 0-indexed in JavaScript Date
                    formik.setFieldValue("fechaContable", selectedDate);
                  }}
                />
                <Text> </Text>
                <Text> </Text>
              </View>
            )}
            <Input
              value={formik.values.kilometraje}
              label="Kilometraje (Km)"
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");

                formik.setFieldValue("kilometraje", numericText);
              }}
            />
            <Input
              value={formik.values.descripcionGasto}
              label="Descripcion del gasto"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("descripcionGasto", text);
              }}
            />
            <Input
              value={formik.values.clienteNombre}
              label="Nombre del proveedor"
              // keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("clienteNombre", text);
              }}
            />

            {/* <Input
              label=" Combustible (Galones.)"
              value={formik.values.combustible.toString()}
              editable={true}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, "");

                formik.setFieldValue("combustible", numericText);
              }}
              // errorMessage={formik.errors.visibilidad}
            /> */}

            <Input
              value={formik.values.tipoGasto}
              label="Tipo de Gasto"
              // placeholder="Titulo del Evento"
              multiline={true}
              editable={true}
              // errorMessage={formik.errors.tipoEvento}
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("tipoGasto"),
              }}
            />

            <Input
              value={formik.values.cantidad.toString()}
              label="Cantidad "
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, "");

                formik.setFieldValue("cantidad", numericText);
              }}
            />

            <Input
              value={formik.values.unidadMedida}
              label="Unidad de Medida"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("unidadMedida"),
              }}
            />

            <Input
              value={formik.values.precioUnitario.toString()}
              label="Precio Unitario"
              // placeholder="Visibilidad del evento"
              editable={true}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, "");

                formik.setFieldValue("precioUnitario", numericText);
              }}
            />
            <Input
              value={formik.values.moneda.toString()}
              label="Moneda"
              // placeholder="Visibilidad del evento"
              editable={true}
              // keyboardType="numeric"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("moneda"),
              }}
            />

            <Input
              value={formik.values.tipoComprobante.toString()}
              label="Tipo de Comprobante"
              // placeholder="Visibilidad del evento"
              editable={true}
              // keyboardType="numeric"
              // onChangeText={(text) => {
              //   formik.setFieldValue("tipoComprobante", text);
              // }}
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("tipoComprobante"),
              }}
            />
            <Input
              value={formik.values.numeroFactura.toString()}
              label="Numero de Factura"
              // placeholder="Visibilidad del evento"
              editable={true}
              onChangeText={(text) => {
                formik.setFieldValue("numeroFactura", text);
              }}
            />
            <Input
              value={formik.values.costo.toString()}
              label="Valor del Monto"
              // placeholder="Visibilidad del evento"
              editable={true}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, "");

                formik.setFieldValue("costo", numericText);
              }}
            />
            <Input
              value={formik.values.moneda.toString()}
              label="Moneda"
              // placeholder="Visibilidad del evento"
              editable={true}
              // keyboardType="numeric"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("moneda"),
              }}
            />
          </>
        )}

        {formik.values.tipoEvento === "3. Mantenimiento" && (
          <>
            {Platform.OS === "web" && (
              <View style={{ marginHorizontal: 10 }}>
                <Text> </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Fecha de Matenimiento
                </Text>
                <Text> </Text>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={(event: any) => {
                    const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                    const [year, month, day] = selectedDateString.split("-");
                    const selectedDate = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day)
                    ); // month is 0-indexed in JavaScript Date
                    formik.setFieldValue("fechaContable", selectedDate);
                  }}
                />
                <Text> </Text>
                <Text> </Text>
              </View>
            )}
            <Input
              value={formik.values.kilometraje}
              label="Kilometraje (Km)"
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");

                formik.setFieldValue("kilometraje", numericText);
              }}
            />

            <Input
              value={formik.values.tipoMantto.toString()}
              label="Tipo de Mantenimiento"
              // placeholder="Visibilidad del evento"
              editable={true}
              // keyboardType="numeric"
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("tipoMantto"),
              }}
            />

            {(formik.values.tipoMantto === "Cambio de Llanta" ||
              formik.values.tipoMantto === "Reparacion de Llanta") && (
              <Input
                value={
                  tires.length !== 0 ? "Formulario llenado" : "Formulario vacio"
                }
                // placeholder="Aprobador"
                style={{ color: tires.length !== 0 ? "blue" : "red" }}
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

            <Input
              value={formik.values.repuesto.toString()}
              label="Repuesto o Consumible"
              // placeholder="Visibilidad del evento"
              editable={true}
              onChangeText={(text) => {
                formik.setFieldValue("repuesto", text);
              }}
              // errorMessage={formik.errors.visibilidad}
            />
          </>
        )}

        <Input
          value={shortNameFileUpdated}
          placeholder="Adjuntar PDF"
          multiline={true}
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              pickDocument();
            },
          }}
        />
        <Input
          value={shortNameFileUpdated2}
          placeholder="Adjuntar PDF 2"
          multiline={true}
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              pickDocument2();
            },
          }}
        />
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
