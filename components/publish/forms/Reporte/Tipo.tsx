import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
// import { tipoEvento } from "../../../../utils/modalList";
import { tipoReporte } from "../../../../utils/tipoActivo";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const SelectReporte: React.FC<Event> = ({ onClose, formik }) => {
  function saveProperty(itemValue: string) {
    // setText(itemValue);
    formik.setFieldValue("reporte", itemValue);

    onClose();
  }

  return (
    <SelectList
      setSelected={(val: string) => saveProperty(val)}
      data={tipoReporte}
      save="value"
      maxHeight={250}
    />
  );
};
