import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import { useFormik } from "formik";
import {
  getAuth,
  signInWithEmailAndPassword,
  initializeAuth,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./LoginForm.data";
import { styles } from "./LoginForm.styles";
// import { connect } from "react-redux";
// import { update_firebaseUserUid } from "../../../actions/auth";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { db } from "../../../utils";
import { db, app } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, getApp } from "firebase/app";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { signIn, updateEmailCompany, updateEmail } from "../../slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/supabase/client";

export function LoginForm(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const onShowHidePassword = () => setShowPassword((prevState) => !prevState);
  const router = useRouter();
  // const [user_uid, setUser_uid] = useState("");


  //global statemanagment
  // const num = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  const retrieveData = async () => {
    try {
      const emailPersist = (await AsyncStorage.getItem("emailPersist")) ?? "";
      const passwordPersist =
        (await AsyncStorage.getItem("passwordPersist")) ?? "";
      const emailCompanyPersist =
        (await AsyncStorage.getItem("emailCompanyPersist")) ?? "";

      formik.setFieldValue("email", JSON.parse(emailPersist));
      formik.setFieldValue("password", JSON.parse(passwordPersist));
      formik.setFieldValue("emailCompany", JSON.parse(emailCompanyPersist));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        // const auth = getAuth();
        // const userCredential = await signInWithEmailAndPassword(
        //   auth,
        //   formValue.email,
        //   formValue.password
        // );

        //supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formValue.email,
          password: formValue.password,
        });

        const user_id = data?.user?.id;
        // const docRef = doc(db, "users", user_uid);
        // const docSnap = await getDoc(docRef);
  

        //---supabase user data--------

        let { data: users, error: erroUser } = await supabase
          .from("users")
          .select("uid")
          .eq("uid", user_id);
        //------------------------------

        dispatch(signIn(user_id!!));
        dispatch(updateEmailCompany(formValue.emailCompany));
        dispatch(updateEmail(formValue.email));

        //async storage
        await AsyncStorage.setItem(
          "emailPersist",
          JSON.stringify(formValue.email)
        );
        await AsyncStorage.setItem(
          "passwordPersist",
          JSON.stringify(formValue.password)
        );
        await AsyncStorage.setItem(
          "emailCompanyPersist",
          JSON.stringify(formValue.emailCompany)
        );

        if (!erroUser && users?.length!! > 0) {
          router.push("/(tabs)/home");
          Toast.show({
            type: "success",
            position: "top",
            text1: "Bienvenido",
            visibilityTime: 1000,
          });
        } else {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Actualice sus datos en el perfil para comenzar",
            visibilityTime: 3000,
          });
          router.push("/(tabs)/profile");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          // position: "top",
          position: "bottom",
          visibilityTime: 1000,
          text1: "Usuario o contraseña incorrectos",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        value={formik.values.email}
        placeholder="Correo electronico"
        autoCapitalize="none"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text: string) => {
          //avoid spaces
          const email = text.replace(/\s/g, "");
          formik.setFieldValue("email", email);
        }}
        errorMessage={formik.errors.email}
      />

      <Input
        value={formik.values.password}
        placeholder="Contraseña"
        autoCapitalize="none"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={onShowHidePassword}
          />
        }
        onChangeText={(text: string) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        value={formik.values.emailCompany}
        placeholder="Correo Grupal"
        autoCapitalize="none"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text: string) => {
          //avoid spaces
          const email = text.replace(/\s/g, "");
          formik.setFieldValue("emailCompany", email);
        }}
        errorMessage={formik.errors.emailCompany}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
