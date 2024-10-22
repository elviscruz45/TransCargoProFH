import { View, Text, Linking, Button } from "react-native";
import React, { useState, ReactNode } from "react";
import { styles } from "./Asset.styles";
import { Input } from "react-native-elements";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDate } from "../ChangeDates/ChangeDate";
import { SelectActivo } from "../TipoActivo/Tipo";
import { formatdate } from "../../../../utils/formats";

export function AssetForm({ formik, setNombre, action }: any) {
  const [renderComponent, setRenderComponent] = useState<ReactNode>(null);

  //open or close modal
  const [showModal, setShowModal] = useState(false);
  //form
  const [tipoActivo, setTipoActivo] = useState<string>("");
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectComponent = (key: string, formikValue: string) => {
    if (key === "TipoActivo") {
      setRenderComponent(
        <SelectActivo
          onClose={onCloseOpenModal}
          formik={formik}
          // setAreaservicio={setAreaservicio}
          setTipoActivo={setTipoActivo}
        />
      );
    }
    if (key === "date") {
      setRenderComponent(
        <ChangeDate
          onClose={onCloseOpenModal}
          formik={formik}
          formikValue={formikValue}
        />
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
                  selectComponent("TipoActivo", "tipoActivo");
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
          </>
        )}

        {(tipoActivo === "Equipo / Activo" || action === "toEdit") && (
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

// {tipoActivo === "Conductor / Personal" && (
//   <>
//     <Text style={styles.subtitleForm}>Informacion Personal</Text>
//     <Input
//       value={formik.values?.dni?.toString()}
//       label="DNI"
//       keyboardType="numeric"
//       onChangeText={(text) => {
//         formik.setFieldValue("dni", text);
//       }}
//     />
//   </>
// )}
// {tipoActivo === "Conductor / Personal" && (
//   <>
//     <Text style={styles.subtitleForm}>Documentacion Personal</Text>
//     <Input
//       label="Licencia de Conducir A3"
//       // InputComponent={() => (
//       //   <>
//       //     <ChangeDate onClose={onCloseOpenModal} formik={formik} />
//       //   </>
//       // )}
//       value={formatdate(formik.values?.licenciaA3?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "licenciaA3");
//         },
//       }}
//     />

//     <Input
//       label="Licencia de Conducir A4"
//       value={formatdate(formik.values?.licenciaA4?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "licenciaA4");
//         },
//       }}
//     />

//     <Input
//       label="Certificado de Salud Ocupacional"
//       value={formatdate(formik.values?.certificadoSalud?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "certificadoSalud");
//         },
//       }}
//     />
//     <Input
//       label="Record de Conductor"
//       value={formatdate(formik.values?.recordConductor?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "recordConductor");
//         },
//       }}
//     />
//     <Input
//       label="IQBF SUNAT Conductor"
//       value={formatdate(formik.values?.iqbfConductor?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "iqbfConductor");
//         },
//       }}
//     />
//     <Input
//       label="Manejo Defensivo"
//       value={formatdate(formik.values?.manejoDefensivo?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "manejoDefensivo");
//         },
//       }}
//     />
//     <Input
//       label="Seguro Vida Ley"
//       value={formatdate(formik.values?.seguroVidaLey?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "seguroVidaLey");
//         },
//       }}
//     />
//     <Input
//       label="SCTR Salud"
//       value={formatdate(formik.values?.sctrSalud?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "sctrSalud");
//         },
//       }}
//     />
//     <Input
//       label="SCTR Pension"
//       value={formatdate(formik.values?.sctrPension?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "sctrPension");
//         },
//       }}
//     />
//   </>
// )}

// {tipoActivo === "Area / Empresa" && (
//   <>
//     <Text style={styles.subtitleForm}>Documentos de la Empresa</Text>
//     <Input
//       label="Ficha RUC"
//       value={formatdate(formik.values?.FichaRUC?.toString())}
//       onChangeText={(text) => {
//         formik.setFieldValue("FichaRUC", text);
//       }}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "FichaRUC");
//         },
//       }}
//     />
//     <Input
//       label="Seguro de Carga"
//       value={formatdate(formik.values?.SeguroCarga?.toString())}
//       onChangeText={(text) => {
//         formik.setFieldValue("SeguroCarga", text);
//       }}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "SeguroCarga");
//         },
//       }}
//     />
//   </>
// )}

//////////////////////////////////////
// {tipoActivo === "Equipo / Activo" && (
//   <>
//     <Text style={styles.subtitleForm}>Documentacion Vehicular</Text>
//     <Input
//       label="Habilitacion Vehicular"
//       value={formatdate(
//         formik.values?.habilitacionVehicular?.toString()
//       )}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "habilitacionVehicular");
//         },
//       }}
//     />
//     <Input
//       label="Resolucion Materiales Peligrosos"
//       value={formatdate(
//         formik.values?.resolucionMaterialesPeligrosos?.toString()
//       )}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "resolucionMaterialesPeligrosos");
//         },
//       }}
//     />
//     <Input
//       label="Inspeccion Tecnica"
//       value={formatdate(formik.values?.inspeccionTecnica?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "inspeccionTecnica");
//         },
//       }}
//     />
//     <Input
//       label="Vencimiento SUNAT IQBF"
//       value={formatdate(formik.values?.sunatIQBF?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "sunatIQBF");
//         },
//       }}
//     />
//     <Input
//       label="SOAT"
//       value={formatdate(formik.values?.soat?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "soat");
//         },
//       }}
//     />
//     <Input
//       label="Poliza Responsabilidad Civil"
//       value={formatdate(
//         formik.values?.polizaResponsabilidadCivil?.toString()
//       )}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "polizaResponsabilidadCivil");
//         },
//       }}
//     />

//     <Input
//       label="Plan de Contingencia"
//       value={formatdate(formik.values?.planContingencia?.toString())}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "planContingencia");
//         },
//       }}
//     />
//     <Input
//       label="R.D De Habilitacion"
//       value={formatdate(formik.values?.RDHabilitacion?.toString())}
//       onChangeText={(text) => {
//         formik.setFieldValue("RDHabilitacion", text);
//       }}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "RDHabilitacion");
//         },
//       }}
//     />

//     <Input
//       label="Partida Registral"
//       value={formatdate(formik.values?.partidaRegistral?.toString())}
//       onChangeText={(text) => {
//         formik.setFieldValue("partidaRegistral", text);
//       }}
//       rightIcon={{
//         type: "material-community",
//         name: "update",
//         color: "#c2c2c2",
//         onPress: () => {
//           selectComponent("date", "partidaRegistral");
//         },
//       }}
//     />
//   </>
// )}
