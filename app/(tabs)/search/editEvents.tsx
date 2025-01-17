import { Avatar, Button, Input } from "@rneui/themed";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { Text, View } from "react-native";
import { styles } from "./editEvents.styles";
import { Modal } from "../../../components/shared/Modal";
import { MapForm } from "../../../components/publish/forms/map/mapForm";
import { initialValues, validationSchema } from "./editEvents.data";
import { ChangeEvent } from "../../../components/publish/forms/ChangeEvent/Selection";
import * as Location from "expo-location";
import { ChangeTipoGasto } from "@/components/publish/forms/ChangeTipoGasto/Selection";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import * as DocumentPicker from "expo-document-picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  dateFormat,
  useUserData,
  uploadImage,
  uploadPdf,
} from "./editEvent.cal";
import { ChangeUnidadMedida } from "@/components/publish/forms/ChangeUnidadMedida/Selection";
import { ChangeMoneda } from "@/components/publish/forms/ChangeMoneda/Selection";
import { ChangeConductor } from "@/components/publish/forms/ChangeConductor/Selection";
import { ChangeComprobante } from "@/components/publish/forms/ChangeTipoComprobante/Selection";
import { ChangeMantto } from "@/components/publish/forms/ChangeTipoMantto/Selection";
import { ChangePagado } from "@/components/publish/forms/ChangePagado/Selection";
import { ChangeEnViaje } from "@/components/publish/forms/ChangeEnViaje/Selection";
import { ChangeIgv } from "@/components/publish/forms/ChangeIgv/Selection";
import { ChangeLavadoyEngrase } from "@/components/publish/forms/ChangeLavadoyEngrase/Selection";

