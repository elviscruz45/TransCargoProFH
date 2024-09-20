import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./tires.styles";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { uploadTires } from "../../slices/publish";

export default function tires() {
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
          source={require("../../assets/pictures/camionVer2.png")}
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

      <View style={styles.number3}>
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

      <View style={styles.number4}>
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

      <View style={styles.number5}>
        <Text
          style={[
            styles.number,
            tires[4].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 4 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          5
        </Text>
      </View>

      <View style={styles.number6}>
        <Text
          style={[
            styles.number,
            tires[5].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 5 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          6
        </Text>
      </View>

      <View style={styles.number7}>
        <Text
          style={[
            styles.number,
            tires[6].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 6 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          7
        </Text>
      </View>

      <View style={styles.number8}>
        <Text
          style={[
            styles.number,
            tires[7].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 7 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          8
        </Text>
      </View>

      <View style={styles.number9}>
        <Text
          style={[
            styles.number,
            tires[8].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 8 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          9
        </Text>
      </View>

      <View style={styles.number10}>
        <Text
          style={[
            styles.number,
            tires[9].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 9 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          10
        </Text>
      </View>

      <View style={styles.number11}>
        <Text
          style={[
            styles.number,
            tires[10].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 10 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          11
        </Text>
      </View>

      <View style={styles.number12}>
        <Text
          style={[
            styles.number,
            tires[11].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 11 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          12
        </Text>
      </View>

      <View style={styles.number13}>
        <Text
          style={[
            styles.number,
            tires[12].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 12 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          13
        </Text>
      </View>

      <View style={styles.number14}>
        <Text
          style={[
            styles.number,
            tires[13].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 13 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          14
        </Text>
      </View>

      <View style={styles.number15}>
        <Text
          style={[
            styles.number,
            tires[14].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 14 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          15
        </Text>
      </View>
      <View style={styles.number16}>
        <Text
          style={[
            styles.number,
            tires[15].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 15 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          16
        </Text>
      </View>
      <View style={styles.number17}>
        <Text
          style={[
            styles.number,
            tires[16].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 16 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          17
        </Text>
      </View>

      <View style={styles.number18}>
        <Text
          style={[
            styles.number,
            tires[17].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 17 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          18
        </Text>
      </View>

      <View style={styles.number19}>
        <Text
          style={[
            styles.number,
            tires[18].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 18 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          19
        </Text>
      </View>
      <View style={styles.number20}>
        <Text
          style={[
            styles.number,
            tires[19].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 19 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          20
        </Text>
      </View>

      <View style={styles.number21}>
        <Text
          style={[
            styles.number,
            tires[20].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 20 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          21
        </Text>
      </View>
      <View style={styles.number22}>
        <Text
          style={[
            styles.number,
            tires[21].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) =>
              prevState.map((tire, index) =>
                index === 21 ? { ...tire, selected: !tire.selected } : tire
              )
            );
          }}
        >
          22
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
