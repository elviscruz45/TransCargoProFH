import {
  View,
  Text,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
//   import { useAppDispatch } from "../../../reducers/hooks";
//   import { useAppSelector } from "../../../reducers/hooks";
//   import { setToFalse, setToTrue } from "../../../slices/slide";
import { useState } from "react";
// import Colors from "../../../constants/Colors";
import { useRouter } from "expo-router";

//   function TabBarIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>["name"];
//     color: string;
//   }) {
//     return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
//   }

export default function _layout() {
  const router = useRouter();

  const CustomBackButton = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/publish",
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 8,
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#007AFF" />
        <Text
          style={{
            marginLeft: 4,
            color: "#007AFF",
            fontSize: 16,
          }}
        >
          Atrás
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Publicar",
          headerShown: false,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="camera"
        options={{
          title: "Camara",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="events"
        options={{
          title: "Crear Evento",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,

          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="asset"
        options={{
          title: "Crear Activo",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,

          // presentation: "modal",
        }}
      />

      {/* <Stack.Screen
        name="tires"
        options={{
          title: "tires",
          headerShown: false,

          presentation: "modal",
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => console.log("save")}>
          //     <Text>Guardar</Text>
          //   </TouchableOpacity>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => console.log("cancel")}>
          //     <Text>Cancelar</Text>
          //   </TouchableOpacity>
          // ),
        }}
      /> */}
      {/* <Stack.Screen
        name="[id]"
        options={{
          title: "Home details",
        }}
      /> */}
    </Stack>
  );
}
