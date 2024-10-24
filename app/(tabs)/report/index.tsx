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
        style={{ backgroundColor: "white" }} // Add backgroundColor here
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

        <Text style={styles.company}>{area}</Text>

        {Platform.OS === "web" && (
          <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
            <Text> Dias Pendientes: </Text>

            <Text> </Text>
            <input
              type="number"
              id="number"
              name="number"
              onChange={(event: any) => setDiasPendientes(event.target.value)}
            />
          </View>
        )}

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
                  return (
                    timeDifference <= thirtyDaysInMillis && timeDifference >= 0
                  );
                }
                return false;
              })
              .forEach((file: any) => {
                filesList.push(file);
              });
            // item?.files?.map((file: any, index: any) => {
            //   filesList.push(file);
            // });

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
              <View key={index}>
                <Text> </Text>
                <Text> </Text>

                <Text style={styles.company}>
                  {item?.placa || item?.nombre || item?.email}
                </Text>
                <DataTable key={index}>
                  <DataTable.Header>
                    <DataTable.Title style={styles.titulo2}>
                      Nombre
                    </DataTable.Title>
                    <DataTable.Title style={styles.titulo3}>
                      Valor
                    </DataTable.Title>
                  </DataTable.Header>

                  {filesList?.map((file: any, fileIndex: any) => {
                    return (
                      <DataTable.Row key={fileIndex}>
                        <Text
                          style={styles.multiLineColumn}
                          // onPress={() => goToInformation(item.idServiciosAIT)}
                        >
                          {file?.tipoFile}
                        </Text>
                        <DataTable.Cell style={styles.shortColumn2}>
                          {formatDate(file?.fechaVencimiento)}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
              </View>
            );
          })}
        </View>
        <Text></Text>

        {/* <DateScreen
          filterButton={filter}
          quitFilterButton={() => quitfilter()}
        /> */}

        {/* <Text></Text>
        <Text></Text> */}
        {/* {company !== "FMI" && company !== "TOTAL CONTRATISTAS" && (
            <RecursosHumanos company={company} />
          )} */}

        {/* <Text></Text>
        <Text></Text>
        <Text></Text> */}
        {/* <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Servicios Activos Asignados</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setServiciosActivos(true)}
          >
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setServiciosActivos(false)}
          >
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View> */}

        {/* {true && (
            <>
              <PieChart data={data} />
              <ServiceList data={data} />
            </>
          )} */}
        <Text></Text>
        <Text></Text>

        {/* <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Estado de Servicios Activos</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setEstadoServicios(true)}
          >
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setEstadoServicios(false)}
          >
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View> */}
        {/* {estadoServicios && <EstadoServiceList data={data} />} */}
        <Text></Text>

        <Text></Text>
        {/* <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Servicios Inactivos</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setServiciosInactivos(true)}
          >
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setServiciosInactivos(false)}
          >
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View> */}
        <Text></Text>

        {/* {true && (
            <>
              <Text style={{ margin: 10 }}>
                <BarInactiveServices
                  data={data}
                  titulo={"Stand by"}
                  unidad={"servicios"}
                />
              </Text>
              <Text style={{ marginLeft: 10 }}>
                <BarInactiveServices
                  data={data}
                  titulo={"Cancelacion"}
                  unidad={"servicios"}
                />
              </Text>
              <InactiveServiceList data={data} />
            </>
          )} */}
        <Text></Text>

        {/* <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Monto Servicios</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setMontoServicios(true)}
          >
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          //  onPress={() => setMontoServicios(false)}
          >
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View> */}
        {/* {montoServicios && (
            <>
              <BarChartMontoServicios data={data} />
              <MontoServiceList data={data} />
            </>
          )} */}
        <Text></Text>

        <Text></Text>
        {/* <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Monto Estado de Pago</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setMontoEDP(true)}
          >
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setMontoEDP(false)}
          >
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View> */}
        {/* {montoEDP && (
            <>
              <BarChartProceso data={data} />
              <MontoEDPList data={data} />
            </>
          )} */}

        <Text></Text>

        <Text></Text>
        {/* 
        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Montos Comprometidos</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setComprometido(true)}
          >
            <Image
              source={require("../../../assets/pictures/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          //  onPress={() => setComprometido(false)}
          >
            <Image
              source={require("../../../assets/pictures/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View> */}

        {/* {comprometido && <MontoComprometido data={data} />} */}
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
