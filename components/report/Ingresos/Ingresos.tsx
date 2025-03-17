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
import { styles } from "./Ingresos.styles";
import { DateScreen } from "../DateScreen/DateScreen";
import { Modal } from "../../shared/Modal";
import { ChangeDisplayCompany } from "../ChangeCompany/ChangeCompany";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { DataTable } from "react-native-paper";
import { SearchBar, Icon } from "@rneui/themed";
import { getExcelReportData } from "../../../utils/excelData";
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
import { Reporte } from "../HeaderReporte/headerIngreso";
import { supabase } from "@/supabase/client";

export default function Operaciones(props: any) {
  const [post, setPost] = useState<any>([]);
  const [asset, setAsset] = useState("");

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
  const [cantidadAsset, setCantidadAsset] = useState(0);
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
        if (asset === "") {
          const { data: events, error } = await supabase
            .from("events")
            .select("*")
            .gte("fechaContable", startDate.toISOString()) // where "fechaContable" >= startDate
            .lte("fechaContable", endDate.toISOString()) // where "fechaContable" <= endDate
            .eq("emailCompany", emailCompany) // where "emailCompany" == emailCompany
            .eq("idFirebaseAsset", asset) // where "idFirebaseAsset" == asset
            .eq("tipoEvento", "1. Inicio Viaje") // where "tipoEvento" == "1. Inicio Viaje"
            .order("fechaContable", { ascending: false }) // orderBy "fechaContable" desc
            .limit(50); // limit 50

          setPost(events);
        } else {
          const { data: events, error } = await supabase
            .from("events")
            .select("*")
            .gte("fechaContable", startDate.toISOString()) // where "fechaContable" >= startDate
            .lte("fechaContable", endDate.toISOString()) // where "fechaContable" <= endDate
            .eq("emailCompany", emailCompany) // where "emailCompany" == emailCompany
            .eq("idFirebaseAsset", asset) // where "idFirebaseAsset" == asset
            .eq("tipoEvento", "1. Inicio Viaje") // where "tipoEvento" == "1. Inicio Viaje"
            .order("fechaContable", { ascending: false }) // orderBy "fechaContable" desc
            .limit(50); // limit 50

          setPost(events);
        }
      }

      fetchData();
    }
  }, [
    startDate,
    endDate,
    asset,
    emailCompany,
    user_email,
    globalFilteredAssetList,
  ]);

  // }, [startDate, endDate, asset]);

  //-----------------------------------------------------------------------------------
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const router = useRouter();

  const goToEditDocs = (item: any) => {
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

  const montoTotal = post?.reduce((acc: any, item: any) => {
    const monto =
      item?.moneda === "Dolares"
        ? Number(item?.precioUnitario) *
            Number(item?.cantidad) *
            Number(1 + item?.igv / 100) *
            3.7 ||
          Number(item?.precioUnitario) * Number(item?.cantidad) * 3.7 ||
          0
        : Number(item?.precioUnitario) *
            Number(item?.cantidad) *
            Number(1 + item?.igv / 100) ||
          Number(item?.precioUnitario) * Number(item?.cantidad) ||
          0;

    return acc + monto;
  }, 0);

  const cantidadViajando = post.reduce((acc: any, item: any) => {
    if (item?.enViaje === "Si") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const cantidadVueltas = post.reduce((acc: any, item: any) => {
    return Number(acc) + Number(item?.cantidadVueltasEquivalente ?? 0);
  }, 0);

  const cantidadFacturasEmitidas = post.reduce((acc: any, item: any) => {
    const monto =
      item?.moneda === "Dolares"
        ? Number(item?.precioUnitario) *
            Number(item?.cantidad) *
            Number(1 + item?.igv / 100) *
            3.7 ||
          Number(item?.precioUnitario) * Number(item?.cantidad) * 3.7 ||
          0
        : Number(item?.precioUnitario) *
            Number(item?.cantidad) *
            Number(1 + item?.igv / 100) ||
          Number(item?.precioUnitario) * Number(item?.cantidad) ||
          0;

    if (item.fechadeEmisionFactura) {
      return acc + monto;
    } else {
      return acc;
    }
  }, 0);

  const cantidadFacturasPagadas = post.reduce((acc: any, item: any) => {
    const monto =
      item?.moneda === "Dolares"
        ? Number(item?.precioUnitario) *
            Number(item?.cantidad) *
            Number(1 + item?.igv / 100) *
            3.7 ||
          Number(item?.precioUnitario) * Number(item?.cantidad) * 3.7 ||
          0
        : Number(item?.precioUnitario) *
            Number(item?.cantidad) *
            Number(1 + item?.igv / 100) ||
          Number(item?.precioUnitario) * Number(item?.cantidad) ||
          0;

    if (item.facturaPagada === "Si") {
      return acc + monto;
    } else {
      return acc;
    }
  }, 0);

  const FacturasPendientes: any =
    cantidadFacturasEmitidas - cantidadFacturasPagadas;

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.reporteTitulo}>Control de Ingresos</Text>
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
      )}
      <Text> </Text>
      <Text> </Text>
      <Reporte setAsset={setAsset} setCantidadAsset={setCantidadAsset} />
      <Text> </Text>
      <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
        Ingreso Total Operativo, Incluye IGV = S/.{" "}
        {new Intl.NumberFormat("en-US").format(montoTotal.toFixed(2))}
      </Text>
      <Text> </Text>
      {!asset && (
        <>
          <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
            Camiones en actividad = {cantidadViajando}
          </Text>
          <Text> </Text>
          <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
            Camiones Parados = {cantidadAsset - cantidadViajando}
          </Text>
          <Text> </Text>
          {/* <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
            Camiones en Mantenimiento = 1
          </Text>{" "} */}
          {/* <Text> </Text> */}
        </>
      )}
      <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
        Cantidad de Vueltas= {cantidadVueltas}
      </Text>
      <Text> </Text>
      <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
        Monto Facturas Emitidas, Incluye IGV = S/.{" "}
        {new Intl.NumberFormat("en-US").format(
          cantidadFacturasEmitidas.toFixed(2)
        )}
      </Text>
      <Text> </Text>
      <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
        Monto Facturas Pagadas, Incluye IGV = S/.{" "}
        {new Intl.NumberFormat("en-US").format(
          cantidadFacturasPagadas.toFixed(2)
        )}
      </Text>
      <Text> </Text>
      <Text style={{ marginLeft: 15, fontWeight: "black", color: "blue" }}>
        Pendiente de Pago, Incluye IGV = S/.{" "}
        {new Intl.NumberFormat("en-US").format(FacturasPendientes.toFixed(2))}
      </Text>
      <Text> </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          minWidth: "100%", // Ensure it fills the entire width
        }}
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        {/* <ScrollView
          style={{ backgroundColor: "white" }}
          showsVerticalScrollIndicator={true}
        > */}
        <DataTable style={{ width: "100%" }}>
          <DataTable.Header>
            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Placa</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Fecha Inicio</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Viajando / Lavado</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Cliente</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Carga</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Guia Transp</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Kilometraje</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Prox Preventivo</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Viaje Inicio</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Viaje Fin</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Factura</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Cantidad</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>PU</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Monto Total</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Fecha Emision Factura</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo2}>
              <Text style={styles.titulo2}>Fecha Pago Factura</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Conductor</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>S/. Pago</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Vueltas Eq</Text>
            </DataTable.Title>

            <DataTable.Title style={styles.titulo3}>
              <Text style={styles.titulo3}>Acciones</Text>
            </DataTable.Title>
          </DataTable.Header>

          {post?.map((file: any, index: any) => {
            const FiveDaysInMillis = 5 * 24 * 60 * 60 * 1000;
            const fileDate = new Date(file?.fechaVencimiento);

            const currentDate = new Date();
            const timeDifference = fileDate.getTime() - currentDate.getTime();
            const isExpiring = timeDifference <= FiveDaysInMillis;

            const idFirebaseAsset = file?.idAssetFirebase || file?.autor;

            const proxManttoPreventivo = [
              Number(file?.cambioAceiteProx ?? Infinity),
              Number(file?.cambioAceiteCajaProx ?? Infinity),
              Number(file?.cambioAceiteDifProx ?? Infinity),
              Number(file?.cambioHidrolinaProx ?? Infinity),
              Number(file?.cambioRefrigeranteProx ?? Infinity),
              Number(file?.cambioFiltrosProx ?? Infinity),
            ].filter((item) => item > 0);

            const proxKilometrajeMantto =
              proxManttoPreventivo.length > 0 &&
              Math.min(...proxManttoPreventivo);

            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.nombreAsset}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {formatDate(file?.fechaContable)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  {file?.enViaje === "Si" ? (
                    <ImageExpo
                      source={require("../../../assets/reportes/truck-on.png")}
                      style={[styles.roundImage11, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  ) : (
                    <ImageExpo
                      source={require("../../../assets/reportes/truck-off.png")}
                      style={[styles.roundImage11, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  )}
                  {file?.LavadoyEngrase === "Si" ? (
                    <ImageExpo
                      source={require("../../../assets/images/lavado.png")}
                      style={[styles.roundImage12, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  ) : null}
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.clienteNombre}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.tipoCarga}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.guiTransportista}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {new Intl.NumberFormat("en-US").format(file?.kilometraje)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn3}>
                  <Text
                    style={
                      proxKilometrajeMantto == Infinity
                        ? styles.shortColumn3
                        : Number(proxKilometrajeMantto) -
                            Number(file?.kilometraje) >
                          1000
                        ? styles.shortColumn3
                        : styles.shortColumn2
                    }
                  >
                    {Number(proxKilometrajeMantto) - Number(file?.kilometraje) >
                    -35000
                      ? new Intl.NumberFormat("en-US").format(
                          Number(
                            (
                              Number(proxKilometrajeMantto) -
                              Number(file?.kilometraje)
                            ).toFixed(2)
                          ) || Infinity
                        )
                      : "∞"}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.puntoInicio}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.puntoLlegada}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>{file?.numeroFactura}</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.cantidad} {file?.unidadMedida}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.moneda === "Dolares"
                      ? "$ "
                      : file?.moneda === "Euros"
                      ? "EUR "
                      : "S/. "}
                    {new Intl.NumberFormat("en-US").format(
                      Number((Number(file?.precioUnitario) || 0).toFixed(2))
                    )}{" "}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.moneda === "Dolares"
                      ? "$ "
                      : file?.moneda === "Euros"
                      ? "EUR "
                      : "S/. "}
                    {new Intl.NumberFormat("en-US").format(
                      Number(
                        (
                          Number(file?.precioUnitario) *
                            Number(file?.cantidad) *
                            Number(1 + file?.igv / 100) ||
                          Number(file?.precioUnitario) *
                            Number(file?.cantidad) ||
                          0
                        ).toFixed(2)
                      )
                    )}{" "}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {formatDate(file?.fechadeEmisionFactura)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {formatDate(file?.fechadePago)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {file?.nombreConductor?.split(".")[0]}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {new Intl.NumberFormat("en-US").format(
                      file?.pagoConductor || 0
                    )}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <Text style={styles.shortColumn2}>
                    {new Intl.NumberFormat("en-US").format(
                      file?.cantidadVueltasEquivalente || 0
                    )}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.shortColumn2}>
                  <TouchableOpacity onPress={() => goToEditDocs(file)}>
                    <ImageExpo
                      source={require("../../../assets/reportes/views.png")}
                      style={[styles.roundImage10, { alignSelf: "center" }]}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>
                  <Text>{"  .  "} </Text>
                  {file?.facturaPagada === "Si" ? (
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
        {/* </ScrollView> */}
      </ScrollView>
      <Text> </Text>
      <Text> </Text>
      <TouchableOpacity
        onPress={() => getExcelReportData("Control de Ingresos", post)}
      >
        <Text> </Text>

        <ImageExpo
          source={require("../../../assets/pictures/excel2.png")}
          style={styles.excel}
        />
        <Text> </Text>
      </TouchableOpacity>
      <Text> </Text>
      <Text
        style={{
          marginLeft: 15,
          fontWeight: "black",
          fontSize: 10,
        }}
      >
        Tasa de Cambio 3.7 soles = 1 dolar
      </Text>
      <Text> </Text>
      <Text> </Text>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </ScrollView>
  );
}

const formatDate = (dateInput: any) => {
  if (!dateInput) {
    return "";
  }

  // const { seconds, nanoseconds } = dateInput || {
  //   seconds: 0,
  //   nanoseconds: 0,
  // };
  // const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(dateInput);
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
