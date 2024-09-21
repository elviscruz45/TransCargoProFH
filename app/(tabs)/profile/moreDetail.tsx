import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
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

const windowWidth = Dimensions.get("window").width;
export default function MoreDetail() {
  const { item }: any = useLocalSearchParams();
  const user_email = useSelector((state: RootState) => state.userId.email);

  const router = useRouter();
  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );
  const currentEmployee: any = employeesList.find(
    (user: any) => user.uid === item
  );
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  //equipment assigned to this employee
  const assetAssigned = globalAssetList?.filter((asset: any) =>
    asset.userAssigned.includes(currentEmployee?.email)
  );

  // // go to edit screen
  // const goToEditAssetScreen = (item: any) => {
  //   router.push({
  //     pathname: "/search/editasset",
  //     params: { item: item },
  //   });
  // };
  const LineBreak = () => <View style={{ height: 10 }} />;

  //Using navigation.navigate I send it to another screen (post)
  const goToDocs = () => {
    router.push({
      pathname: "/profile/files",
      params: { item: item },
    });
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {/* {true && (
        <TouchableOpacity onPress={() => goToEditAssetScreen(item)}>
          <View style={{ marginRight: "2%" }}>
            <ImageExpo
              source={require("../../../assets/pictures/editIcon2.png")}
              style={styles.editIcon}
            />
          </View>
        </TouchableOpacity>
      )} */}
      {true ? (
        <ImageExpo
          source={{ uri: currentEmployee.photoURL }}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      ) : (
        <ImageExpo
          source={require("../../../assets/assetpics/carIcon.jpg")}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      )}

      <Text></Text>
      <Text style={styles.name}>{currentEmployee.displayNameform}</Text>
      {currentEmployee?.email && (
        <Text style={styles.name}>{currentEmployee.email}</Text>
      )}
      <Text></Text>
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
          onPress={() => goToDocs()}
        >
          <Image
            source={require("../../../assets/pictures/addFilesIcon.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>
      </View>
      <Text></Text>
      <Text></Text>

      <Text style={styles.name}>Informacion Basica</Text>
      <Text></Text>
      <View style={[styles.row, styles.center]}>
        <Text style={styles.info}>{"Equipos Asignados: "}</Text>
      </View>
      <Text></Text>
      <View>
        {assetAssigned?.map((item: any, index: any) => (
          <Text key={index} style={{ marginLeft: 20 }}>
            {item.nombre}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

// {true && (
//   <View style={[styles.row, styles.center]}>
//     <Text style={styles.info}>{"DNI:  "}</Text>
//     {/* <Text style={styles.info2}>{currentAsset.dni}</Text> */}
//   </View>
// )}
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento Licencia A3:  "}</Text>
//   {/* <Text style={styles.info2}>{formatDate(currentAsset.licenciaA3)}</Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento Manejo Defensivo:  "}</Text>
//   {/* <Text style={styles.info2}>
//     {formatDate(currentAsset.manejoDefensivo)}
//   </Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento Record de Conductor:  "}</Text>
//   {/* <Text style={styles.info2}>
//     {formatDate(currentAsset.recordConductor)}
//   </Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento Seguro Vida Ley:  "}</Text>
//   {/* <Text style={styles.info2}>
//     {formatDate(currentAsset.seguroVidaLey)}
//   </Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento SCTR Pension:  "}</Text>
//   {/* <Text style={styles.info2}>{formatDate(currentAsset.sctrPension)}</Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento SCTR Salud:  "}</Text>
//   {/* <Text style={styles.info2}>{formatDate(currentAsset.sctrSalud)}</Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento Licencia A4:  "}</Text>
//   {/* <Text style={styles.info2}>{formatDate(currentAsset.licenciaA4)}</Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Vencimiento IQBF Conductor:  "}</Text>
//   {/* <Text style={styles.info2}>
//     {formatDate(currentAsset.iqbfConductor)}
//   </Text> */}
// </View>
// <View style={[styles.row, styles.center]}>
//   <Text style={styles.info}>{"Equipos Asignados: "}</Text>
// </View>
