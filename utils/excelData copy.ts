import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";
interface Table {
  // Datos principales del servicio
  Numero_Servicio: string | undefined;
  Nombre_Servicio: string | undefined;
  Tipo_Servicio: string | undefined;
  Nombre_Empresa: string;
  Fecha_Post_Formato: string;
  Fecha_Ultimo_Evento_Posteado: { seconds: number; nanoseconds: number };
  // Fecha_Ultimo_Evento_Posteado: string | null;

  Numero_Cotizacion: string | undefined;
  FechaFin_original: string | undefined;
  // Usuario
  Email_Creador_servicio: string;
  Nombre_Autor: string;
  // Responsables, interacciones
  ResponsableEmpresaUsuario: string | undefined;
  ResponsableEmpresaContratista: string | undefined;
  AreaServicio: string | undefined;
  // Monto y HH
  HorasHombre: number | undefined;
  Moneda: string | undefined;
  Monto: number;
  // Fechas
  FechaPostISO: string;
  // Fecha_Creacion: string | null;
  Fecha_Creacion: { seconds: number; nanoseconds: number };

  Fecha_Final_Ejecucion: string | undefined;
  // Avances
  AvanceEjecucion: string | undefined;
  AvanceAdministrativoTexto: string | undefined;
  // Modificaciones (Optional fields, can be uncommented as needed)
  // Nueva_Fecha_Fin_Estimada?: string;
  // HHModificado?: number;
  // MontoModificado?: number;
  // Events
  // Events?: string;
  // Id_Servicios_Cloud?: string;
  Cantidad_Docs: number | undefined;
  // Additional fields from new structure
  Comentarios: string;
  FotoPrincipal: string;
  Kilometraje: string;
  Nombre_Asset: string;
  Placa: string;
  TipoEvento: string;
  Ubicacion: { coords: { lat: number; lng: number }; timestamp: number };
  UserType: string;
}

export const getExcelReportData = async (datas: Table[] = []) => {
  // const querySnapshot = collection(db, "ServiciosAIT");
  const post_array: any = [];

  datas.forEach((data) => {
    const table = {
      // Datos principales del servicio
      Numero_Servicio: data.Numero_Servicio,
      Nombre_Servicio: data.Nombre_Servicio,
      Tipo_Servicio: data.Tipo_Servicio,
      Nombre_Empresa: data.Nombre_Empresa,
      Fecha_Post_Formato: data.Fecha_Post_Formato,
      Fecha_Ultimo_Evento_Posteado: formatDate(
        data.Fecha_Ultimo_Evento_Posteado?.seconds * 1000
      ),
      Numero_Cotizacion: data.Numero_Cotizacion,
      FechaFin_original: data.FechaFin_original,
      // Usuario
      Email_Creador_servicio: data.Email_Creador_servicio,
      Nombre_Autor: data.Nombre_Autor,
      // Responsables, interacciones
      ResponsableEmpresaUsuario: data.ResponsableEmpresaUsuario,
      ResponsableEmpresaContratista: data.ResponsableEmpresaContratista,
      AreaServicio: data.AreaServicio,
      // Monto y HH
      HorasHombre: data.HorasHombre,
      Moneda: data.Moneda,
      Monto: data.Monto,
      // Fechas
      FechaPostISO: data.FechaPostISO,
      Fecha_Creacion: formatDate(data.Fecha_Creacion?.seconds * 1000),
      Fecha_Final_Ejecucion: data.Fecha_Final_Ejecucion,
      // Avances
      AvanceEjecucion: data.AvanceEjecucion,
      AvanceAdministrativoTexto: data.AvanceAdministrativoTexto,
      // Modificaciones
      // Nueva_Fecha_Fin_Estimada: data.Nueva_Fecha_Fin_Estimada, // Uncomment when needed
      // HHModificado: data.HHModificado, // Uncomment when needed
      // MontoModificado: data.MontoModificado, // Uncomment when needed
      // Events
      // Events: JSON.stringify(data.Events), // Uncomment when needed
      // Id_Servicios_Cloud: data.Id_Servicios_Cloud, // Uncomment when needed
      Cantidad_Docs: data.Cantidad_Docs,
      // Additional fields from new structure
      Comentarios: data.Comentarios,
      FotoPrincipal: data.FotoPrincipal,
      Kilometraje: data.Kilometraje,
      Nombre_Asset: data.Nombre_Asset,
      Placa: data.Placa,
      TipoEvento: data.TipoEvento,
      Ubicacion: data.Ubicacion,
      UserType: data.UserType,
    };
    post_array.push(table);
  });
  console.log("XLSX", XLSX);

  const worksheet = XLSX.utils.json_to_sheet(post_array);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelFileBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  const base64String = Buffer.from(excelFileBuffer).toString("base64");
  const fileUri = `${FileSystem.cacheDirectory}dataset.xlsx`;

  try {
    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Sharing.shareAsync(fileUri);
  } catch (error) {
    console.log("Error creating Excel file:", error);
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
