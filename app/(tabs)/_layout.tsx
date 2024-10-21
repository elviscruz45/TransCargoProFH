import React, { useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { Link, Tabs, Redirect } from "expo-router";
// import { TouchableOpacity, Image, View,  } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { RootState } from "../store";
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
import {
  signIn,
  update_photoURL,
  updateEmail,
  updateCargo,
  updatecompanyName,
  updateDescripcion,
  updateDisplayName,
  updateUserType,
  updateAssetAssigned,
  updatecompanyRUC,
  updateEmailCompany,
} from "@/slices/auth";
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  setAssetList,
  setEventList,
  setAssetList_idFirebaseAsset,
} from "../../slices/home";
import { Image as ImageExpo } from "expo-image";
import { updateEmployees } from "../../slices/profile";

export default function TabLayout() {
  console.log("repeticiones");
  const router = useRouter();

  const user = getAuth().currentUser;
  //global state management for the user_uid
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.userId.session);
  const assetAsignedList =
    useSelector((state: RootState) => state.userId.assetAssigned) || [];

  const user_email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const companyName = useSelector(
    (state: RootState) => state.userId.companyName
  );

  // Mis datos personales
  useEffect(() => {
    console.log("user", user);
    if (user) {
      dispatch(update_photoURL(user?.photoURL ?? ""));
      dispatch(updateDisplayName(user?.displayName ?? ""));
      dispatch(updateEmail(user?.email ?? ""));
      dispatch(signIn(user?.uid ?? ""));
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (session) {
          const docRef = doc(db, "users", session);
          const docSnap = await getDoc(docRef);
          console.log("docSnap", docSnap.data());

          if (docSnap.exists()) {
            dispatch(updateCargo(docSnap.data().cargo ?? ""));
            // dispatch(updatecompanyName(docSnap.data().companyName ?? ""));
            dispatch(updateUserType(docSnap.data().userType ?? ""));
            dispatch(updateDescripcion(docSnap.data().descripcion ?? ""));
            dispatch(
              updateAssetAssigned(
                docSnap?.data()?.assetAssigned?.length > 0
                  ? docSnap.data().assetAssigned
                  : ["anything"]
              )
            );
            // dispatch(updatecompanyRUC(docSnap.data().companyRUC ?? ""));
            dispatch(
              updateEmailCompany(docSnap.data().emailCompany ?? emailCompany)
            );
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("Session is undefined or null!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
    fetchData();
  }, [session]);

  // Equipos
  useEffect(() => {
    let unsubscribe: any;
    let lista: any = [];
    let lista_idFirebaseAsset: any = [];
    console.log("Equipos");

    if (
      user_email &&
      emailCompany &&
      assetAsignedList &&
      assetAsignedList?.length > 0
    ) {
      function fetchData() {
        let queryRef;

        if (emailCompany === user_email) {
          queryRef = query(
            collection(db, "Asset"),
            where("emailCompany", "==", emailCompany)
          );
        } else {
          queryRef = query(
            collection(db, "Asset"),
            where("nombre", "in", assetAsignedList),
            where("emailCompany", "==", emailCompany)
          );
        }

        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          lista = [];
          lista_idFirebaseAsset = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
            lista_idFirebaseAsset.push(doc.data().idFirebaseAsset);
          });
          //order the list by date
          lista.sort((a: any, b: any) => {
            return b.LastEventPosted - a.LastEventPosted;
          });
          console.log("lista", lista);
          dispatch(setAssetList(lista));
        });
      }
      fetchData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user_email, assetAsignedList, emailCompany]);

  //traer todoos los usuarios de la empresa
  useEffect(() => {
    console.log("traer todoos los usuarios de la empresa");
    if (emailCompany && user_email && user_email === emailCompany) {
      let unsubscribe: any;
      let lista: any = [];

      async function fetchData() {
        let queryRef;
        queryRef = query(
          collection(db, "users"),
          where("emailCompany", "==", emailCompany)
        );
        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          dispatch(updateEmployees(lista));
        });
      }

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [emailCompany, user_email]);

  // Events
  useEffect(() => {
    console.log("events");
    let unsubscribe: any;
    let lista: any = [];
    if (user_email && assetAsignedList && assetAsignedList?.length > 0) {
      async function fetchData() {
        let queryRef;

        if (emailCompany === user_email) {
          queryRef = query(
            collection(db, "Events"),
            limit(40),
            where("emailCompany", "==", emailCompany),
            orderBy("createdAt", "desc")
          );
        } else {
          queryRef = query(
            collection(db, "Events"),
            limit(30),
            where("emailCompany", "==", emailCompany),
            where("nombreAsset", "in", assetAsignedList),
            orderBy("createdAt", "desc")
          );
        }
        unsubscribe = onSnapshot(queryRef, async (ItemFirebase) => {
          lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          // order the list by date
          lista.sort((a: any, b: any) => {
            return b.createdAt - a.createdAt;
          });
          dispatch(setEventList(lista));
        });
      }

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user_email, assetAsignedList]);

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }
  const home_screen = () => {
    router.push({
      pathname: "/home",
      // params: { item: item },
    });
  };
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: () => (
            <TouchableOpacity onPress={() => home_screen()}>
              <Image
                source={require("@/assets/pictures/transprologo.png")}
                style={{ width: 200, height: 30 }}
              />
            </TouchableOpacity>
          ),

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          title: "Reporte",
          headerTitle: () => (
            <TouchableOpacity onPress={() => home_screen()}>
              <Image
                source={require("@/assets/pictures/transprologo.png")}
                style={{ width: 200, height: 30 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bar-chart" : "bar-chart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: "Publicar",
          headerTitle: () => (
            <TouchableOpacity onPress={() => home_screen()}>
              <Image
                source={require("@/assets/pictures/transprologo.png")}
                style={{ width: 200, height: 30 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "logo-instagram" : "logo-instagram"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          headerTitle: () => (
            <TouchableOpacity onPress={() => home_screen()}>
              <Image
                source={require("@/assets/pictures/transprologo.png")}
                style={{ width: 200, height: 30 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "car" : "car-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerTitle: () => (
            <TouchableOpacity onPress={() => home_screen()}>
              <Image
                source={require("@/assets/pictures/transprologo.png")}
                style={{ width: 200, height: 30 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
