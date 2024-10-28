import { Avatar, Button, Input } from "@rneui/themed";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
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

// interface CurrentAsset {
//   image?: string;
//   // add other properties as needed
// }
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { dateFormat, useUserData, uploadImage } from "./editEvent.cal";

export default function editEvents(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [ubicacion, setUbicacion] = useState<Location.LocationObject | null>(
    null
  );
  const [evento, setEvento] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tipoGastos, setTipoGasto] = useState<string | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const tires: any =
    useSelector((state: RootState) => state.publish.tires) ?? [];
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  useEffect(() => {
    dispatch(uploadTires([]));
  }, []);
  //global state management for the user_uid
  const router = useRouter();
  const {
    idEventFirebase,
    idFirebaseAsset,
    fechaPostFormato,
    tipoEvento,
    comentarios,
    emailPerfil,
    tipoGasto,
    nombreAsset,
    placa,
    photoAssetURL,
    photoProfileURL,
    fotoPrincipal,
  }: any = useLocalSearchParams();

  const userType =
    useSelector((state: RootState) => state.userId.userType) ?? "";

  //global state management for the user_uid
  const dispatch = useDispatch();
  const currentAsset: CurrentAsset | any = useSelector(
    (state: RootState) => state.publish.asset
  );
  const asset: any =
    useSelector((state: RootState) => state.publish.asset) ?? "";

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
        await updateDoc(RefFirebaseLasEventPostd, updateData);
        router.back();

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha editado el evento correctamente correctamente",
        });
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

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white", flex: 1 }} // Add backgroundColor here
      // showsVerticalScrollIndicator={false}
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

      <View>
        <View style={styles.content}>
          <Input
            value={formik.values.kilometraje}
            label="Kilometraje (Km)"
            keyboardType="numeric"
            onChangeText={(text) => {
              formik.setFieldValue("kilometraje", text);
            }}
          />
          {user_email === emailCompany && (
            <>
              <Input
                value={formik.values.carroceria}
                label="Placa Carroceria"
                // keyboardType="numeric"
                onChangeText={(text) => {
                  formik.setFieldValue("carroceria", text);
                }}
              />
              <Input
                value={formik.values.cantidad.toString()}
                label="Cantidad de Carga"
                keyboardType="numeric"
                onChangeText={(text) => {
                  formik.setFieldValue("cantidad", text);
                }}
              />
              <Input
                value={formik.values.unidadMedida}
                label="Unidad de Medida"
                // keyboardType="numeric"
                onChangeText={(text) => {
                  formik.setFieldValue("unidadMedida", text);
                }}
              />
              <Input
                value={formik.values.clienteRUC}
                label="Cliente RUC"
                // keyboardType="numeric"
                onChangeText={(text) => {
                  formik.setFieldValue("clienteRUC", text);
                }}
              />
              <Input
                value={formik.values.tipoCarga}
                label="Tipo de Carga"
                // keyboardType="numeric"
                onChangeText={(text) => {
                  formik.setFieldValue("tipoCarga", text);
                }}
              />
              <Input
                value={formik.values.puntoInicio}
                label="Punto de Inicio"
                // keyboardType="numeric"
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
            </>
          )}

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

          {/* <Input
            value={formik.values.facturacionFlete.toString()}
            label="Costo Flete (S/.)"
            editable={true}
            keyboardType="numeric"
            onChangeText={(text) => {
              formik.setFieldValue("facturacionFlete", text);
            }}
          /> */}

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

          <Input
            value={formik.values.tipoGasto.toString()}
            label="Tipo de Gasto o Ingreso"
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
            value={formik.values.costo.toString()}
            label="Valor del Monto"
            // placeholder="Visibilidad del evento"
            editable={true}
            keyboardType="numeric"
            onChangeText={(text) => {
              formik.setFieldValue("costo", text);
            }}
            // errorMessage={formik.errors.visibilidad}
          />
          <Input
            value={formik.values.costo.toString()}
            label="Moneda"
            // placeholder="Visibilidad del evento"
            editable={true}
            // keyboardType="numeric"
            onChangeText={(text) => {
              formik.setFieldValue("moneda", text);
            }}
          />
          <Input
            value={formik.values.costo.toString()}
            label="Tipo de Comprobante"
            // placeholder="Visibilidad del evento"
            editable={true}
            // keyboardType="numeric"
            onChangeText={(text) => {
              formik.setFieldValue("tipoComprobante", text);
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
