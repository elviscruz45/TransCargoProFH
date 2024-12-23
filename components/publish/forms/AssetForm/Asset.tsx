import { View, Text, Linking, Button } from "react-native";
import React, { useState, ReactNode } from "react";
import { styles } from "./Asset.styles";
import { Input } from "react-native-elements";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDate } from "../ChangeDates/ChangeDate";
import { SelectActivo } from "../TipoActivo/Tipo";
import { SelectReporte } from "../Reporte/Tipo";

import { formatdate } from "../../../../utils/formats";

export function AssetForm({ formik, setNombre, action }: any) {
  const [renderComponent, setRenderComponent] = useState<ReactNode>(null);

  //open or close modal
  const [showModal, setShowModal] = useState(false);
  //form
  const [tipoActivo, setTipoActivo] = useState<string>("");
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectComponent = (key: string) => {
    if (key === "TipoActivo") {
      setRenderComponent(
        <SelectActivo onClose={onCloseOpenModal} formik={formik} />
      );
    }

    if (key === "reporte") {
      setRenderComponent(
        <SelectReporte onClose={onCloseOpenModal} formik={formik} />
      );
    }

    onCloseOpenModal();
  };

  return (
    <View>
      <View style={styles.content}>
        {action !== "toEdit" && (
          <>
            <Input
              label="Tipo"
              value={formik?.values?.tipoActivo?.toString() ?? ""}
              editable={false}
              rightIcon={{
                type: "material-community",
                name: "clipboard-text",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("TipoActivo");
                },
              }}
              errorMessage={formik.errors.tipoActivo}
            />
            <Input
              label="Nombre de Placa / Area"
              value={formik?.values?.nombre?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("nombre", text);
                setNombre(text);
              }}
              errorMessage={formik.errors.nombre}
            />
            <Input
              label="Reportabilidad"
              value={formik.values?.reporte?.toString() ?? ""}
              rightIcon={{
                type: "material-community",
                color: "#c2c2c2",
                name: "clipboard-list-outline",
                onPress: () => selectComponent("reporte"),
              }}
            />
          </>
        )}

        {(formik?.values?.tipoActivo === "Equipo / Activo" ||
          action === "toEdit") && (
          <>
            <Text style={styles.subtitleForm}>Informacion Activo</Text>
            <Text> </Text>

            <Input
              label="Placa Vehicular"
              value={formik.values?.placa?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("placa", text);
              }}
            />

            <Input
              label="Fecha de Fabricacion"
              keyboardType="numeric"
              value={formik.values?.fechaFabricacion?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("fechaFabricacion", text);
              }}
            />
            <Input
              label="Categoria de Vehiculo"
              value={formik.values?.categoriaVehiculo?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("categoriaVehiculo", text);
              }}
            />
            <Input
              label="Numero de Motor"
              value={formik.values?.numeroMotor?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("numeroMotor", text);
              }}
            />
            <Input
              label="Marca"
              value={formik.values?.marca?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("marca", text);
              }}
            />
            <Input
              label="Modelo"
              value={formik.values?.modelo?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("modelo", text);
              }}
            />
            <Input
              label="Kilometraje"
              value={formik.values?.kilometraje?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("kilometraje", text);
              }}
            />
            <Input
              label="Numero Serie Chasis"
              value={formik.values?.numeroChasis?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("numeroChasis", text);
              }}
            />
            <Text style={styles.subtitleForm}>Datos Tecnicos</Text>
            <Text> </Text>
            <Input
              label="Clase De Vehiculo"
              value={formik.values?.claseVehiculo?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("claseVehiculo", text);
              }}
            />
            <Input
              label="Potencia de Motor"
              value={formik.values?.potencia?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("potencia", text);
              }}
            />
            <Input
              label="Tipo Combustible"
              value={formik.values?.tipoCombustible?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("tipoCombustible", text);
              }}
            />
            <Input
              label="Numero de Serie"
              value={formik.values?.numeroSerie?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("numeroSerie", text);
              }}
            />
            <Input
              label="Peso Neto (Kg)"
              keyboardType="numeric"
              value={formik.values?.pesoNeto?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("pesoNeto", text);
              }}
            />
            <Input
              label="Carga Util (Kg)"
              keyboardType="numeric"
              value={formik.values?.cargaUtil?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("cargaUtil", text);
              }}
            />
            <Input
              label="Peso Bruto (Kg)"
              keyboardType="numeric"
              value={formik.values?.pesoBruto?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("pesoBruto", text);
              }}
            />
            <Input
              label="Dimensiones (LxAxA) (m)"
              value={formik.values?.dimensiones?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("dimensiones", text);
              }}
            />
            <Input
              label="Color"
              value={formik.values?.color?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("color", text);
              }}
            />
            <Input
              label="Carroceria remolcador"
              value={formik.values?.carroceria?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("carroceria", text);
              }}
            />
            <Input
              label="Ejes"
              value={formik.values?.ejes?.toString() ?? ""}
              onChangeText={(text) => {
                formik.setFieldValue("ejes", text);
              }}
            />
          </>
        )}
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
