import React from "react";
import { Text, View, ScrollView } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./index.styles";
// import { ConnectedLoginForm } from "../../components/Auth";
import { Image as ImageExpo } from "expo-image";
import { Linking } from "react-native";
// import { LoginForm } from "../../components/login/LoginForm";
import { LoginForm } from "@/components/login/LoginForm";

export default function AuthScreen() {
  const goToRegister = () => {
    Linking.openURL("https://www.teseosoftwarecompany.com/"); // to register a new user , it show to get in touch with a personel from Teseo
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.image}>
        <ImageExpo
          source={require("../assets/pictures/logotransp.png")}
          // source={require("../../assets/pictures/appTeseoLogol.png")}

          style={{ width: 80, height: 70 }}
          cachePolicy={"memory-disk"}
        />
        <Text></Text>
        <Text></Text>

        <ImageExpo
          source={require("../assets/pictures/transpro_letra2.png")}
          // source={require("../../assets/pictures/TeseoLetra.png")}
          style={{ width: 188, height: 37 }}
          cachePolicy={"memory-disk"}
        />
      </View>
      <View>
        <LoginForm />

        {/* <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta:{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Regístrarse
          </Text>
        </Text> */}
      </View>
    </ScrollView>
  );
}
