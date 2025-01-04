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
import { styles } from "./Documents.styles";
import { DateScreen } from "../../../components/report/DateScreen/DateScreen";
import { Modal } from "../../../components/shared/Modal";
import { ChangeDisplayCompany } from "../../../components/report/ChangeCompany/ChangeCompany";
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

export default function Documents(props: any) {
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [removeFilter, setRemoveFilter] = useState(true);
  const [diasPendientes, setDiasPendientes] = useState(30);
  //real time updates
  const [data, setData] = useState();
  const [dataExcel, setDataExcel] = useState();
  //state to see reports
  const [Documentos, setDocumentos] = useState(false);

  //-----------------------------------------------------------------------------------
  // trayendo data
  //fetch total users
  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );
  const employeeFileList = employeesList
    ?.map((item: any) => item.files)
    .flat()
    .filter((file: any) => file !== undefined);

  //fetch global assets
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );

  const globalAssetFileList = globalAssetList
    ?.map((item: any) => item.files)
    .flat()
    .filter((file: any) => file !== undefined && !file.deactivated);

  const ChartTotalnoDate = globalAssetFileList.concat(employeeFileList);

  //Filtrar por fecha de vencimiento
  const diasPendientesInMiliseconds = diasPendientes * 24 * 60 * 60 * 1000;
  const currentDate = new Date();

  const ChartTotal = ChartTotalnoDate?.filter((file: any) => {
    const fileDate = new Date(
      file.fechaVencimiento.seconds * 1000 +
        file.fechaVencimiento.nanoseconds / 1000000
    );
    const timeDifference = fileDate.getTime() - currentDate.getTime();

    return timeDifference <= diasPendientesInMiliseconds;
  });

  //-------------------------------------------------------------------------------------

  //user email , emailCompany
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  //Changing the value to activate again the filter to rende the posts
  const filter = (start: any, end: any) => {
    setStartDate(start);
    setEndDate(end);
  };
  const quitfilter = () => {
    setRemoveFilter((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
  };

  const update_Area = () => {
    setRenderComponent(
      <ChangeDisplayCompany
        onClose={onCloseOpenModal}
        setArea={setArea}
        areaList={areaList}
      />
    );
    setShowModal(true);
  };

  //this modify when searching data
  useEffect(() => {
    if (searchText === "") {
      setSearchResults([...ChartTotal]);
    } else {
      const result: any = [...ChartTotal]?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return (
          re.test(item?.nombre) ||
          re.test(item?.placa) ||
          re.test(item?.pdfFileURL) ||
          re.test(item?.tipoFile)
        );
      });
      setSearchResults(result);
    }
  }, [searchText, globalAssetList, employeesList, diasPendientes]);
  const router = useRouter();

  const goToEditDocs = (item: any) => {
    console.log("item", item, item.idAssetFirebase, item.autor);

    if (item?.idAssetFirebase || !item?.autor.includes("@")) {
      router.push({
        pathname:
          item?.pdfFileURL?.includes(".") || item?.nombre?.includes(".")
            ? "/profile/editFiles"
            : "/search/editFiles",
        params: {
          tipoFile: item?.tipoFile,
          uidDoc: item?.idAssetFirebase || item?.autor,
          FilenameTitle: item?.FilenameTitle,
          fechaPostFormato: item?.fechaPostFormato,
        },
      });
    } else {
      console.log("holaaaa");
      return;
    }
  };

  return (
    <>
      <Text style={styles.reporteTitulo}>Control Documentario</Text>
      <Text> </Text>
      <SearchBar
        placeholder="Buscar nombre de archivo o por placa o por area"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "white" }}
      />
      <Text> </Text>
      {Platform.OS === "web" && (
        <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
          <Text style={{ color: "" }}> Dias Pendientes: </Text>

          <Text> </Text>
          <input
            type="number"
            id="number"
            name="number"
            onChange={(event: any) => setDiasPendientes(event.target.value)}
          />
        </View>
      )}

      <Text> </Text>
      <ScrollView
        horizontal={true}
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={Platform.OS === "web" ? true : false}
      >
        <ScrollView
          style={{ backgroundColor: "white" }}
          showsVerticalScrollIndicator={true}
        >
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.titulo2}>
                <Text style={styles.titulo2}>Nombre / Area</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.titulo2}>
                <Text style={styles.titulo2}>Archivo</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.titulo3}>
                <Text style={styles.titulo3}>Fecha</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.titulo3}>
                <Text style={styles.titulo3}>Acciones</Text>
              </DataTable.Title>
            </DataTable.Header>

            {searchResults?.map((file: any, index: any) => {
              const FiveDaysInMillis = 5 * 24 * 60 * 60 * 1000;
              const fileDate = new Date(
                file.fechaVencimiento.seconds * 1000 +
                  file.fechaVencimiento.nanoseconds / 1000000
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
                      {file?.placa ||
                        file?.nombre ||
                        file?.email ||
                        file?.pdfFileURL}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.shortColumn2}>
                    <Text style={styles.shortColumn2}>{file?.tipoFile}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.shortColumn2}>
                    <Text style={styles.shortColumn2}>
                      {formatDate(file?.fechaVencimiento)}
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
                    {isExpiring ? (
                      <ImageExpo
                        source={require("../../../assets/pictures/trafficlight-red.webp")}
                        style={[styles.roundImage10, { alignSelf: "center" }]}
                        cachePolicy={"memory-disk"}
                      />
                    ) : (
                      <ImageExpo
                        source={require("../../../assets/reportes/green.svg")}
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
      </ScrollView>
      <Text></Text>
      <Text></Text>

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
