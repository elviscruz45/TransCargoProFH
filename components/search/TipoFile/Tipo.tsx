import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
// import { tipoEvento } from "../../../../utils/modalList";
import {
  tipoDocumento_activo,
  tipoDocumento_empresa,
} from "../../../utils/tipoFile";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
  setTipoFile: (value: string) => void;
  tipoActivoCurrent: string;
}

export const SelectDocument: React.FC<Event> = ({
  onClose,
  formik,
  setTipoFile,
  tipoActivoCurrent,
}) => {
  function saveProperty(itemValue: any) {
    // setText(itemValue);
    setTipoFile(itemValue);
    formik.setFieldValue("tipoFile", itemValue);
    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      // data={tipoDocumento_activo}
      data={
        tipoActivoCurrent === "Area / Empresa"
          ? tipoDocumento_empresa
          : tipoDocumento_activo
      }
      save="value"
      maxHeight={250}
    />
  );
};
