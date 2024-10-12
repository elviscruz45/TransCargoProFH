import { v4 as uuidv4 } from "uuid";
// import uuid from "react-native-uuid";
import "react-native-get-random-values";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";

import { useEffect } from "react";
import Toast from "react-native-toast-message";

export const useUserData = (
  email: any,
  saveTotalUsers: any,
  getTotalUsers: any
) => {
  useEffect(() => {
    // Function to fetch data from Firestore
    if (email) {
      const companyName = email?.match(/@(.+?)\./i)?.[1] || "Anonimo";

      async function fetchData() {
        try {
          const queryRef1 = query(
            collection(db, "users"),
            where("companyName", "!=", companyName),
            orderBy("email", "desc")
          );

          const queryRef2 = query(
            collection(db, "users"),
            where("companyName", "==", companyName),
            orderBy("email", "desc")
          );

          const getDocs1 = await getDocs(queryRef1);
          const getDocs2 =
            companyName === "prodise" ? await getDocs(queryRef2) : null;

          const lista: any = [];

          // Process results from the first query
          if (getDocs1) {
            getDocs1.forEach((doc) => {
              lista.push(doc.data());
            });
          }

          // Process results from the second query
          if (getDocs2) {
            getDocs2.forEach((doc) => {
              lista.push(doc.data());
            });
          }
          // Save the merged results to the state or do any other necessary operations
          saveTotalUsers(lista);
        } catch (error) {
          // console.error("Error fetching data:", error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al cargar los datos",
          });
          // Handle the error as needed
        }
      }
      // Call the fetchData function when the component mounts
      if (!getTotalUsers) {
        fetchData();
      }
    }
  }, [email]);
};

export const dateFormat = () => {
  const date = new Date();

  const monthNames = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
  return formattedDate;
};

export const uploadImage = async (uri: any, emailCompany: any) => {
  const uuid = uuidv4();

  const response = await fetch(uri);

  const blob = await response.blob();

  const storage = getStorage();

  const storageRef = ref(storage, `${emailCompany}/mainImageEvents/${uuid}`);
  return uploadBytesResumable(storageRef, blob);
};
