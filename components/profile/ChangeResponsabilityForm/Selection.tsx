import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import { responsabilidad } from "../../../utils/reponsabilityList";

import { supabase } from "@/supabase/client";

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

  console.log("uid", uid);

  async function saveProperty(itemValue: any) {
    // setText(itemValue);

    // const Ref = doc(db, "users", uid);
    // await updateDoc(Ref, { userType: itemValue });
    // Update the userType field in the users table using Supabase
    const { data, error } = await supabase
      .from("users")
      .update({ userType: itemValue })
      .eq("id", uid);

    if (error) {
      console.error("Error updating userType:", error);
    } else {
      console.log("userType updated successfully:", data);
    }
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
