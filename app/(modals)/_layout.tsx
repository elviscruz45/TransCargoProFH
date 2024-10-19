import {
  View,
  Text,
  Pressable,
  useColorScheme,
  TouchableOpacity,
  Image,
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
        name="tires"
        options={{
          title: "Llantas",
          headerTitle: () => (
            <Image
              source={require("@/assets/pictures/transprologo.png")}
              style={{ width: 200, height: 30 }}
            />
          ),
          headerShown: true,
          // presentation: "modal",
        }}
      />
    </Stack>
  );
}
