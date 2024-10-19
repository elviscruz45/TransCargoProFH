import * as Yup from "yup";
export function initialValues() {
  return {
    tipoEvento: "",
    comentarios: "",
    kilometraje: "",
    ubicacion: "",
    combustible: "",
    totalCombustible: "",
    facturacionFlete: "",
    pagoServicios: "",
    llanta: [],
    costoTotalRepuesto: "",
    repuesto: "",
    costoMantenimiento: "",
    userType: "",
    photoAssetURL: "",
    placa: "",
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
    tipoEvento: Yup.string().required("Campo obligatorio"),
    // ubicacion: Yup.object().required("Campo obligatorio"),
  });
}
