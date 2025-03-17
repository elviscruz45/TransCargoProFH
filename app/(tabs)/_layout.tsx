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
import { useSelector, useDispatch } from "react-redux";
import {
  setAssetList,
  setEventList,
  setAssetList_idFirebaseAsset,
  addAsset,
  updateAsset,
  removeAsset,
  addEvent,
  updateEvent,
  removeEvent,
} from "../../slices/home";
import {
  setEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
} from "../../slices/profile";
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
        console.warn("error", error);
      }
    };

    fetchData();

    // dispatch(updateDisplayName(displayName ?? ""));
    // dispatch(updateEmail(email ?? ""));
    // dispatch(signIn(sessionId ?? ""));
  }, []);

  // Equipos
  useEffect(() => {
    if (
      user_email &&
      emailCompany &&
      assetAsignedList &&
      assetAsignedList?.length > 0
    ) {
      // const fetchData = async () => {
      //   if (emailCompany === user_email) {
      //     let { data: assets, error } = await supabase
      //       .from("assets")
      //       .select("*")
      //       .like("emailCompany", emailCompany)
      //       .order("LastEventPosted", { ascending: false });

      //     dispatch(setAssetList(assets!!));
      //   } else {
      //     let { data: assets, error } = await supabase
      //       .from("assets")
      //       .select("*")
      //       .like("emailCompany", emailCompany)
      //       .contains("nombre", assetAsignedList)
      //       .order("created_at", { ascending: false });

      //     dispatch(setAssetList(assets!!));
      //   }
      // };
      // const fetchData = async () => {
      //   let query = supabase
      //     .from("assets")
      //     .select("*")
      //     .order("created_at", { ascending: false });

      //   if (emailCompany === user_email) {
      //     query = query.like("emailCompany", emailCompany);
      //   } else {
      //     query = query
      //       .like("emailCompany", emailCompany)
      //       .contains("nombre", assetAsignedList);
      //   }

      //   const { data: assets, error } = await query;
      //   if (error) {
      //     console.error("Error fetching assets:", error);
      //     return;
      //   }

      //   dispatch(setAssetList(assets || []));
      // };

      const fetchData = async () => {
        let query = supabase.from("assets").select("*");

        if (emailCompany === user_email) {
          query = query
            .like("emailCompany", emailCompany)
            .order("LastEventPosted", { ascending: false });
        } else {
          query = query
            .like("emailCompany", emailCompany)
            .contains("nombre", assetAsignedList)
            .order("created_at", { ascending: false });
        }

        const { data: assets, error } = await query;
        if (error) {
          console.error("Error fetching assets:", error);
          return;
        }

        dispatch(setAssetList(assets || []));
      };
      fetchData();
      // Set up real-time listener for changes in the "assets" table
      // const channel = supabase
      //   .channel("assets_changes")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "assets" }, // Listen to all changes
      //     (payload) => {
      //       console.log("Realtime asset event received:", payload);
      //       fetchData(); // Re-fetch data on change
      //     }
      //   )
      //   .subscribe();
      const channel = supabase
        .channel("assets_changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "assets" }, // Listen to all changes
          (payload) => {
            console.log("Realtime asset event received:", payload);
            // Handle different event types with more granular updates
            if (payload.eventType === "INSERT") {
              dispatch(addAsset(payload.new as any));
            } else if (payload.eventType === "UPDATE") {
              dispatch(updateAsset(payload.new as any));
            } else if (payload.eventType === "DELETE") {
              dispatch(removeAsset(payload.old.id));
            }
          }
        )
        .subscribe();
      // Cleanup function to unsubscribe when the component unmounts
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user_email, assetAsignedList, emailCompany]);

  //traer todoos los usuarios de la empresa
  useEffect(() => {
    if (emailCompany && user_email && user_email === emailCompany) {
      async function fetchInitialData() {
        let { data: users, error } = await supabase.from("users").select("*");
        if (error) {
          console.error("Error fetching users:", error);
          return;
        }
        dispatch(setEmployees(users || []));
      }
      fetchInitialData();
      // Set up real-time listener that updates only what changed
      const channel = supabase
        .channel("users_changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "users" },
          (payload) => {
            console.log("Realtime user event received:", payload);
            // Handle different event types with more granular updates
            if (payload.eventType === "INSERT") {
              dispatch(addEmployee(payload.new as any));
            } else if (payload.eventType === "UPDATE") {
              dispatch(updateEmployee(payload.new as any));
            } else if (payload.eventType === "DELETE") {
              dispatch(removeEmployee(payload.old.id));
            }
          }
        )
        .subscribe();
      // Cleanup
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [emailCompany, user_email]);

  // Events
  useEffect(() => {
    if (user_email && assetAsignedList && assetAsignedList?.length > 0) {
      async function fetchData() {
        let query = supabase
          .from("events")
          .select("*")
          .order("LastEventPosted", { ascending: false });

        if (emailCompany === user_email) {
          query = query.like("emailCompany", emailCompany ?? "");
        } else {
          query = query
            .like("emailCompany", emailCompany ?? "")
            .contains("nombreAsset", assetAsignedList);
        }

        const { data: events, error } = await query;
        if (error) {
          console.error("Error fetching events:", error);
          return;
        }
        dispatch(setEventList(events || []));
      }
      fetchData();

      const channel = supabase
        .channel("events_changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "events" }, // Listen to all changes
          (payload) => {
            console.log("Realtime event received:", payload);
            // Handle different event types with more granular updates
            if (payload.eventType === "INSERT") {
              dispatch(addEvent(payload.new as any));
            } else if (payload.eventType === "UPDATE") {
              dispatch(updateEvent(payload.new as any));
            } else if (payload.eventType === "DELETE") {
              dispatch(removeEvent(payload.old.id));
            }
          }
        )
        .subscribe();
      // Cleanup function to unsubscribe when the component unmounts
      return () => {
        supabase.removeChannel(channel);
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
