import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { tipoGasto } from "@/utils/tipoGasto";
import { moneda } from "@/utils/monedaList";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const ChangeMantto: React.FC<Event> = ({ onClose, formik }) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("tipoMantto", itemValue);
    onClose();
  }

  const mantto = [
    { value: "Cambio de aceite de Motor" },
    { value: "Cambio de aceite de Caja" },
    { value: "Cambio de aceite de Diferencial" },
    { value: "Cambio de aceite Otros" },
    { value: "Cambio de Llanta" },
    { value: "Reparacion de Llanta" },
    { value: "Cambio de repuesto" },
    { value: "Soldadura" },
  ];

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={mantto}
      save="value"
      maxHeight={250}
    />
  );
};
