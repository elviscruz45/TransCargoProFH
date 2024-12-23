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
import { useRouter } from "expo-router";

import { useState } from "react";

export default function _layout() {
  const router = useRouter();

  const CustomBackButton = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/profile",
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
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="userAssigned"
        options={{
          title: "Lista de Usuarios",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="moreDetail"
        options={{
          title: "Detalles del Usuario",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="files"
        options={{
          title: "Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="editFiles"
        options={{
          title: "Edita Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="addFiles"
        options={{
          title: "Agregar Documentos",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack>
  );
}
