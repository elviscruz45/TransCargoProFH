import * as Yup from "yup";
export function initialValues() {
  return {
    tipoActivo: "",
    image: null,
    //informacion personal
    nombre: "",
    dni: null,
    //informacion activo
    placa: "",
    fechaFabricacion: 1900,
    categoriaVehiculo: "",
    numeroMotor: "",
    marca: "",
    modelo: "",
    kilometraje: "",
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
    gastoCombustible: null,
    cambioAceiteProx: null,
    redimientoCombustible: null,
    facturacionFleteYTD: null,
    cantidadServiciosYTD: null,
    gastosTotalYTD: null,
    //Documentacion Personal
    licenciaA3: null,
    licenciaA4: null,
    certificadoSalud: null,
    recordConductor: null,
    iqbfConductor: null,
    manejoDefensivo: null,
    seguroVidaLey: null,
    sctrSalud: null,
    sctrPension: null,
    //Documentacion Vehicular
    habilitacionVehicular: null,
    resolucionMaterialesPeligrosos: null,
    inspeccionTecnica: null,
    planContingencia: null,
    RDHabilitacion: null,
    partidaRegistral: null,
    sunatIQBF: null,
    soat: null,
    polizaResponsabilidadCivil: null,
    //Datos Empresa
    FichaRUC: null,
    SeguroCarga: null,
    //Datos Adicionales para Firebase
    fechaPostFormato: null,
    fechaPostISO: null,
    createdAt: null,
    LastEventPosted: null,
    photoServiceURL: null,
    emailPerfil: null,
    nombrePerfil: null,
    companyName: null,
    idFirebaseAsset: null,
    //user assigned
    userAssigned: null,
  };
}

export function validationSchema() {
  return Yup.object({
    // NombreServicio: Yup.string().required("Campo obligatorio"),
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

export interface UpdateDataType {
  tipoActivo?: any;
  image?: any;
  //informacion personal
  nombre?: any;
  dni?: any;
  //informacion activo
  placa?: any;
  fechaFabricacion?: any;
  categoriaVehiculo?: any;
  numeroMotor?: any;
  marca?: any;
  modelo?: any;
  kilometraje?: any;
  numeroChasis?: any;
  //datos Vehiculo
  claseVehiculo?: any;
  potencia?: any;
  tipoCombustible?: any;
  numeroSerie?: any;
  pesoNeto?: any;
  cargaUtil?: any;
  pesoBruto?: any;
  dimensiones?: any;
  color?: any;
  carroceria?: any;
  ejes?: any;
  //activo Calculos
  gastoCombustible?: any;
  cambioAceiteProx?: any;
  redimientoCombustible?: any;
  facturacionFleteYTD?: any;
  cantidadServiciosYTD?: any;
  gastosTotalYTD?: any;
  //Documentacion Personal
  licenciaA3?: any;
  licenciaA4?: any;
  certificadoSalud?: any;
  recordConductor?: any;
  iqbfConductor?: any;
  manejoDefensivo?: any;
  seguroVidaLey?: any;
  sctrSalud?: any;
  sctrPension?: any;
  //Documentacion Vehicular
  habilitacionVehicular?: any;
  resolucionMaterialesPeligrosos?: any;
  inspeccionTecnica?: any;
  planContingencia?: any;
  RDHabilitacion?: any;
  partidaRegistral?: any;
  sunatIQBF?: any;
  soat?: any;
  polizaResponsabilidadCivil?: any;
  //Datos Empresa
  FichaRUC?: any;
  SeguroCarga?: any;
  //Datos Adicionales para Firebase
  fechaPostFormato?: any;
  fechaPostISO?: any;
  createdAt?: any;
  LastEventPosted?: any;
  photoServiceURL?: any;
  emailPerfil?: any;
  nombrePerfil?: any;
  companyName?: any;
  idFirebaseAsset?: any;
  //user assigned
  userAssigned?: any;
}
