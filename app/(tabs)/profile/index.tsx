import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Button } from "@rneui/themed";

import { getAuth, signOut } from "firebase/auth";
import { InfoUser } from "../../../components/profile/infoUser";
import { styles } from "./index.styles";
import { DateScreen } from "../../../components/profile/DateScreen/DateScreen";
import { Modal } from "../../../components/shared/Modal";
import { NameForm } from "../../../components/profile/ChangeUserForm/ChangeNameForm";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { signOut as CloseApp } from "../../../slices/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Image as ImageExpo } from "expo-image";

export default function Profile(props: any) {
  // console.log("ProfileScreen");
  const router = useRouter();

  const num = useSelector((state: RootState) => state.counter.value);

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const [post, setPost] = useState(null);
  //states of filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [removeFilter, setRemoveFilter] = useState(true);
  const email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    // props.update_firebaseUserUid("");
    dispatch(CloseApp());
    router.replace({
      pathname: "/",
    });
    // props.update_firebaseProfile("");
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const update_Data = () => {
    setRenderComponent(<NameForm onClose={onCloseOpenModal} />);
    setShowModal(true);
  };

  //Changing the value to activate again the filter to rende the posts
  // const filter = (start: any, end: any) => {
  //   setStartDate(start);
  //   setEndDate(end);
  // };
  // const quitfilter = () => {
  //   setRemoveFilter((prev) => !prev);
  //   setStartDate(null);
  //   setEndDate(null);
  // };
  // //this function goes to another screen to get more detail about the service state
  // const MoreDetail = () => {
  //   router.push({
  //     pathname: "/search/moreDetail",
  //     params: { item: item },
  //   });
  // };
  // //Using navigation.navigate I send it to another screen (post)
  // const goToDocs = () => {
  //   router.push({
  //     pathname: "/search/files",
  //     params: { item: item },
  //   });
  // };
  const goToAssetScreen = () => {
    router.push({
      pathname: "/profile/assetAssigned",
    });
  };
  const goToUsersScreen = () => {
    router.push({
      pathname: "/profile/userAssigned",
    });
  };
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <View>
          <InfoUser />
        </View>
        <Text></Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-between",

            // paddingHorizontal: 150,
          }}
        >
          <Text></Text>
          {emailCompany === email && (
            <TouchableOpacity
              // style={styles.btnContainer4}
              onPress={() => goToAssetScreen()}
            >
              <Image
                source={require("../../../assets/assetpics/assetsIcon.png")}
                style={styles.roundImageUpload2}
              />
            </TouchableOpacity>
          )}

          {emailCompany === email && (
            <TouchableOpacity
              // style={styles.btnContainer4}
              onPress={() => goToUsersScreen()}
            >
              <Image
                source={require("../../../assets/pictures/manpower2.png")}
                style={styles.roundImageUpload2}
              />
            </TouchableOpacity>
          )}

          <Text></Text>
        </View>
        <Text></Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text></Text>
          <Button
            title="Editar"
            buttonStyle={styles.btnActualizarStyles}
            titleStyle={styles.btnTextStyle}
            onPress={() => update_Data()}
          />

          <Button
            title="Cerrar "
            buttonStyle={styles.btncerrarStyles}
            titleStyle={styles.btnTextStyle}
            onPress={() => logout()}
          />
          <Text></Text>
          {/* <Text></Text> */}
        </View>
        {/* <DateScreen filterButton={filter} quitFilterButton={quitfilter} /> */}
      </ScrollView>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}
