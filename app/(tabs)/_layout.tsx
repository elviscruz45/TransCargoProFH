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
import { useSelector, useDispatch } from "react-redux";
import {
  setAssetList,
  setEventList,
  setAssetList_idFirebaseAsset,
} from "../../slices/home";
import { Image as ImageExpo } from "expo-image";
import { updateEmployees } from "../../slices/profile";
import { supabase } from "@/supabase/client";

export default function TabLayout() {
  const router = useRouter();

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
  const displayName = useSelector(
    (state: RootState) => state.userId.displayName
  );

  const sessionId = useSelector((state: RootState) => state.userId.session);
  const email = useSelector((state: RootState) => state.userId.email);

  // Mis datos personales
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: users, error } = await supabase
          .from("users")
          .select("*")
          // Filters
          .eq("uid", session);
        dispatch(updateDisplayName(users!![0].display_nameform ?? ""));
        dispatch(updateCargo(users!![0].cargo ?? ""));
        dispatch(updateUserType(users!![0].userType ?? ""));
        dispatch(updateDescripcion(users!![0].descripcion ?? ""));
        dispatch(
          updateAssetAssigned(
            users!![0].asset_assigned?.length > 0
              ? users!![0].asset_assigned
              : ["anything"]
          )
        );

        //
        if (error) throw error;
        // setUsers(users);
      } catch (error) {
        // setError(error);
        console.log("error", error);
      }
    };

    fetchData();

    // dispatch(updateDisplayName(displayName ?? ""));
    // dispatch(updateEmail(email ?? ""));
    // dispatch(signIn(sessionId ?? ""));
  }, []);

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
      const fetchData = async () => {
        if (emailCompany === user_email) {
          let { data: assets, error } = await supabase
            .from("assets")
            .select("*")
            .like("emailCompany", emailCompany);
          console.log("assets=1", assets);
          dispatch(setAssetList(assets!!));
        } else {
          let { data: assets, error } = await supabase
            .from("assets")
            .select("*")
            .like("emailCompany", emailCompany)
            .contains("nombre", assetAsignedList);
          console.log("assets=2", assets);
          dispatch(setAssetList(assets!!));
        }
      };
      fetchData();
    }
  }, [user_email, assetAsignedList, emailCompany]);

  //traer todoos los usuarios de la empresa
  useEffect(() => {
    console.log("traer todoos los usuarios de la empresa");
    if (emailCompany && user_email && user_email === emailCompany) {
      async function fetchData() {
        let { data: users, error } = await supabase.from("users").select("*");
        console.log("users=1111", users);
        dispatch(updateEmployees(users));
      }

      fetchData();
    }
  }, [emailCompany, user_email]);

  // Events
  useEffect(() => {
    if (user_email && assetAsignedList && assetAsignedList?.length > 0) {
      async function fetchData() {
        if (emailCompany === user_email) {
          let { data: events, error } = await supabase
            .from("events")
            .select("*")
            .like("emailCompany", emailCompany!!);
          dispatch(setEventList(events!!));
        } else {
          let { data: events, error } = await supabase
            .from("events")
            .select("*")
            .like("emailCompany", emailCompany!!)
            .contains("nombreAsset", assetAsignedList);
          // .like("emailCompany", emailCompany);
          dispatch(setEventList(events!!));
        }
      }

      fetchData();
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
