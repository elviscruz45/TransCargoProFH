import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./Gantt.styles";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
import { useRouter } from "expo-router";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";

export const GanttHistorial = (props: any) => {
  // const { datas, comentPost } = props;
  const navigation = useNavigation();
  const router = useRouter();
  const eventList: any = useSelector(
    (state: RootState) => state.home.eventList
  );
  const { datas } = props;

  // const dataSorted = datas?.sort((a, b) => {
  //   return b.createdAt - a.createdAt;
  // });

  //this function goes to homeTab=>commentScreen
  const comentPost = (item: any) => {
    router.push({
      pathname: "/(tabs)/search/comment",
      params: { item: item.idEventFirebase },
    });
  };

  return (
    <FlatList
      scrollEnabled={true}
      // contentContainerStyle={props.listViewContainerStyle}
      data={datas}
      renderItem={({ item, index }) => {
        const timestampData = item.createdAt;
        const timestampInMilliseconds =
          timestampData?.seconds * 1000 + timestampData?.nanoseconds / 1000000;
        const date = new Date(timestampInMilliseconds); // Function to get the abbreviated month name
        function getAbbreviatedMonthName(monthNumber: number) {
          const months = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Oct",
            "Nov",
            "Dic",
          ];
          return months[monthNumber];
        }
        // Create the formatted string "dd MMM" (e.g., "28 Ago")
        const day = date.getDate();
        const month = getAbbreviatedMonthName(date.getMonth());
        const formattedDate = `${day} ${month}`;

        //get the company name from the userEmail
        const regex = /@(.+?)\./i;
        const matches = item?.emailPerfil?.match(regex);

        return (
          <View style={{ marginLeft: 15 }}>
            <View style={[styles.rowContainer]}>
              <View style={styles.timeWrapper}>
                <View style={[styles.timeContainer, styles.timeContainerStyle]}>
                  <Text
                    style={[
                      styles.time,
                      styles.timeStyle,
                      { textAlign: "center", marginTop: 15, marginLeft: -5 },
                    ]}
                    allowFontScaling={true}
                  >
                    {formattedDate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.circle]}>
              <ImageExpo
                // source={require("../../../../assets/smcv2.jpeg")}
                source={item.icon}
                style={{ width: 20, height: 20 }}
                cachePolicy={"memory-disk"}
              />
            </View>
            <View style={styles.details}>
              <TouchableOpacity onPress={() => comentPost(item)}>
                <Text style={styles.titledetails}>{item.title}</Text>

                <View style={styles.row}>
                  <ImageExpo
                    source={{ uri: item.fotoPrincipal }}
                    cachePolicy={"memory-disk"}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.textdetail}>{item.description}</Text>
                </View>
                <Text></Text>
                {/* <View style={styles.rowavanceNombre}>
                  <Text style={styles.avanceNombre}> Etapa: </Text>

                  <Text style={styles.detail}> {item.tipoEvento}</Text>
                </View> */}
                <View style={styles.rowavanceNombre}>
                  <Text style={styles.avanceNombre}> Fecha: </Text>

                  <Text style={styles.detail}> {item.fechaPostFormato}</Text>
                </View>
                <View style={styles.rowavanceNombre}>
                  <Text style={styles.avanceNombre}> Autor: </Text>
                  <Text style={styles.detail}> {item.emailPerfil}</Text>
                </View>
                {item?.pdfFile && (
                  <View style={styles.rowavanceNombre}>
                    <Icon type="material-community" name="paperclip" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => `${index}-${item.createdAt}`}
    />
  );
};
