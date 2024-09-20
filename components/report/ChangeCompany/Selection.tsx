import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
// import { companyList } from "../../../../utils/companyList";
import { assetLists } from "../../../utils/assetList";

export const SelectExample = (props: any) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const { setText, formik } = props;

  function saveProperty(itemValue: any) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val: any) => setSelected(val)}
      data={assetLists}
      save="value"
      maxHeight={300}
      onSelect={() => saveProperty(selected)}
    />
  );
};
