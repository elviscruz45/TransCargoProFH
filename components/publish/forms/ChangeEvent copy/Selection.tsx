import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import { tipoEvento } from "../../../../utils/modalList";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
  setEvento: any; // replace with the actual type
}

export const ChangeEvent: React.FC<Event> = ({
  onClose,
  formik,
  setEvento,
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
      data={tipoEvento}
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
