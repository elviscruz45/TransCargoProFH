import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import { saveAs } from "file-saver";
interface Coordinates {
  latitude?: number;
  longitude?: number;
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

  datas.forEach((data) => {
    const table = {
      // Main service details
      // LastEventPosted: formatDate(new Date(data.LastEventPosted.seconds * 1000)), // Formatting Timestamp to readable date
      companyName: data.companyName || "Anonimo", // Default to 'Anonimo' if no company name is provided
      comentarios: data.comentarios || "No comments provided", // Handling empty comments

      // Costs
      costo: data.costo || 0, // Default to 0 if no cost is provided
      costoMantenimiento: data.costoMantenimiento || "N/A", // Maintenance cost, default value if not provided
      costoTotalRepuesto: data.costoTotalRepuesto || "N/A", // Total cost of spare parts

      // User details
      emailCompany: data.emailCompany || "No email provided", // Company email
      emailPerfil: data.emailPerfil || "No email provided", // Profile email
      nombrePerfil: data.nombrePerfil || "Anonymous", // Profile name

      // Timestamps and dates
      // createdAt: formatDate(new Date(data.createdAt.seconds * 1000)), // Formatting Timestamp
      fechaPostFormato: data.fechaPostFormato, // Formatted post date
      fechaPostISO: data.fechaPostISO, // ISO formatted date

      // Transportation details
      kilometraje: data.kilometraje || "Unknown", // Kilometrage, default if not provided
      placa: data.placa || "Unknown", // License plate number
      nombreAsset: data.nombreAsset || "Unknown asset", // Asset name

      // Event and maintenance
      idEventFirebase: data.idEventFirebase, // Event ID
      idFirebaseAsset: data.idFirebaseAsset, // Asset ID in Firebase
      tipoEvento: data.tipoEvento || "Unknown event", // Type of event
      tipoGasto: data.tipoGasto || "Unknown expense", // Type of expense

      // Images
      fotoPrincipal: data.fotoPrincipal || "No image available", // Main photo URL
      photoAssetURL: data.photoAssetURL || "No asset image available", // Asset photo URL
      photoProfileURL: data.photoProfileURL || "No profile image available", // Profile image URL

      // Optional fields
      llanta: data.llanta || [], // List of tires, default to empty array
      numeroFactura: data.numeroFactura || "Not provided", // Invoice number
      pagoServicios: data.pagoServicios || "N/A", // Payment services
      guiTransportista: data.guiTransportista || "N/A", // Transport guide
      guiaRemitente: data.guiaRemitente || "N/A", // Sender guide

      // Location data
      ubicacion: {
        coords: data.ubicacion?.coords || {}, // Coordinates
        timestamp: formatDate(new Date(data.ubicacion?.timestamp || 0)), // Location timestamp
      },

      // Fuel and maintenance
      combustible: data.combustible || "N/A", // Fuel
      totalCombustible: data.totalCombustible || "N/A", // Total fuel consumption

      // User type
      userType: data.userType || "Unknown",
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

// datas.forEach((data) => {
//   const table = {
//     //Datos principales del servicio
//     Numero_Servicio: data.NumeroAIT, //ok
//     Nombre_Servicio: data.NombreServicio, //ok
//     Tipo_Servicio: data.TipoServicio, //ok
//     Nombre_Empresa: data.companyName, //ok
//     Fecha_Post_Formato: data.fechaPostFormato, //ok
//     Fecha_Ultimo_Evento_Posteado: formatDate(data.LastEventPosted?.toDate().getTime()), //ok
//     Numero_Cotizacion: data.NumeroCotizacion, //ok
//     FechaFin_original: data.FechaFin, //ok
//     //Usuario
//     Email_Creador_servicio: data.emailPerfil, //ok
//     Nombre_Autor: data.nombrePerfil, //ok
//     // Responsables ,interacciones
//     ResponsableEmpresaUsuario: data.ResponsableEmpresaUsuario, //ok
//     ResponsableEmpresaContratista: data.ResponsableEmpresaContratista, //ok
//     AreaServicio: data.AreaServicio, //ok
//     //Monto y HH
//     HorasHombre: data.HorasHombre, //ok
//     Moneda: data.Moneda, //ok
//     Monto: data.Monto, //ok
//     //Fechas
//     FechaPostISO: data.fechaPostISO, //ok
//     Fecha_Creacion: formatDate(data.createdAt?.toDate().getTime()), //ok
//     Fecha_Final_Ejecucion: data?.fechaFinEjecucion,
//     //ok
//     //Avances
//     AvanceEjecucion: data.AvanceEjecucion, //ok
//     AvanceAdministrativoTexto: data.AvanceAdministrativoTexto, //ok
//     //Modificaciones
//     // Nueva_Fecha_Fin_Estimada: data.NuevaFechaEstimada, //ok
//     // HHModificado: data.HHModificado, //ok
//     // MontoModificado: data.MontoModificado, //ok
//     //events
//     // Events: JSON.stringify(data.events), //ok
//     // Id_Servicios_Cloud: data.idServiciosAIT, //ok
//     Cantidad_Docs: data.pdfFiles?.length, //ok
//   };
//   post_array.push(table);
// });
