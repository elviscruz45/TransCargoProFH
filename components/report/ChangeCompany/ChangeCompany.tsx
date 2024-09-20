import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export function ChangeDisplayCompany(props: any) {
  const { onClose, setArea, areaList } = props;
  const [selected, setSelected] = useState("");
  let combinedCompanies = [
    ...areaList?.map((item: any) => ({ value: item.toUpperCase() })),
  ];

  function saveProperty(itemValue: any) {
    setArea(itemValue);
    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => setSelected(val)}
      data={combinedCompanies}
      save="value"
      maxHeight={300}
      onSelect={() => saveProperty(selected)}
    />
  );
}
