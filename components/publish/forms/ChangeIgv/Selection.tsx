import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { tipoGasto } from "@/utils/tipoGasto";
import { enViaje } from "@/utils/enViaje";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const ChangeIgv: React.FC<Event> = ({ onClose, formik }) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  function saveProperty(itemValue: any) {
    formik.setFieldValue("igv", itemValue);
    onClose();
  }

  const igv = [{ value: "0" }, { value: "10" }, { value: "18" }];

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={igv}
      save="value"
      maxHeight={250}
    />
  );
};
