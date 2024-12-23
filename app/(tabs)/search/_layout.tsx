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

export default function _layout() {
  const router = useRouter();

  const CustomBackButton = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/search",
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
          headerLeft: () => <CustomBackButton />,

          // headerTitle: () => <Text>Regresar</Text>,
        }}
      />
      <Stack.Screen
        name="moreDetail"
        options={{
          title: "Informacion",
          headerShown: true,
          headerTitleAlign: "center", // Center the title
          headerLeft: () => <CustomBackButton />,

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
          headerLeft: () => <CustomBackButton />,

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
          headerLeft: () => <CustomBackButton />,

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
          headerLeft: () => <CustomBackButton />,

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
          headerLeft: () => <CustomBackButton />,

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
          headerLeft: () => <CustomBackButton />,

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
          headerLeft: () => <CustomBackButton />,

          // headerShown: false,
          // presentation: "modal",
        }}
      />
    </Stack>
  );
}
