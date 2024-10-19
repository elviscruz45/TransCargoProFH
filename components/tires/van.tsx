import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./van.styles";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { uploadTires } from "../../slices/publish";

export default function Van() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tires, setTires] = useState([
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 4, selected: false },
    { value: 5, selected: false },
    { value: 6, selected: false },
    { value: 7, selected: false },
    { value: 8, selected: false },
    { value: 9, selected: false },
    { value: 10, selected: false },
    { value: 11, selected: false },
    { value: 12, selected: false },
    { value: 13, selected: false },
    { value: 14, selected: false },
    { value: 15, selected: false },
    { value: 16, selected: false },
    { value: 17, selected: false },
    { value: 18, selected: false },
    { value: 19, selected: false },
    { value: 20, selected: false },
    { value: 21, selected: false },
    { value: 22, selected: false },
  ]);
  const onPressAceptar = (): void => {
    dispatch(uploadTires(tires));
    router.back();
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View>
        <ImageExpo
          source={require("../../assets/vehiculos/van.png")}
          style={styles.camion}
          cachePolicy={"memory-disk"}
        />
      </View>

      <View style={styles.number1}>
        <Text
          style={[
            styles.number,
            tires[0].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 0 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          1
        </Text>
      </View>

      <View style={styles.number2}>
        <Text
          style={[
            styles.number,
            tires[1].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 1 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          2
        </Text>
      </View>

      <View style={styles.number4}>
        <Text
          style={[
            styles.number,
            tires[2].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 2 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          3
        </Text>
      </View>
      <View style={styles.number5}>
        <Text
          style={[
            styles.number,
            tires[3].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 3 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          4
        </Text>
      </View>
      <Button
        title="Aceptar"
        // buttonStyle={styles.addInformation}
        style={{ marginTop: "80%", zIndex: -1000 }}
        onPress={() => onPressAceptar()}
        // loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
