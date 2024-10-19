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

//   function TabBarIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>["name"];
//     color: string;
//   }) {
//     return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
//   }

export default function _layout() {
  // const dispatch = useAppDispatch();
  // const modalState = useAppSelector((state) => state.modalSlice.value);
  // const colorScheme = useColorScheme();
  // const handleVisibleModalFalse = () => {
  //   dispatch(setToFalse());

  // };
  // const handleVisibleModalTrue = () => {
  //   dispatch(setToTrue());

  // };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Unidades",
          headerShown: false,
          headerTitleAlign: "center", // Center the title

          // headerRight: () => (
          //   //   <TouchableOpacity
          //   //     onPress={
          //   //       modalState ? handleVisibleModalFalse : handleVisibleModalTrue
          //   //     }
          //   //   >
          //   <Ionicons name="bar-chart-outline" />
          //   //   </TouchableOpacity>
          // ),
        }}
      />

      <Stack.Screen
        name="item"
        options={{
          title: "Unidad",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          // headerTitle: () => <Text>Regresar</Text>,
        }}
      />
      <Stack.Screen
        name="moreDetail"
        options={{
          title: "Informacion",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="files"
        options={{
          title: "Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="addFiles"
        options={{
          title: "Agregar Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editasset"
        options={{
          title: "Editar Activo",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editFiles"
        options={{
          title: "Editar Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="comment"
        options={{
          title: "Ver Evento",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editEvents"
        options={{
          title: "Editar Evento",
          headerShown: true,
          headerTitleAlign: "center", // Center the title

          // headerShown: false,
          // presentation: "modal",
        }}
      />
      {/*  <Stack.Screen
        name="item"
        options={{
          title: "Creacion Gasto Manual",
          // presentation: "modal",
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("save")}>
              <Text>Guardar</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => console.log("cancel")}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        options={{
          title: "",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Home details",
        }}
      />*/}
    </Stack>
  );
}
