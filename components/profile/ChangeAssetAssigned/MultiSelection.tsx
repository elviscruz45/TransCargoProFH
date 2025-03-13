import { MultipleSelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { View, Text, Linking, Button } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
// import { db } from "../../../../utils";
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
import { connect } from "react-redux";
import { db } from "../../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";

export const MultiSelectExample = (props: any) => {
  const { setAssets } = props;
  const [selected, setSelected] = React.useState([]);
  const [list, setList] = useState<any>([]);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  //getting from firebae users table that comes from the same company
  useEffect(() => {
    async function fetchData() {
      const queryRef1 = query(
        collection(db, "Asset"),
        where("emailCompany", "==", emailCompany),
        orderBy("nombre", "desc")
      );
      const getDocs1 = await getDocs(queryRef1);
      const lista: any = [];

      // Process results from the first query
      if (getDocs1) {
        getDocs1.forEach((doc) => {
          const object = doc.data();
          const objectver2 = {
            ...object,
            value: `${object?.nombre || object?.placa}`,
          };
          lista.push(objectver2.value);
        });
      }
      setList(lista);
    }

    fetchData();
  }, []);

  function saveProperty(itemValue: any) {
    setAssets(itemValue);
  }

  return (
    <>
      <MultipleSelectList
        setSelected={(val: any) => setSelected(val)}
        data={list}
        save="value"
        // mode="datetime"
        onSelect={() => saveProperty(selected)}
        label="Categories"
      />
    </>
  );
};
