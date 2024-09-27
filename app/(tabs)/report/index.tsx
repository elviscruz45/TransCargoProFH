import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { styles } from "./index.styles";
import { DateScreen } from "../../../components/report/DateScreen/DateScreen";
// import { PieChart } from "../RecursosScreen/PieStatus";
// import { BarChartMontoServicios } from "../RecursosScreen/BarChartMontoServicios";
// import { BarChartProceso } from "../RecursosScreen/BarChartProceso";
// import { ServiceList } from "../RecursosScreen/ServiceList";
// import { InactiveServiceList } from "../RecursosScreen/InactiveServiceList";
// import { MontoEDPList } from "../RecursosScreen/MontoEDPList";
// import { MontoServiceList } from "../RecursosScreen/MontoServiceList";
// import { RecursosHumanos } from "../RecursosScreen/RecursosHumanos";
// import { BarInactiveServices } from "../RecursosScreen/BarInactiveServices";
// import { MontoComprometido } from "../RecursosScreen/MontoComprometido";
// import { getExcelReportData } from "../../../utils/excelData";
// import { EstadoServiceList } from "../RecursosScreen/EstadoServiceList";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
import { Modal } from "../../../components/shared/Modal";
import { ChangeDisplayCompany } from "../../../components/report/ChangeCompany/ChangeCompany";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

export default function Report(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const [area, setArea] = useState("GERENCIA");
  const [areaList, setAreaList] = useState<any>([]);

  //states of filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [removeFilter, setRemoveFilter] = useState(true);
  // console.log(company);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const [companyList, setCompanyList] = useState();
  // glob state management
  const companyName =
    useSelector((state: RootState) => state.userId.companyName) ?? "";
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
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

  // //states to view the tables
  // const [serviciosActivos, setServiciosActivos] = useState(false);
  // const [estadoServicios, setEstadoServicios] = useState(false);
  // const [serviciosInactivos, setServiciosInactivos] = useState(false);
  // const [montoServicios, setMontoServicios] = useState(false);
  // const [montoEDP, setMontoEDP] = useState(false);
  // const [comprometido, setComprometido] = useState(false);
  // //Data about the company belong this event

  // useEffect(() => {
  //   setCompanyList([
  //     ...new Set(globalAssetList.map((item) => item.companyName)),
  //   ]);
  //   if (companyName !== "FMI") {
  //     setCompany(companyName);
  //   }
  // }, []);

  useEffect(() => {
    if (Array.isArray(globalAssetList)) {
      setAreaList([
        ...new Set(globalAssetList?.map((item: any) => item.nombre)),
      ]);
    }
    // if (companyName !== "FMI") {
    //   setArea(companyName);
    // }
  }, []);

  // useEffect(() => {
  //   if (props.servicesData && company === "TOTAL CONTRATISTAS") {
  //     setData(props.servicesData);
  //   }
  //   // if (company !== "TOTAL CONTRATISTAS") {
  //   //   setData(
  //   //     props.servicesData.filter(
  //   //       (item) => item.companyName?.toUpperCase() === company
  //   //     )
  //   //   );
  //   // }
  //   if (company !== "TOTAL CONTRATISTAS" && Array.isArray(props.servicesData)) {
  //     setData(
  //       props.servicesData.filter(
  //         (item) => item.companyName?.toUpperCase() === company
  //       )
  //     );
  //   }
  // }, [props.servicesData, company]);

  // if (!data || !company || !companyList) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: "white",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           fontSize: 50,
  //           // fontFamily: "Arial",
  //           color: "#2A3B76",
  //         }}
  //       >
  //         Bienvenido
  //       </Text>
  //     </View>
  //   );
  // } else {
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text></Text>
        <View style={{ alignSelf: "center" }}>
          {"FMI" === "FMI" ? (
            <TouchableOpacity onPress={() => update_Area()}>
              <Image
                source={require("../../../assets/assetpics/companyIcon.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUpload}
            />
          )}

          {/* <TouchableOpacity
          // onPress={() => goToHistoryScreen()}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.history}
            />
          </TouchableOpacity> */}
        </View>
        {"FMI" !== "FMI" ? (
          <Text style={styles.company}>"Maxnicol"</Text>
        ) : (
          <Text style={styles.company}>{area}</Text>
        )}
        <Text></Text>
        <Text></Text>

        {/* <DateScreen
          filterButton={filter}
          quitFilterButton={() => quitfilter()}
        /> */}

        <Text></Text>
        <Text></Text>
        {/* {company !== "FMI" && company !== "TOTAL CONTRATISTAS" && (
            <RecursosHumanos company={company} />
          )} */}

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={styles.iconMinMax}>
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
        </View>

        {/* {true && (
            <>
              <PieChart data={data} />
              <ServiceList data={data} />
            </>
          )} */}
        <Text></Text>
        <Text></Text>

        <View style={styles.iconMinMax}>
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
        </View>
        {/* {estadoServicios && <EstadoServiceList data={data} />} */}
        <Text></Text>

        <Text></Text>
        <View style={styles.iconMinMax}>
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
        </View>
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

        <View style={styles.iconMinMax}>
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
        </View>
        {/* {montoServicios && (
            <>
              <BarChartMontoServicios data={data} />
              <MontoServiceList data={data} />
            </>
          )} */}
        <Text></Text>

        <Text></Text>
        <View style={styles.iconMinMax}>
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
        </View>
        {/* {montoEDP && (
            <>
              <BarChartProceso data={data} />
              <MontoEDPList data={data} />
            </>
          )} */}

        <Text></Text>

        <Text></Text>

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
        </View>

        {/* {comprometido && <MontoComprometido data={data} />} */}
        <Text></Text>

        <TouchableOpacity
        // onPress={() => getExcelReportData(data)}
        >
          <Image
            source={require("../../../assets/pictures/excel2.png")}
            style={styles.excel}
          />
        </TouchableOpacity>
      </ScrollView>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
  //}
}
