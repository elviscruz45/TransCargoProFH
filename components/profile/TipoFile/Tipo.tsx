import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
// import { tipoEvento } from "../../../../utils/modalList";
import { tipoDocumento_personal } from "../../../utils/tipoFile";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
  setTipoFile: (value: string) => void;
}

export const SelectDocument: React.FC<Event> = ({
  onClose,
  formik,
  setTipoFile,
}) => {
  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("tipoFile", itemValue);
    setTipoFile(itemValue);

    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={tipoDocumento_personal}
      save="value"
      maxHeight={250}
    />
  );
};
