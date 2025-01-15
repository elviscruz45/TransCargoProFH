import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import { tipoEventoAdmin, tipoEventoOp } from "../../../../utils/modalList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../app/store";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const ChangeEvent: React.FC<Event> = ({ onClose, formik }) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const email = useSelector((state: RootState) => state.userId.email) ?? "";
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("tipoEvento", itemValue);
    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={email === emailCompany ? tipoEventoAdmin : tipoEventoOp}
      save="value"
      maxHeight={250}
    />
  );
};
