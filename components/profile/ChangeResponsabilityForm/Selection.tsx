import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import { responsabilidad } from "../../../utils/reponsabilityList";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
  getDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";

interface Event {
  onClose: () => void;
  uid: string;
}

export const ChangeResponsability: React.FC<Event> = ({ onClose, uid }) => {
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

  async function saveProperty(itemValue: any) {
    // setText(itemValue);

    const Ref = doc(db, "users", uid);
    await updateDoc(Ref, { userType: itemValue });
    // setResponsability(itemValue);

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
      data={responsabilidad}
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
