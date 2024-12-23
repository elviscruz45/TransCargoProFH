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
import { styles } from "./Egresos.styles";
import { DateScreen } from "../DateScreen/DateScreen";
import { Modal } from "../../shared/Modal";
import { ChangeDisplayCompany } from "../ChangeCompany/ChangeCompany";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
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
import OperacionDate from "../OperacionDate";
import { Reporte } from "../HeaderReporte/headerEgreso";

export default function Operaciones(props: any) {
  const [post, setPost] = useState([]);
  const [asset, setAsset] = useState("");
  console.log("post", post);
  console.log("assetmm", asset);

  //  searching
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchText, setSearchText] = useState("");

  //states of filters
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const [area, setArea] = useState("GERENCIA");
  const [areaList, setAreaList] = useState<any>([]);

  //states of filters
  // Subtract 30 days from the current date
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 30);

  const [startDate, setStartDate] = useState(pastDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [removeFilter, setRemoveFilter] = useState(true);
  const [diasPendientes, setDiasPendientes] = useState(30);
  //real time updates
  const [data, setData] = useState();
  const [dataExcel, setDataExcel] = useState();
  //state to see reports
  const [Documentos, setDocumentos] = useState(false);
  //user email , emailCompany
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  //-----------------------------------------------------------------------------------
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  const globalFilteredAssetList = globalAssetList?.filter(
    (item: any) => item.reporte === "Visible"
  );

  //Changing the value to activate again the filter to rende the posts
  const filter = (start: any, end: any) => {
    setStartDate(start);
    setEndDate(end);
  };

  const quitfilter = () => {
    // Subtract 30 days from the current date
    const datewithNoFilter = new Date();
    datewithNoFilter.setDate(currentDate.getDate() - 30);
    setRemoveFilter((prev) => !prev);
    setStartDate(datewithNoFilter);
    setEndDate(new Date());
  };
  // trayendo data

  useEffect(() => {
    let q;
    if (startDate && endDate) {
      async function fetchData() {
        console.log("11111111");
        q = query(
          collection(db, "Events"),
          orderBy("createdAt", "desc"),
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate),
          where("emailCompany", "==", emailCompany),
          where("idFirebaseAsset", "==", asset),
          where("tipoEvento", "==", "2. Egreso"),
          limit(50)
        );
        console.log("2222222", asset);

        try {
          const querySnapshot = await getDocs(q);
          const lista: any = [];
          console.log("33333333");

          querySnapshot.forEach((doc) => {
            const dataschema = {
              ...doc.data(),
            };
            console.log("4444444");

            lista.push(dataschema);
          });
          setPost(lista);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }

      fetchData();
    }
  }, [startDate, endDate, asset]);

  //-----------------------------------------------------------------------------------
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const router = useRouter();

  const goToEditDocs = (item: any) => {
    console.log("como estas que tal te va");
    if (item?.idEventFirebase) {
      router.push({
        pathname: "/(tabs)/search/comment",
        params: {
          item: item.idEventFirebase,
        },
      });
    } else {
      return;
    }
  };

  return (
    <>
      <Text style={styles.reporteTitulo}>Control Egresos</Text>
      <Text> </Text>
      {Platform.OS === "web" && (
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <OperacionDate filterButton={filter} quitFilterButton={quitfilter} />
        </View>
      )}{" "}
      <Text> </Text>
      <Text> </Text>
      <Reporte setAsset={setAsset} />
      <Text> </Text>
      <DataTable.Header>
        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Fecha</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Fecha Contable</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Unidad</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Descripcion</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Tipo Gasto</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Kilometraje</Text>
        </DataTable.Title>

        <DataTable.Title style={styles.titulo2}>
          <Text style={styles.titulo2}>Proveedor</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo3}>
          <Text style={styles.titulo3}>Egresos</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo3}>
          <Text style={styles.titulo3}>Comp Tipo</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.titulo3}>
          <Text style={styles.titulo3}>Acciones</Text>
        </DataTable.Title>
      </DataTable.Header>
      <ScrollView
        style={{ backgroundColor: "" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <DataTable>
          {post?.map((file: any, index: any) => {
            const FiveDaysInMillis = 5 * 24 * 60 * 60 * 1000;
            const fileDate = new Date(
              file?.fechaVencimiento?.seconds * 1000 +
                file?.fechaVencimiento?.nanoseconds / 1000000
            );

            const currentDate = new Date();
            const timeDifference = fileDate.getTime() - currentDate.getTime();
            const isExpiring = timeDifference <= FiveDaysInMillis;
            console.log("index", file.autor);

            const idFirebaseAsset = file?.idAssetFirebase || file?.autor;

            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {formatDate(file?.createdAt)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  {formatDate(file?.fechaContable)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.nombreAsset}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.descripcionGasto}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.tipoGasto}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.kilometraje}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.clienteNombre}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.costo} {file?.moneda}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.tipoComprobante}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <TouchableOpacity onPress={() => goToEditDocs(file)}>
                    <ImageExpo
                      source={require("../../../assets/pictures/editIcon2.png")}
                      style={[styles.roundImage10, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>
                  <Text>{"  .  "} </Text>

                  {file?.moneda ? (
                    <ImageExpo
                      source={require("../../../assets/reportes/green.svg")}
                      style={[styles.roundImage10, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  ) : (
                    <ImageExpo
                      source={require("../../../assets/pictures/trafficlight-red.webp")}
                      style={[styles.roundImage10, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
  //}
}

const formatDate = (dateInput: any) => {
  const { seconds, nanoseconds } = dateInput || {
    seconds: 0,
    nanoseconds: 0,
  };
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(milliseconds);
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
  const formattedDate = `${day} ${month} ${year}  `;
  return formattedDate;
};
