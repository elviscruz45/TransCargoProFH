import * as Yup from "yup";
export function initialValues() {
  return {
    nombre: "",
    tipoActivo: "",
    tracto: "Carroceria",
    reporte: "",
    //informacion personal
    dni: "",
    //informacion activo
    placa: "",
    fechaFabricacion: "",
    categoriaVehiculo: "",
    numeroMotor: "",
    marca: "",
    modelo: "",
    // kilometraje: "",
    numeroChasis: "",
    //datos Vehiculo
    claseVehiculo: "",
    potencia: "",
    tipoCombustible: "",
    numeroSerie: "",
    pesoNeto: "",
    cargaUtil: "",
    pesoBruto: "",
    dimensiones: "",
    color: "",
    carroceria: "",
    ejes: "",
    //activo Calculos
    kilometraje: "",
    gastoCombustible: null,
    cambioAceiteProx: null,
    cambioAceiteCajaProx: "",
    cambioAceiteDifProx: "",
    cambioHidrolinaProx: "",
    cambioRefrigeranteProx: "",
    cambioFiltrosProx: "",
    //
    redimientoCombustible: "",
    facturacionFleteYTD: "",
    cantidadServiciosYTD: "",
    gastosTotalYTD: "",
    //Documentacion Personal
    licenciaA3: new Date(2024, 0, 1),
    licenciaA4: new Date(2024, 0, 1),
    certificadoSalud: new Date(2024, 0, 1),
    recordConductor: new Date(2024, 0, 1),
    iqbfConductor: new Date(2024, 0, 1),
    manejoDefensivo: new Date(2024, 0, 1),
    seguroVidaLey: new Date(2024, 0, 1),
    sctrSalud: new Date(2024, 0, 1),
    sctrPension: new Date(2024, 0, 1),
    //Documentacion Vehicular
    habilitacionVehicular: new Date(2024, 0, 1),
    resolucionMaterialesPeligrosos: new Date(2024, 0, 1),
    inspeccionTecnica: new Date(2024, 0, 1),
    planContingencia: new Date(2024, 0, 1),
    RDHabilitacion: new Date(2024, 0, 1),
    partidaRegistral: new Date(2024, 0, 1),
    sunatIQBF: new Date(2024, 0, 1),
    soat: new Date(2024, 0, 1),
    polizaResponsabilidadCivil: new Date(2024, 0, 1),
    //Datos Empresa
    FichaRUC: new Date(2024, 0, 1),
    SeguroCarga: new Date(2024, 0, 1),
    //Datos Adicionales para Firebase
    fechaPostFormato: "",
    fechaPostISO: new Date().toISOString(),
    createdAt: new Date(),
    LastEventPosted: new Date(),
    photoServiceURL: "",
    emailPerfil: "",
    nombrePerfil: "",
    companyName: "",
    emailCompany: "",
    idFirebaseAsset: "",

    //user assigned
    userAssigned: [],
    files: [],
  };
}

export function validationSchema() {
  return Yup.object({
    tipoActivo: Yup.string().required("Campo obligatorio"),
    nombre: Yup.string().required("Campo obligatorio"),

    // NumeroAIT: Yup.string().required("Campo obligatorio"),
    // AreaServicio: Yup.string().required("Campo obligatorio"),
    // TipoServicio: Yup.string().required("Campo obligatorio"),
    // ResponsableEmpresaUsuario: Yup.string().required("Campo obligatorio"),
    // ResponsableEmpresaContratista: Yup.string().required("Campo obligatorio"),
    // FechaInicio: Yup.date().required("Campo obligatorio"),
    // FechaFin: Yup.date().required("Campo obligatorio"),
    // NumeroCotizacion: Yup.string().required("Campo obligatorio"),
    // Moneda: Yup.string().required("Campo obligatorio"),
    // Monto: Yup.string().required("Campo obligatorio"),
    // HorasHombre: Yup.string().required("Campo obligatorio"),
  });
}
