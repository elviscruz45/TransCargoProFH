import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./index.styles";
import { DateScreen } from "../../../components/report/DateScreen/DateScreen";
import { Modal } from "../../../components/shared/Modal";
import { ChangeDisplayCompany } from "../../../components/report/ChangeCompany/ChangeCompany";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { DataTable } from "react-native-paper";
import { SearchBar, Icon } from "@rneui/themed";
import { getExcelReportData } from "../../../utils/excelData";
import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { Image as ImageExpo } from "expo-image";
import { useRouter } from "expo-router";
import Documents from "@/components/report/Documents/Documents";
import Operaciones from "@/components/report/Ingresos/Ingresos";
import Egresos from "@/components/report/Egresos/Egresos";
import Mantenimiento from "@/components/report/Mantenimiento/Mantenimiento";

export default function Report(props: any) {
  const [documentos, setDocumentos] = useState(true);
  const [operaciones, setOperaciones] = useState(false);
  const [egresos, setEgresos] = useState(false);
  const [mantenimiento, setMantenimiento] = useState(false);

  //user email , emailCompany
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  return (
    <>
      <View style={{ backgroundColor: "", marginHorizontal: 20 }}>
        <Text> </Text>
        {/* <Text style={styles.reporteTitulo}>Reporte General</Text> */}
        {/* <Text> </Text> */}
        {user_email === emailCompany && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // backgroundColor: "white",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              // style={styles.btnContainer2}
              onPress={() => {
                setDocumentos(true);
                setEgresos(false);
                setOperaciones(false);
                setMantenimiento(false);
              }}
            >
              <ImageExpo
                source={require("../../../assets/reportes/documentos.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.btnContainer3}
              onPress={() => {
                setDocumentos(false);
                setEgresos(false);
                setOperaciones(true);
                setMantenimiento(false);
              }}
            >
              <ImageExpo
                source={require("../../../assets/reportes/ingresos.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.btnContainer4}
              onPress={() => {
                setDocumentos(false);
                setEgresos(true);
                setOperaciones(false);
                setMantenimiento(false);
              }}
            >
              <ImageExpo
                source={require("../../../assets/reportes/egresos.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.btnContainer4}
              onPress={() => {
                setDocumentos(false);
                setEgresos(false);
                setOperaciones(false);
                setMantenimiento(true);
              }}
            >
              <ImageExpo
                source={require("../../../assets/reportes/mantto.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text> </Text>

      {documentos ? <Documents /> : null}
      {operaciones ? <Operaciones /> : null}
      {egresos ? <Egresos /> : null}
      {mantenimiento ? <Mantenimiento /> : null}
    </>
  );
}
