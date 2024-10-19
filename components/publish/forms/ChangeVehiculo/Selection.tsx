import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { tipoVehiculo } from "@/utils/tipoVehiculo";

interface Event {
  onClose: () => void;
  setTipo: any;
}

export const ChangeVehiculo: React.FC<Event> = ({ onClose, setTipo }) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    setTipo(itemValue);
    // formik.setFieldValue("tipoGasto", itemValue);
    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={tipoVehiculo}
      save="value"
      maxHeight={250}
    />
  );
};
