import * as Yup from "yup";
export function initialValues() {
  return {
    tipoEvento: [],

  };
}

export function validationSchema() {
  return Yup.object({
    tipoEvento: Yup.string().required("Campo obligatorio"),

  });
}
