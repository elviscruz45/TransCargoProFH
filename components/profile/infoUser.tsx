import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Icon } from "@rneui/themed";

import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { styles } from "./infoUser.styles";
// import { Modal } from "../Modal";
// import { connect } from "react-redux";
// import { update_firebasePhoto } from "../../../actions/profile";
// import { update_firebaseEmail } from "../../../actions/profile";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { update_firebaseUid } from "../../../actions/profile";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
// import { ChangeManPower } from "../../Profile/ManPowerForm/ChangeManPower";
// import { userTypeList } from "../../../utils/userTypeList";
import { update_photoURL } from "../../slices/auth";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { Image as ImageExpo } from "expo-image";

export function InfoUser(props: any) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const session = useSelector((state: RootState) => state.userId.session);
  const photoUrl = useSelector((state: RootState) => state.userId.photoURL);
  const email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );

  const displayName = useSelector(
    (state: RootState) => state.userId.displayName
  );
  const userType = useSelector((state: RootState) => state.userId.userType);
  // const companyName = useSelector(
  //   (state: RootState) => state.userId.companyName
  // );
  // const descripcion = useSelector(
  //   (state: RootState) => state.userId.descripcion
  // );
  const cargo = useSelector((state: RootState) => state.userId.cargo);

  const dispatch = useDispatch();
  //global state management
  const num = useSelector((state: RootState) => state.counter.value);
  // const navigation = useNavigation();
  // const changeAvatar = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //   });

  //   if (!result.canceled) uploadImage(result.assets[0].uri);
  // };

  // const uploadImage = async (uri: string) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   const storage = getStorage();
  //   const storageRef = ref(storage, `${emailCompany}/avatar/${session}`);
  //   uploadBytesResumable(storageRef, blob).then((snapshot) => {
  //     updatePhotoUrl(snapshot.metadata.fullPath);
  //   });
  // };

  // const updatePhotoUrl = async (imagePath: any) => {
  //   const storage = getStorage();
  //   const imageRef = ref(storage, imagePath);

  //   const imageUrl = await getDownloadURL(imageRef);

  //   const auth = getAuth();
  //   if (auth.currentUser) {
  //     updateProfile(auth.currentUser, { photoURL: imageUrl });
  //   } else {
  //     console.log("no hay usuario");
  //   }
  //   ///setting data to firebase
  //   const docRef = doc(collection(db, "users"), session ?? "");
  //   // Update a property of the document

  //   await updateDoc(docRef, {
  //     photoURL: imageUrl,
  //   });

  //   dispatch(update_photoURL(imageUrl));
  // };

  // const goToApprovalScreen = () => {
  //   navigation.navigate(screen.profile.tab, {
  //     screen: screen.profile.approvals,
  //   });
  // };

  // const updateManpower = () => {
  //   setRenderComponent(<ChangeManPower onClose={onCloseOpenModal} />);
  //   setShowModal(true);
  // };
  // const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  // let approvalListPending = props.approvalListNew?.filter((item) => {
  //   return !(
  //     item.ApprovalPerformed?.includes(props.email) ||
  //     item.RejectionPerformed?.includes(props.email)
  //   );
  // });
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
      <View style={styles.content}>
        <ImageExpo
          // size="large"
          // rounded
          // containerStyle={styles.avatar}
          style={styles.avatar}
          // source={
          //   photoUrl
          //     ? { uri: photoUrl }
          //     : require("../../assets/images/userIcon.jpeg")
          // }
          source={require("../../assets/assetpics/userIcon.png")}
        >
          {/* <Avatar.Accessory size={24} onPress={changeAvatar} /> */}
        </ImageExpo>
        <View>
          <Text></Text>
          <Text style={styles.displayName}>{displayName}</Text>

          <Text style={{ color: "" }}>{email}</Text>

          <Text>{cargo}</Text>
          <Text style={{ fontWeight: "bold", color: "" }}>
            Correo del Grupo:
          </Text>

          {emailCompany && <Text style={{ color: "" }}>{emailCompany}</Text>}
        </View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>

        <Text> </Text>
        <Text> </Text>

        <Text> </Text>

        <Text> </Text>
      </View>
    </>
  );
}
