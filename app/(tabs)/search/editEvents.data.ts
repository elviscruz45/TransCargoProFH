import * as Yup from "yup";
export function initialValues() {
  return {
    tipoEvento: "",
    comentarios: "",
    kilometraje: "",
    ubicacion: "",
    combustible: "",
    facturacionFlete: "",
    pagoServicios: "",
    llanta: [],
    costoTotalRepuesto: "",
    repuesto: "",
    costoMantenimiento: "",
    costo: 0,
    userType: "",
    photoAssetURL: "",
    placa: "",
    //Adicional
    tipoGasto: "",
    numeroFactura: "",
    guiaRemitente: "",
    guiTransportista: "",
    carroceria: "",
    cantidad: 0,
    unidadMedida: "",
    tipoCarga: "",
    puntoInicio: "",
    puntoLlegada: "",
    clienteRUC: "",
    tipoComprobante: "",
    moneda: "",

    //Datos Adicionales para Firebase
    fechaPostFormato: "",
    fechaPostISO: new Date().toISOString(),
    fotoPrincipal: "",
    createdAt: new Date(),
    LastEventPosted: new Date(),
    photoProfileURL: "",
    emailPerfil: "",
    emailCompany: "",
    nombrePerfil: "",
    nombreAsset: "",
    companyName: "",
    idFirebaseAsset: "",
    idEventFirebase: "",
  };
}
export function validationSchema() {
  return Yup.object({
    // tipoEvento: Yup.string().required("Campo obligatorio"),
    // ubicacion: Yup.object().required("Campo obligatorio"),
  });
}