export default function editEvents(props: any) {
  //global state management for the user_uid
  const router = useRouter();
  const {
    idEventFirebase,
    fechaPostFormato,
    nombreAsset,
    placa,
    tipoEvento,
  }: any = useLocalSearchParams();
  console.log("tipoEvento", tipoEvento);
  //----------------------------------------------------------------------------------
  const [showModal, setShowModal] = useState(false);
  const [shortNameFileUpdated, setShortNameFileUpdated] = useState("");
  const [shortNameFileUpdated2, setShortNameFileUpdated2] = useState("");

  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const tires: any =
    useSelector((state: RootState) => state.publish.tires) ?? [];
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
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

  //global state management for the user_uid
  const dispatch = useDispatch();
  const currentAsset: CurrentAsset | any = useSelector(
    (state: RootState) => state.publish.asset
  );

  useEffect(() => {
    if (formik.values.llanta.length !== 0) {
      formik.setFieldValue("llanta", tires);
    }
  }, [tires]);

  // console.log("formik.values", formik.values.llanta);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik

        const newData = formValue;
        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        const RefFirebaseLasEventPostd = doc(db, "Events", idEventFirebase);
        const updateData: any = {};
        if (newData?.tipoEvento) {
          updateData.tipoEvento = newData.tipoEvento;
        }
        if (newData?.comentarios) {
          updateData.comentarios = newData.comentarios;
        }
        if (newData?.kilometraje) {
          updateData.kilometraje = newData.kilometraje;
        }
        if (newData?.combustible) {
          updateData.combustible = newData.combustible;
        }
        if (newData?.facturacionFlete) {
          updateData.facturacionFlete = newData.facturacionFlete;
        }
        if (tires) {
          updateData.llanta = tires;
        }
        if (newData?.repuesto) {
          updateData.repuesto = newData.repuesto;
        }
        if (newData?.costoMantenimiento) {
          updateData.costoMantenimiento = newData.costoMantenimiento;
        }
        if (newData?.costo) {
          updateData.costo = newData.costo;
        }
        if (newData?.tipoGasto) {
          updateData.tipoGasto = newData.tipoGasto;
        }
        if (newData?.numeroFactura) {
          updateData.numeroFactura = newData.numeroFactura;
        }
        if (newData?.guiaRemitente) {
          updateData.guiaRemitente = newData.guiaRemitente;
        }
        if (newData?.guiTransportista) {
          updateData.guiTransportista = newData.guiTransportista;
        }
        if (newData?.carroceria) {
          updateData.carroceria = newData.carroceria;
        }
        if (newData?.cantidad) {
          updateData.cantidad = newData.cantidad;
        }
        if (newData?.unidadMedida) {
          updateData.unidadMedida = newData.unidadMedida;
        }
        if (newData?.tipoCarga) {
          updateData.tipoCarga = newData.tipoCarga;
        }
        if (newData?.puntoInicio) {
          updateData.puntoInicio = newData.puntoInicio;
        }
        if (newData?.puntoLlegada) {
          updateData.puntoLlegada = newData.puntoLlegada;
        }
        if (newData?.clienteRUC) {
          updateData.clienteRUC = newData.clienteRUC;
        }
        if (newData?.tipoComprobante) {
          updateData.tipoComprobante = newData.tipoComprobante;
        }
        if (newData?.moneda) {
          updateData.moneda = newData.moneda;
        }
        if (newData?.clienteNombre) {
          updateData.clienteNombre = newData.clienteNombre;
        }

        //manage the file 1
        let imageUrlPDF;
        if (newData.pdfFile) {
          const snapshotPDF = await uploadPdf(
            newData.pdfFile,
            newData.FilenameTitle,
            fechaPostFormato,
            emailCompany as string
          );
          const imagePathPDF = snapshotPDF?.metadata.fullPath ?? "";
          imageUrlPDF = await getDownloadURL(ref(getStorage(), imagePathPDF));
        }

        newData.pdfPrincipal = imageUrlPDF || "";
        newData.pdfFile = "";

        if (newData.FilenameTitle) {
          updateData.FilenameTitle = newData.FilenameTitle;
        }
        if (newData.pdfPrincipal) {
          updateData.pdfPrincipal = newData.pdfPrincipal;
        }
        //manage the file 2
        let imageUrlPDF2;
        if (newData.pdfFile2) {
          const snapshotPDF2 = await uploadPdf(
            newData.pdfFile2,
            newData.FilenameTitle2,
            fechaPostFormato,
            emailCompany as string
          );
          const imagePathPDF2 = snapshotPDF2?.metadata.fullPath ?? "";
          imageUrlPDF2 = await getDownloadURL(ref(getStorage(), imagePathPDF2));
        }

        newData.pdfPrincipal2 = imageUrlPDF2 || "";
        newData.pdfFile2 = "";

        if (newData.FilenameTitle2) {
          updateData.FilenameTitle2 = newData.FilenameTitle2;
        }
        if (newData.pdfPrincipal2) {
          updateData.pdfPrincipal2 = newData.pdfPrincipal2;
        }
        //continua ...
        if (newData.descripcionGasto) {
          updateData.descripcionGasto = newData.descripcionGasto;
        }

        if (newData.fechaContable) {
          updateData.fechaContable = newData.fechaContable;
        }
        if (newData.pagoConductor) {
          updateData.pagoConductor = newData.pagoConductor;
        }
        if (newData.nombreConductor) {
          updateData.nombreConductor = newData.nombreConductor;
        }

        if (newData.tipoMantto) {
          updateData.tipoMantto = newData.tipoMantto;
        }
        if (newData.precioUnitario) {
          updateData.precioUnitario = newData.precioUnitario;
        }
        if (newData.facturaPagada) {
          updateData.facturaPagada = newData.facturaPagada;
        }
        if (newData.fechadePago) {
          updateData.fechadePago = newData.fechadePago;
        }
        if (newData.enViaje) {
          updateData.enViaje = newData.enViaje;
        }
        if (newData.igv) {
          updateData.igv = newData.igv;
        }
        if (newData.fechadeEmisionFactura) {
          updateData.fechadeEmisionFactura = newData.fechadeEmisionFactura;
        }
        if (newData.LavadoyEngrase) {
          updateData.LavadoyEngrase = newData.LavadoyEngrase;
        }

        await updateDoc(RefFirebaseLasEventPostd, updateData);

        router.push({
          pathname: "/search",
        });

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha editado el evento correctamente correctamente",
        });
        // Reset the form
        formik.resetForm(); // Reset the form after successful submission
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de editar estos datos",
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
    if (key === "nombreConductor") {
      setRenderComponent(
        <ChangeConductor onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "tipoComprobante") {
      setRenderComponent(
        <ChangeComprobante onClose={onCloseOpenModal} formik={formik} />
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
    if (key === "enViaje") {
      setRenderComponent(
        <ChangeEnViaje onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "LavadoyEngrase") {
      setRenderComponent(
        <ChangeLavadoyEngrase onClose={onCloseOpenModal} formik={formik} />
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

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white", flex: 1 }} // Add backgroundColor here
    >
      <Text> </Text>

      <Text style={styles.name}>{placa || nombreAsset}</Text>
      {placa ? (
        <Text style={styles.name}>
          {"Placa: "}
          {placa}
        </Text>
      ) : nombreAsset ? (
        <Text style={[styles.name, { alignSelf: "center" }]}>
          {nombreAsset}
        </Text>
      ) : (
        <Text style={[styles.name, { alignSelf: "center" }]}>
          {nombreAsset}
        </Text>
      )}

      <Text> </Text>
      <Text> </Text>

      <View style={{ marginHorizontal: 10 }}>
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

      <View style={styles.content}>
        {user_email === emailCompany && (
          <>
            {tipoEvento === "1. Inicio Viaje" && (
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
                        const [year, month, day] =
                          selectedDateString.split("-");
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
                  value={formik.values.LavadoyEngrase}
                  label="Lavado y Engrase?"
                  rightIcon={{
                    type: "material-community",
                    color: "#c2c2c2",
                    name: "clipboard-list-outline",
                    onPress: () => selectComponent("LavadoyEngrase"),
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
                  value={formik.values.enViaje}
                  label="Estoy Viajando?"
                  rightIcon={{
                    type: "material-community",
                    color: "#c2c2c2",
                    name: "clipboard-list-outline",
                    onPress: () => selectComponent("enViaje"),
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
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      Fecha Emision de factura
                    </Text>
                    <Text> </Text>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      onChange={(event: any) => {
                        const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                        const [year, month, day] =
                          selectedDateString.split("-");
                        const selectedDate = new Date(
                          Number(year),
                          Number(month) - 1,
                          Number(day)
                        ); // month is 0-indexed in JavaScript Date
                        formik.setFieldValue(
                          "fechadeEmisionFactura",
                          selectedDate
                        );
                      }}
                    />
                    <Text> </Text>
                    <Text> </Text>
                  </View>
                )}

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
                      Fecha de pago de la factura
                    </Text>
                    <Text> </Text>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      onChange={(event: any) => {
                        const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                        const [year, month, day] =
                          selectedDateString.split("-");
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
                  value={formik.values.pagoConductor.toString()}
                  label="Pago al Conductor S/."
                  // placeholder="Visibilidad del evento"
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    formik.setFieldValue("pagoConductor", numericText);
                  }}
                />
              </>
            )}
            {tipoEvento === "2. Egreso" && (
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
                      Fecha Contable
                    </Text>
                    <Text> </Text>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      onChange={(event: any) => {
                        const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                        const [year, month, day] =
                          selectedDateString.split("-");
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
                  value={formik.values.clienteNombre}
                  label="Nombre del proveedor"
                  // keyboardType="numeric"
                  onChangeText={(text) => {
                    formik.setFieldValue("clienteNombre", text);
                  }}
                />

                <Input
                  label=" Combustible (Galones.)"
                  value={formik.values.combustible.toString()}
                  editable={true}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");

                    formik.setFieldValue("combustible", numericText);
                  }}
                  // errorMessage={formik.errors.visibilidad}
                />

                <Input
                  value={formik.values.tipoComprobante.toString()}
                  label="Tipo de Comprobante"
                  // placeholder="Visibilidad del evento"
                  editable={true}
                  // keyboardType="numeric"
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
                    const numericText = text.replace(/[^0-9]/g, "");

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
            {tipoEvento === "3. Mantenimiento" && (
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
                        const [year, month, day] =
                          selectedDateString.split("-");
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
                      tires.length !== 0
                        ? "Formulario llenado"
                        : "Formulario vacio"
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
          </>
        )}
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

const formatdate = (item: any) => {
  const date = new Date(item);
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
  const formattedDate = `${day} ${month} ${year} `;
  const fechaPostFormato = formattedDate;
  if (!item) {
    return;
  } else {
    return fechaPostFormato;
  }
};
