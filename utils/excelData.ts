import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import { saveAs } from "file-saver";
import { Timestamp } from "firebase/firestore";
import { array } from "yup";

interface Coordinates {
  latitude?: number;
  longitude?: number;
}
interface Data {
  createdAt: Timestamp | null;
  // other properties...
}
interface Ubicacion {
  coords?: Coordinates;
  timestamp?: string; // Formatted as a date string
}

interface EventDetails {
  // Main service details
  LastEventPosted: string; // Date formatted as string
  companyName: string;
  comentarios: string;

  // Costs
  costo: number;
  costoMantenimiento: string;
  costoTotalRepuesto: string;

  // User details
  emailCompany: string;
  emailPerfil: string;
  nombrePerfil: string;

  // Timestamps and dates
  createdAt: string; // Date formatted as string
  fechaPostFormato: string;
  fechaPostISO: string;

  // Transportation details
  kilometraje: string;
  placa: string;
  nombreAsset: string;

  // Event and maintenance
  idEventFirebase: string;
  idFirebaseAsset: string;
  tipoEvento: string;
  tipoGasto: string;

  // Images
  fotoPrincipal: string;
  photoAssetURL: string;
  photoProfileURL: string;

  // Optional fields
  llanta: string[]; // Array of strings for tires
  numeroFactura: string;
  pagoServicios: string;
  guiTransportista: string;
  guiaRemitente: string;

  // Location data
  ubicacion: Ubicacion;

  // Fuel and maintenance
  combustible: string;
  totalCombustible: string;

  // User type
  userType: string;
}
export const getExcelReportData = async (
  titulo: string,
  datas: EventDetails[] = []
) => {
  // const querySnapshot = collection(db, "ServiciosAIT");
  const post_array: any = [];

  datas.forEach((data: any) => {
    const arrayLlanta =
      data?.llanta.length > 0
        ? data?.llanta.filter((item: any) => item.selected)
        : [];

    const llantaPosicion = arrayLlanta.map((item: any) => item.value);

    const table = {
      Fecha_Creacion: formatDate(data?.createdAt?.seconds * 1000),
      Fecha_Contable: formatDateContable(data?.fechaContable) || "", // Fecha para contabilidad
      NombreAsset: data?.nombreAsset || "Unknown asset", // Asset name
      Placa: data?.placa || "", // License plate number
      Carroceria: data?.carroceria || "", // Bodywork
      Kilometraje: data.kilometraje || "", // Kilometrage, default if not provided
      Cantidad: data.cantidad || 0, // Default to 0 if no quantity is provided
      Unidad_Medida: data.unidadMedida || "", // Measurement unit
      Tipo_Carga: data.tipoCarga || "", // Type of load
      Comentarios: data.comentarios || "", // Handling empty comments
      Punto_Inicio: data.puntoInicio || "", // Starting point
      Punto_Llegada: data.puntoLlegada || "", // Destination
      Cliente_RUC: data.clienteRUC || "", // Customer RUC
      Numero_Factura: data.numeroFactura || "", // Invoice number
      Guia_Transportista: data.guiTransportista || "", // Transport guide
      Guia_Remitente: data.guiaRemitente || "", // Sender guide
      TipodeEvento: data.tipoEvento || "", // Type of event
      TipodeGasto: data.tipoGasto || "", // Type of expense
      Cantidad_combustible: data.combustible || "", // Fuel
      Tipo_Comprobante: data.tipoComprobante || "", // Type of voucher
      Costo: data.costo || 0, // Default to 0 if no cost is provided
      Moneda: data.moneda || "", // Currency
      EmailPerfil: data.emailPerfil || "No email provided", // Profile email
      FechaPostFormato: data.fechaPostFormato, // Formatted post date
      FotoPrincipal: data.fotoPrincipal || "", // Main photo URL
      Llanta_Posicion: JSON.stringify(llantaPosicion) || "", // List of tires, default to empty array
      Ubicacion: `https://www.google.com/maps?q=${data?.ubicacion?.coords?.latitude},${data?.ubicacion?.coords?.longitude}`,
      Tipo_de_Usuario: data.userType || "Unknown",
      Archivo_adjunto: data.pdfPrincipal || "", // Attached file
      //neuvos campo

      // Campos de facturación y pagos
      Facturacion_Flete: data?.facturacionFlete || "", // Facturación del flete
      Pago_Servicios: data?.pagoServicios || "", // Pagos por servicios prestados
      Costo_Total_Repuesto: data?.costoTotalRepuesto || 0, // Costo total de repuestos
      Costo_Mantenimiento: data?.costoMantenimiento || 0, // Costo de mantenimiento

      // Información del conductor y pagos
      Pago_Conductor: data?.pagoConductor || 0, // Monto pagado al conductor
      Nombre_Conductor: data?.nombreConductor || "", // Nombre del conductor

      // Detalles técnicos
      Tipo_Mantenimiento: data?.tipoMantto || "", // Tipo de mantenimiento realizado
      Precio_Unitario: data?.precioUnitario || 0, // Precio por unidad

      // Estado de facturación
      Factura_Pagada: data?.facturaPagada || "", // Estado de pago de la factura
      Fecha_de_Pago: data?.fechadePago || "", // Fecha cuando se realizó el pago
      En_Viaje: data?.enViaje || "", // Indica si está en viaje
      IGV: data?.igv || 0, // Impuesto General a las Ventas

      // Información de la compañía
      Nombre_Compania: data?.companyName || "", // Nombre de la empresa
      Email_Compania: data?.emailCompany || "", // Email de la empresa

      // Documentación adicional
      PDF_Archivo2: data?.pdfFile2 || "", // URL del segundo archivo PDF
      Nombre_Archivo2: data?.FilenameTitle2 || "", // Nombre del segundo archivo

      // Identificadores únicos
      ID_Firebase_Asset: data?.idFirebaseAsset || "", // ID del activo en Firebase
      ID_Event_Firebase: data?.idEventFirebase || "", // ID del evento en Firebase

      // Información del perfil
      Nombre_Perfil: data?.nombrePerfil || "", // Nombre del perfil del usuario
      Ultimo_Evento: data?.LastEventPosted || "",
    };
    post_array.push(table);
  });
  console.log("XLSX", XLSX);
  console.log("post_array", post_array);

  const worksheet = XLSX.utils.json_to_sheet(post_array);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, titulo);
  const excelFileBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  if (Platform.OS === "web") {
    // Web platform: use file-saver
    const blob = new Blob([excelFileBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "ReporteTransCargoPro.xlsx");
  } else {
    // Native platforms: use expo-file-system and expo-sharing
    const base64String = Buffer.from(excelFileBuffer).toString("base64");
    const fileUri = `${FileSystem.cacheDirectory}ReporteTransCargoPro.xlsx`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log("Error creating Excel file:", error);
    }
  }
};

function formatDate(timestamp: any) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}

const formatDateContable = (dateInput: any) => {
  const { seconds, nanoseconds } = dateInput || {
    seconds: 0,
    nanoseconds: 0,
  };
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${day}/${month}/${year}  `;
  return formattedDate;
};
