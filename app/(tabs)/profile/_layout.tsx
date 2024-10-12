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

import { useState } from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Perfil",
          headerShown: false,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="assetAssigned"
        options={{
          title: "Lista de Activos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="userAssigned"
        options={{
          title: "Lista de Usuarios",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="moreDetail"
        options={{
          title: "Detalles del Usuario",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="files"
        options={{
          title: "Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="editFiles"
        options={{
          title: "Edita Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
        }}
      />
      <Stack.Screen
        name="addFiles"
        options={{
          title: "Agregar Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
        }}
      />
    </Stack>
  );
}
