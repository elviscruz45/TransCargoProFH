import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./moreDetail.styles";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  formattedNumber,
  formattedAmount,
  formatDate,
} from "../../../utils/formats";
///function to change the format of FechaFin from ServiciosAIT firebase collection

export default function MoreDetail() {
  const { item }: any = useLocalSearchParams();
  const router = useRouter();
  const userType = useSelector((state: RootState) => state.userId.userType);
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const email = useSelector((state: RootState) => state.userId.email) ?? "";

  const tipoActivo = currentAsset?.tipoActivo;

  // go to edit screen
  const goToEditAssetScreen = (item: any) => {
    router.push({
      pathname: "/search/editasset",
      params: { item: item, action: "toEdit", tipoActivoEdit: tipoActivo },
    });
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {email === emailCompany && (
        <TouchableOpacity onPress={() => goToEditAssetScreen(item)}>
          <View style={{ marginRight: "2%" }}>
            <ImageExpo
              source={require("../../../assets/pictures/editIcon2.png")}
              style={styles.editIcon}
            />
          </View>
        </TouchableOpacity>
      )}
      <ImageExpo
        source={
          currentAsset?.photoServiceURL
            ? { uri: currentAsset.photoServiceURL }
            : require("../../../assets/assetpics/carIcon.jpg")
        }
        style={styles.roundImage}
        cachePolicy={"memory-disk"}
      />

      <Text></Text>
      {currentAsset?.placa ? (
        <Text style={styles.name}>{currentAsset?.placa}</Text>
      ) : (
        <Text style={styles.name}>{currentAsset?.nombre}</Text>
      )}
      <Text></Text>
      {Platform.OS === "web" && <View style={{ marginTop: 20 }}></View>}

      <Text></Text>
      {tipoActivo === "Equipo / Activo" && (
        <>
          <Text style={styles.name}>Informacion Basica</Text>
          <Text></Text>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Marca:  "}</Text>
            <Text style={styles.info2}>{currentAsset.marca}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Año de Fabricacion:  "}</Text>
            <Text style={styles.info2}>{currentAsset.fechaFabricacion}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Numero de Serie:  "}</Text>
            <Text style={styles.info2}>{currentAsset.numeroSerie}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Ejes:  "}</Text>
            <Text style={styles.info2}>{currentAsset.ejes}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Categoria del Vehiculo:  "}</Text>
            <Text style={styles.info2}>{currentAsset.categoriaVehiculo}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Color:  "}</Text>
            <Text style={styles.info2}>{currentAsset.color}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Numero del Motor:  "}</Text>
            <Text style={styles.info2}>{currentAsset.numeroMotor}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Clase del Vehiculo:  "}</Text>
            <Text style={styles.info2}>{currentAsset.claseVehiculo}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Modelo:  "}</Text>
            <Text style={styles.info2}>{currentAsset.modelo}</Text>
          </View>
          <Text></Text>

          <Text style={styles.name}>Informacion Tecnica</Text>
          <Text></Text>

          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Potencia:  "}</Text>
            <Text style={styles.info2}>{currentAsset.potencia}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Peso Bruto (Kg):  "}</Text>
            <Text style={styles.info2}>
              {formattedNumber(currentAsset.pesoBruto)}
              {" Kg"}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Peso Neto (Kg):  "}</Text>
            <Text style={styles.info2}>
              {formattedNumber(currentAsset.pesoNeto)}
              {" Kg"}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Dimensiones (LxAxA) (m):  "}</Text>
            <Text style={styles.info2}>{currentAsset.dimensiones}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Carga Util (Kg):  "}</Text>
            <Text style={styles.info2}>
              {formattedNumber(currentAsset.cargaUtil)}
              {" Kg"}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Numero Chasis:  "}</Text>
            <Text style={styles.info2}>{currentAsset.numeroChasis}</Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Tipo de Combustible:  "}</Text>
            <Text style={styles.info2}>{currentAsset.tipoCombustible}</Text>
          </View>
          <Text style={styles.name}>Calculos</Text>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Monto de Facturacion:  "}</Text>
            <Text style={styles.info2}>
              {"S/. "}
              {formattedAmount(currentAsset.facturacionFleteYTD)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Rendimiento de Combustible:  "}</Text>
            <Text style={styles.info2}>
              {currentAsset.redimientoCombustible}
              {" Gls/Km"}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Kilometraje:  "}</Text>
            <Text style={styles.info2}>
              {currentAsset.kilometraje}
              {" Km"}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Facturacion Flete YTD:  "}</Text>
            <Text style={styles.info2}>
              {"S/. "}
              {formattedAmount(currentAsset.facturacionFleteYTD)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Gastos Total YTD:  "}</Text>
            <Text style={styles.info2}>
              {"S/. "}
              {formattedAmount(currentAsset.gastosTotalYTD)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Gasto de Combustible:  "}</Text>
            <Text style={styles.info2}>
              {"S/. "}
              {formattedAmount(currentAsset.gastoCombustible)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Cantidad de Servicios YTD:  "}</Text>
            <Text style={styles.info2}>
              {currentAsset.cantidadServiciosYTD}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>
              {"Kilometraje Cambio Aceite Prox:  "}
            </Text>
            <Text style={styles.info2}>
              {formattedNumber(currentAsset.cambioAceiteProx)}
              {" Km"}
            </Text>
          </View>

          <Text></Text>

          {/* <Text style={styles.name}>Documentacion Vehicular</Text>
          <Text></Text>

          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Vencimiento RDHabilitacion:  "}</Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.RDHabilitacion)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>
              {"Vencimiento Inspeccion Tecnica:  "}
            </Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.inspeccionTecnica)}
            </Text>
          </View> */}
          <Text></Text>

          <Text></Text>

          {/* <Text style={styles.name}>Otros Datos</Text>
          <Text></Text>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Usuarios Asignados:  "}</Text>
            <View>
              {currentAsset?.userAssigned.map((user: any, index: any) => (
                <Text key={index} style={styles.info2}>
                  {user.email}
                </Text>
              ))}
            </View>
          </View>

          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Tipo de Activo:  "}</Text>
            <Text style={styles.info2}>{currentAsset.tipoActivo}</Text>
          </View> */}
        </>
      )}

      {tipoActivo === "Area / Empresa" && (
        <>
          {/* <Text style={styles.name}>Datos Empresa</Text>
          <Text></Text>

          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Vencimiento Ficha RUC:  "}</Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.FichaRUC)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Vencimiento Seguro Carga:  "}</Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.SeguroCarga)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Vencimiento sunat IQBF:  "}</Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.sunatIQBF)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>
              {"Vencimiento Habilitacion Vehicular:  "}
            </Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.habilitacionVehicular)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>
              {"Vencimiento Resolucion Materiales Peligrosos:  "}
            </Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.resolucionMaterialesPeligrosos)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>
              {"Vencimiento Partida Registral:  "}
            </Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.partidaRegistral)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Vencimiento PlanContingencia:  "}</Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.planContingencia)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>
              {"Vencimiento Poliza Responsabilidad Civil:  "}
            </Text>
            <Text style={styles.info2}>
              {formatDate(currentAsset.polizaResponsabilidadCivil)}
            </Text>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.info}>{"Vencimiento SOAT:  "}</Text>
            <Text style={styles.info2}>{formatDate(currentAsset.soat)}</Text>
          </View> */}
        </>
      )}
    </ScrollView>
  );
}
