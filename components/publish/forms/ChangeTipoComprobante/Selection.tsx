import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { tipoGasto } from "@/utils/tipoGasto";
import { moneda } from "@/utils/monedaList";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const ChangeComprobante: React.FC<Event> = ({ onClose, formik }) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("tipoComprobante", itemValue);
    onClose();
  }

  const comprobante = [
    { value: "Factura" },
    { value: "Boleta" },
    { value: "Ticket" },
    { value: "Sin Comp" },
  ];

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={comprobante}
      save="value"
      maxHeight={250}
    />
  );
};
