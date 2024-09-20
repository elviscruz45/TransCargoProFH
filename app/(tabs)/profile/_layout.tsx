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
          title: "profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="assetAssigned"
        options={{
          title: "Asset List",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userAssigned"
        options={{
          title: "User List",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="moreDetail"
        options={{
          title: "moreDetail",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="files"
        options={{
          title: "Files",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editFiles"
        options={{
          title: "editFiles",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addFiles"
        options={{
          title: "addFiles",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
