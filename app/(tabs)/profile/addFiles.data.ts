import * as Yup from "yup";
export function initialValues() {
  return {
    pdfFileURL: "",
    pdfFileURLFirebase: "",
    FilenameTitle: "",
    tipoFile: "",
    fechaPost: new Date(),
    fechaPostFormato: "",
    fechaVencimiento: new Date(),
    autor: "",
    nombre: "",
  };
}

export function validationSchema() {
  return Yup.object({
    FilenameTitle: Yup.string().required("Campo obligatorio"),
    tipoFile: Yup.string().required("Campo obligatorio"),
  });
}
