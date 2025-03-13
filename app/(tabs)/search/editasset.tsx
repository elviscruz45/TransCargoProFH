import { View, Text, ScrollView } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { styles } from "./editasset.styles";
import Toast from "react-native-toast-message";
import { Image as ImageExpo } from "expo-image";
import { AssetForm } from "../../../components/publish/forms/AssetForm/Asset";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./editasset.data";
import { doc, updateDoc } from "firebase/firestore";

export default function EditAsset(props: any) {
  const { item, action, tipoActivoEdit }: any = useLocalSearchParams();
  const router = useRouter();
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );

  // const navigation = useNavigation();
  const [activo, setActivo] = useState();
  const [nombre, setNombre] = useState();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        // const RefFirebaseLasEventPostd = doc(db, "Asset", item);

        const updateData: any = {};

        if (newData?.tipoActivo) {
          updateData.tipoActivo = newData.tipoActivo;
        }
        if (newData?.nombre) {
          updateData.nombre = newData.nombre;
        }
        if (newData?.dni) {
          updateData.dni = newData.dni;
        }
        if (newData?.placa) {
          updateData.placa = newData.placa;
        }
        if (newData?.fechaFabricacion) {
          updateData.fechaFabricacion = newData.fechaFabricacion;
        }
        if (newData?.categoriaVehiculo) {
          updateData.categoriaVehiculo = newData.categoriaVehiculo;
        }
        if (newData?.numeroMotor) {
          updateData.numeroMotor = newData.numeroMotor;
        }
        if (newData?.marca) {
          updateData.marca = newData.marca;
        }
        if (newData?.modelo) {
          updateData.modelo = newData.modelo;
        }
        if (newData?.kilometraje) {
          updateData.kilometraje = newData.kilometraje;
        }
        if (newData?.cambioAceiteProx) {
          updateData.cambioAceiteProx = newData.cambioAceiteProx;
        }
        if (newData?.cambioAceiteCajaProx) {
          updateData.cambioAceiteCajaProx = newData.cambioAceiteCajaProx;
        }
        if (newData?.cambioAceiteDifProx) {
          updateData.cambioAceiteDifProx = newData.cambioAceiteDifProx;
        }
        if (newData?.cambioHidrolinaProx) {
          updateData.cambioHidrolinaProx = newData.cambioHidrolinaProx;
        }
        if (newData?.cambioRefrigeranteProx) {
          updateData.cambioRefrigeranteProx = newData.cambioRefrigeranteProx;
        }
        if (newData?.cambioFiltrosProx) {
          updateData.cambioFiltrosProx = newData.cambioFiltrosProx;
        }
        if (newData?.numeroChasis) {
          updateData.numeroChasis = newData.numeroChasis;
        }
        if (newData?.claseVehiculo) {
          updateData.claseVehiculo = newData.claseVehiculo;
        }
        if (newData?.potencia) {
          updateData.potencia = newData.potencia;
        }
        if (newData?.tipoCombustible) {
          updateData.tipoCombustible = newData.tipoCombustible;
        }
        if (newData?.numeroSerie) {
          updateData.numeroSerie = newData.numeroSerie;
        }
        if (newData?.pesoNeto) {
          updateData.pesoNeto = newData.pesoNeto;
        }
        if (newData?.cargaUtil) {
          updateData.cargaUtil = newData.cargaUtil;
        }
        if (newData?.pesoBruto) {
          updateData.pesoBruto = newData.pesoBruto;
        }
        if (newData?.dimensiones) {
          updateData.dimensiones = newData.dimensiones;
        }
        if (newData?.color) {
          updateData.color = newData.color;
        }
        if (newData?.carroceria) {
          updateData.carroceria = newData.carroceria;
        }
        if (newData?.ejes) {
          updateData.ejes = newData.ejes;
        }
        if (newData?.gastoCombustible) {
          updateData.gastoCombustible = newData.gastoCombustible;
        }
        if (newData?.cambioAceiteProx) {
          updateData.cambioAceiteProx = newData.cambioAceiteProx;
        }
        if (newData?.redimientoCombustible) {
          updateData.redimientoCombustible = newData.redimientoCombustible;
        }
        if (newData?.facturacionFleteYTD) {
          updateData.facturacionFleteYTD = newData.facturacionFleteYTD;
        }
        if (newData?.cantidadServiciosYTD) {
          updateData.cantidadServiciosYTD = newData.cantidadServiciosYTD;
        }
        if (newData?.gastosTotalYTD) {
          updateData.gastosTotalYTD = newData.gastosTotalYTD;
        }
        if (newData?.licenciaA3) {
          updateData.licenciaA3 = newData.licenciaA3;
        }
        if (newData?.licenciaA4) {
          updateData.licenciaA4 = newData.licenciaA4;
        }
        if (newData?.certificadoSalud) {
          updateData.certificadoSalud = newData.certificadoSalud;
        }
        if (newData?.recordConductor) {
          updateData.recordConductor = newData.recordConductor;
        }
        if (newData?.iqbfConductor) {
          updateData.iqbfConductor = newData.iqbfConductor;
        }
        if (newData?.manejoDefensivo) {
          updateData.manejoDefensivo = newData.manejoDefensivo;
        }
        if (newData?.seguroVidaLey) {
          updateData.seguroVidaLey = newData.seguroVidaLey;
        }
        if (newData?.sctrSalud) {
          updateData.sctrSalud = newData.sctrSalud;
        }
        if (newData?.sctrPension) {
          updateData.sctrPension = newData.sctrPension;
        }
        if (newData?.habilitacionVehicular) {
          updateData.habilitacionVehicular = newData.habilitacionVehicular;
        }
        if (newData?.resolucionMaterialesPeligrosos) {
          updateData.resolucionMaterialesPeligrosos =
            newData.resolucionMaterialesPeligrosos;
        }
        if (newData?.inspeccionTecnica) {
          updateData.inspeccionTecnica = newData.inspeccionTecnica;
        }
        if (newData?.planContingencia) {
          updateData.planContingencia = newData.planContingencia;
        }
        if (newData?.RDHabilitacion) {
          updateData.RDHabilitacion = newData.RDHabilitacion;
        }
        if (newData?.partidaRegistral) {
          updateData.partidaRegistral = newData.partidaRegistral;
        }
        if (newData?.sunatIQBF) {
          updateData.sunatIQBF = newData.sunatIQBF;
        }
        if (newData?.soat) {
          updateData.soat = newData.soat;
        }
        if (newData?.polizaResponsabilidadCivil) {
          updateData.polizaResponsabilidadCivil =
            newData.polizaResponsabilidadCivil;
        }
        if (newData?.FichaRUC) {
          updateData.FichaRUC = newData.FichaRUC;
        }
        if (newData?.SeguroCarga) {
          updateData.SeguroCarga = newData.SeguroCarga;
        }
        if (newData?.fechaPostFormato) {
          updateData.fechaPostFormato = newData.fechaPostFormato;
        }
        if (newData?.fechaPostISO) {
          updateData.fechaPostISO = newData.fechaPostISO;
        }
        if (newData?.createdAt) {
          updateData.createdAt = newData.createdAt;
        }
        if (newData?.LastEventPosted) {
          updateData.LastEventPosted = newData.LastEventPosted;
        }
        if (newData?.photoServiceURL) {
          updateData.photoServiceURL = newData.photoServiceURL;
        }
        if (newData?.emailPerfil) {
          updateData.emailPerfil = newData.emailPerfil;
        }
        if (newData?.nombrePerfil) {
          updateData.nombrePerfil = newData.nombrePerfil;
        }
        if (newData?.companyName) {
          updateData.companyName = newData.companyName;
        }
        if (newData?.idFirebaseAsset) {
          updateData.idFirebaseAsset = newData.idFirebaseAsset;
        }
        if (newData?.userAssigned) {
          updateData.userAssigned = newData.userAssigned;
        }

        // await updateDoc(RefFirebaseLasEventPostd, updateData);

        // this hedlps to go to the begining of the process

        router.back();

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha Actualizado correctamente",
        });
        formik.resetForm(); // Reset the form after successful submission
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "123Error al tratar de actualizar estos datos",
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
          source={
            currentAsset.photoServiceURL
              ? { uri: currentAsset.photoServiceURL }
              : require("../../../assets/assetpics/truckIcon.png")
          }
          style={[styles.roundImage, { alignSelf: "center" }]}
          cachePolicy={"memory-disk"}
        />
        <Text style={styles.name}>
          {nombre || activo || "Nombre del activo"}
        </Text>
      </View>

      <View style={styles.sectionForms}></View>
      <AssetForm
        formik={formik}
        setActivo={setActivo}
        setNombre={setNombre}
        action={action}
        tipoActivoEdit={tipoActivoEdit}
      />

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
