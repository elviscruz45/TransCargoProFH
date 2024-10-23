import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeNameForm.data";
import { styles } from "./ChangeNameForm.styles";
import { connect } from "react-redux";
import { db } from "../../../utils/firebase";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { update_firebaseUserName } from "../../../actions/profile";
import { userTypeList } from "../../../utils/userList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import {
  update_photoURL,
  updateEmail,
  updateCargo,
  updatecompanyName,
  updateDescripcion,
  updateDisplayName,
  updateUserType,
  updateAssetAssigned,
  updatecompanyRUC,
} from "../../../slices/auth";

export function NameForm(props: any) {
  const { onClose } = props;
  //global state management for the user_uid
  const dispatch = useDispatch();
  const companyName = useSelector(
    (state: RootState) => state.userId.companyName
  );
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const newData = formValue;
      // console.log("newData", newData);
      try {
        //Update of Authentication Firebase
        const currentLoginUser = getAuth().currentUser;
        // console.log("currentLoginUser", currentLoginUser?.email);

        if (currentLoginUser) {
          await updateProfile(currentLoginUser, {
            displayName: newData.displayNameform,
          });
        }

        //checking up if there are data in users
        const docReference = doc(db, "users", currentLoginUser?.uid ?? "");
        const docSnap = await getDoc(docReference);

        if (docSnap?.exists()) {
          const updateDataUser = {
            displayNameform: newData.displayNameform,
            cargo: newData.cargo,
            descripcion: newData.descripcion,
            // photoURL: currentLoginUser?.photoURL ?? "",
          };

          await updateDoc(docReference, updateDataUser);

          // props.update_firebaseProfile(newData);
          // props.update_firebaseUserName(newData.displayNameform);
          dispatch(updateDisplayName(newData.displayNameform));
          dispatch(updateCargo(newData.cargo));
          dispatch(updateDescripcion(newData.descripcion));
          dispatch(updatecompanyRUC(newData.companyRUC));

          // dispatch(update_photoURL(newData.photoURL));

          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Datos actualizados",
          });
        } else {
          //sign up the users in Firestore Database
          newData.photoURL = currentLoginUser?.photoURL ?? "";
          newData.email = currentLoginUser?.email ?? "";
          newData.companyName = companyName ?? "";
          newData.userType = userTypeList[4].value;
          newData.uid = currentLoginUser?.uid ?? "";
          newData.assetAssigned = [];

          ///setting data to firebase
          const docRef = doc(collection(db, "users"), newData.uid);
          await setDoc(docRef, newData);

          //updating the global state
          dispatch(update_photoURL(newData.photoURL));
          dispatch(updateEmail(newData.email));
          dispatch(updateCargo(newData.cargo));
          dispatch(updatecompanyName(newData.companyName));
          dispatch(updateDescripcion(newData.descripcion));
          dispatch(updateDisplayName(newData.displayNameform));
          dispatch(updateUserType(newData.userType));
          dispatch(updateAssetAssigned(newData.assetAssigned));
          dispatch(updatecompanyRUC(newData.companyRUC));

          // props.update_firebaseProfile(newData);
          // props.update_firebaseUserName(newData.displayNameform);
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Nombre y apellidos actualizados",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el nombre y apellidos",
        });
      }
      onClose();
    },
  });
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      <Input
        label="Nombre y Apellidos"
        value={formik.values.displayNameform}
        // placeholder="Nombre y apellidos"
        multiline={true}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayNameform", text)}
        errorMessage={formik.errors.displayNameform}
      />
      <Input
        value={formik.values.emailCompany}
        label="Email Grupo"
        // placeholder="Escribe tu cargo"
        multiline={true}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("emailCompany", text)}
        errorMessage={formik.errors.cargo}
        autoCapitalize="none"
      />
      {/*   <Input
        label="RUC Empresa"
        value={formik.values.companyRUC}
        // placeholder="Descripcion"
        multiline={true}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("companyRUC", text)}
        errorMessage={formik.errors.companyRUC}
      /> */}
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </>
  );
}
