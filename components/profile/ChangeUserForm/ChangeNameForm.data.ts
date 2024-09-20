import * as Yup from "yup";

export function initialValues() {
  return {
    displayNameform: "",
    cargo: "",
    descripcion: "",
    photoURL: "",
    email: "",
    emailCompany: "",
    companyName: "",
    companyRUC: "",
    userType: "",
    uid: "",
    assetAssigned: "",
    companyManagerConfimation: "",
  };
}

export function validationSchema() {
  return Yup.object({
    displayNameform: Yup.string().required(
      "El nombre y apellidos son requeridos"
    ),
    // cargo: Yup.string().required("el cargo es requerido"),
    emailCompany: Yup.string().required("el email grupal es requerido"),
  });
}
