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
export const getExcelReportData = async (datas: EventDetails[] = []) => {
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
    };
    post_array.push(table);
  });
  console.log("XLSX", XLSX);
  console.log("post_array", post_array);

  const worksheet = XLSX.utils.json_to_sheet(post_array);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelFileBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  if (Platform.OS === "web") {
    // Web platform: use file-saver
    const blob = new Blob([excelFileBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "dataset.xlsx");
  } else {
    // Native platforms: use expo-file-system and expo-sharing
    const base64String = Buffer.from(excelFileBuffer).toString("base64");
    const fileUri = `${FileSystem.cacheDirectory}dataset.xlsx`;

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
