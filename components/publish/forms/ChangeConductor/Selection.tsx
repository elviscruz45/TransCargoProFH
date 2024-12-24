import { SelectList } from "react-native-dropdown-select-list";
import { tipoGasto } from "@/utils/tipoGasto";
import { moneda } from "@/utils/monedaList";
import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
}

export const ChangeConductor: React.FC<Event> = ({ onClose, formik }) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  //getting from firebae users table that comes from the same company
  useEffect(() => {
    async function fetchData() {
      const queryRef1 = query(
        collection(db, "users"),
        where("emailCompany", "==", emailCompany),
        orderBy("email", "desc")
      );
      const getDocs1 = await getDocs(queryRef1);
      const lista: any = [];

      // Process results from the first query
      if (getDocs1) {
        getDocs1.forEach((doc) => {
          const object = doc.data();
          const objectver2 = {
            ...object,
            value: `${object.displayNameform}\n(${object.email})`,
            email: object.email,
          };
          lista.push(objectver2.email);
        });
      }
      setList(lista);
    }

    fetchData();
  }, []);

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("nombreConductor", itemValue);
    onClose();
  }

  return (
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={list}
      save="value"
      maxHeight={250}
    />
  );
};
