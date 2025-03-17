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
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { supabase } from "@/supabase/client";

export const MultiSelectExample = (props: any) => {
  const { setAssets } = props;
  const [selected, setSelected] = React.useState([]);
  const [list, setList] = useState<any>([]);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  useEffect(() => {
    async function fetchData() {
      const { data: assets, error } = await supabase
        .from("assets")
        .select("*")
        .eq("emailCompany", emailCompany)
        .order("nombre", { ascending: false });

      console.log("assets", assets);

      if (error) {
        console.error("Error fetching assets:", error);
        return;
      }

      const lista: any = assets.map((asset: any) => ({
        ...asset,
        value: `${asset?.placa || asset?.nombre}`,
      }));

      setList(lista);
    }

    fetchData();
  }, [emailCompany]);

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
