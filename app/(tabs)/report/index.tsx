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

export default function Report(props: any) {
  //fetch total users
  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );

  //user email , emailCompany
  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  //fetch global assets
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );

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
  // console.log(company);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  // glob state management
  const companyName =
    useSelector((state: RootState) => state.userId.companyName) ?? "";

  //state to see reports
  const [Documentos, setDocumentos] = useState(false);

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
  //real time updates
  const [data, setData] = useState();
  const [dataExcel, setDataExcel] = useState();
  console.log("dataExcel", dataExcel);

  useEffect(() => {
    if (Array.isArray(globalAssetList)) {
      setAreaList([
        ...new Set(globalAssetList?.map((item: any) => item.nombre)),
      ]);
    }
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setSearchResults([...globalAssetList, ...employeesList]);
    } else {
      const result: any = [...globalAssetList, ...employeesList]?.filter(
        (item: any) => {
          const re = new RegExp(searchText, "ig");
          return re.test(item.nombre) || re.test(item.placa);
        }
      );
      setSearchResults(result);
    }
  }, [searchText, globalAssetList, employeesList]);

  // Events
  useEffect(() => {
    if (emailCompany === user_email) {
      async function fetchData() {
        let queryRef;
        queryRef = query(
          collection(db, "Events"),
          limit(6),
          where("emailCompany", "==", emailCompany),
          orderBy("createdAt", "desc")
        );
        const getDocs1 = await getDocs(queryRef);
        const lista: any = [];
        // Process results from the first query
        if (getDocs1) {
          getDocs1.forEach((doc) => {
            lista.push(doc.data());
          });
        }
        setDataExcel(lista);
      }
      fetchData();
    }
  }, [user_email, emailCompany]);

  return (
    <>
      <SearchBar
        placeholder="Buscar Activo o Area"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "white" }}
      />
      <ScrollView
        style={{ backgroundColor: "#020617" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text> </Text>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity onPress={() => update_Area()}>
            <Image
              source={require("../../../assets/assetpics/companyIcon.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.reporteTitulo}>Reporte General</Text>

        {Platform.OS === "web" && (
          <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
            <Text style={{ color: "#DCDCDF", fontSize: 30 }}>
              {" "}
              Dias Pendientes:{" "}
            </Text>

            <Text> </Text>
            <input
              type="number"
              id="number"
              name="number"
              onChange={(event: any) => setDiasPendientes(event.target.value)}
            />
          </View>
        )}

        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Documentos de la Empresa</Text>
          </View>
          <TouchableOpacity onPress={() => setDocumentos(true)}>
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDocumentos(false)}>
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>

        {Documentos && (
          <View style={styles.container}>
            {searchResults.map((item: any, index: any) => {
              const filesList: any = [];

              const currentDate = new Date();

              item?.files
                ?.filter((file: any) => {
                  if (file.tipoFile !== "colocar mas tipos de archivos") {
                    const thirtyDaysInMillis =
                      diasPendientes * 24 * 60 * 60 * 1000;
                    const fileDate = new Date(
                      file.fechaVencimiento.seconds * 1000 +
                        file.fechaVencimiento.nanoseconds / 1000000
                    );
                    const timeDifference =
                      fileDate.getTime() - currentDate.getTime();
                    return timeDifference <= thirtyDaysInMillis;
                  }
                  return false;
                })
                .forEach((file: any) => {
                  filesList.push(file);
                });

              // Sort filesList by fechaVencimiento
              filesList.sort((a: any, b: any) => {
                const dateA = new Date(
                  a.fechaVencimiento.seconds * 1000 +
                    a.fechaVencimiento.nanoseconds / 1000000
                );
                const dateB = new Date(
                  b.fechaVencimiento.seconds * 1000 +
                    b.fechaVencimiento.nanoseconds / 1000000
                );
                return dateA.getTime() - dateB.getTime();
              });

              return (
                <View key={index} style={styles.table}>
                  <Text> </Text>
                  <Text> </Text>

                  <Text style={styles.item}>
                    {item?.placa || item?.nombre || item?.email}
                  </Text>
                  <DataTable key={index}>
                    <DataTable.Header>
                      <DataTable.Title style={styles.titulo2}>
                        <Text style={styles.titulo2}>Nombre</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.titulo3}>
                        <Text style={styles.titulo3}>Valor</Text>
                      </DataTable.Title>
                    </DataTable.Header>

                    {filesList?.map((file: any, fileIndex: any) => {
                      return (
                        <DataTable.Row key={fileIndex}>
                          <Text style={styles.multiLineColumn}>
                            {file?.tipoFile}
                          </Text>
                          <DataTable.Cell style={styles.shortColumn2}>
                            <Text style={styles.shortColumn2}>
                              {formatDate(file?.fechaVencimiento)}
                            </Text>
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    })}
                  </DataTable>
                </View>
              );
            })}
          </View>
        )}
        <Text></Text>
        <Text></Text>

        {user_email === emailCompany && (
          <TouchableOpacity onPress={() => getExcelReportData(dataExcel)}>
            <Image
              source={require("../../../assets/pictures/excel2.png")}
              style={styles.excel}
            />
          </TouchableOpacity>
        )}
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
