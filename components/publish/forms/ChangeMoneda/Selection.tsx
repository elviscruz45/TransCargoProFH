import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { tipoGasto } from "@/utils/tipoGasto";
import { moneda } from "@/utils/monedaList";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const ChangeMoneda: React.FC<Event> = ({
  onClose,
  formik,
}) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  //   //render the list the best suit depend of TipoServicio property
  //   let serviceType;
  //   if (props.actualServiceAIT.TipoServicio === "Reparacion") {
  //     serviceType = Reparacion;
  //   } else if (props.actualServiceAIT.TipoServicio === "Fabricacion") {
  //     serviceType = Fabricacion;
  //   } else if (props.actualServiceAIT.TipoServicio === "Ingenieria") {
  //     serviceType = Ingenieria;
  //   } else if (props.actualServiceAIT.TipoServicio === "IngenieriayFabricacion") {
  //     serviceType = IngenieriayFabricacion;
  //   } else {
  //     serviceType = [];
  //   }

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("moneda", itemValue);
    onClose();
  }

  return (
    // <SelectList
    //   setSelected={(val) => setSelected(val)}
    //   data={tipoEvento}
    //   save="value"
    //   maxHeight={150}
    //   onSelect={() => saveProperty(selected)}
    // />
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={moneda}
      save="value"
      maxHeight={250}
    />
  );
};

// const mapStateToProps = (reducers) => {
//   return {
//     actualServiceAIT: reducers.post.actualServiceAIT,
//   };
// };

// export const SelectExample = connect(mapStateToProps, {})(SelectExampleBare);
