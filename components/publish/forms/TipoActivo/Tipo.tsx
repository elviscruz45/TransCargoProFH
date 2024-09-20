import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
// import { tipoEvento } from "../../../../utils/modalList";
import { tipoActivo } from "../../../../utils/tipoActivo";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
  setTipoActivo: (value: string) => void;
}

export const SelectActivo: React.FC<Event> = ({
  onClose,
  formik,
  setTipoActivo,
}) => {
  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("tipoActivo", itemValue);
    setTipoActivo(itemValue);

    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={tipoActivo}
      save="value"
      maxHeight={250}
    />
  );
};
