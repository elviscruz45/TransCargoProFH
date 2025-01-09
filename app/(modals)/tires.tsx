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
import { Button, Input } from "@rneui/themed";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./tires.styles";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { uploadTires } from "../../slices/publish";
import Tires_tracto from "@/components/tires/tracto";
import Tires_carreta_3_ejes from "@/components/tires/carreta_3ejes";
import Tires_carreta_3ejesbalon from "@/components/tires/carreta_3ejesbalon";
import Pickup from "@/components/tires/pickup";
import Auto from "@/components/tires/auto";
import Van from "@/components/tires/van";
import Volquete from "@/components/tires/volquete";
import Tires_tracto_balon from "@/components/tires/tractobalon";
import { Modal } from "@/components/shared/Modal";
import { ChangeVehiculo } from "@/components/publish/forms/ChangeVehiculo/Selection";

export default function tires() {
  const [tipo, setTipo] = useState<string>("Tracto");
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const renderVehiculo =
    tipo === "Tracto" ? (
      <Tires_tracto tipo={tipo} />
    ) : tipo === "Pick Up" ? (
      <Pickup tipo={tipo} />
    ) : tipo === "Tracto balon" ? (
      <Tires_tracto_balon tipo={tipo} />
    ) : tipo === "Carroceria 3 ejes" ? (
      <Tires_carreta_3_ejes tipo={tipo} />
    ) : tipo === "Carroceria 3 ejes balon" ? (
      <Tires_carreta_3ejesbalon tipo={tipo} />
    ) : tipo === "Auto" ? (
      <Auto tipo={tipo} />
    ) : tipo === "Van" ? (
      <Van tipo={tipo} />
    ) : tipo === "Volquete" ? (
      <Volquete tipo={tipo} />
    ) : (
      <Tires_tracto tipo={tipo} />
    );

  const selectComponent = (key: string) => {
    if (key === "tipoVehiculo") {
      setRenderComponent(
        <ChangeVehiculo onClose={onCloseOpenModal} setTipo={setTipo} />
      );
    }
    onCloseOpenModal();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text> </Text>
      <Input
        // value={formik.values.tipoGasto}
        value={tipo}
        label="Tipo de Vehiculo"
        multiline={true}
        editable={true}
        rightIcon={{
          type: "material-community",
          color: "#c2c2c2",
          name: "clipboard-list-outline",
          onPress: () => selectComponent("tipoVehiculo"),
        }}
      />
      {renderVehiculo}
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
