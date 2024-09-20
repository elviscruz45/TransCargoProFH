import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Avatar, Button } from "react-native-elements";

import { styles } from "./mapForm.styles";
import MapView, { Marker } from "react-native-maps";
import { Modal } from "../../../shared/Modal";
interface MapFormProps {
  onClose: () => void;
  formik: any; // replace with the actual type
  setUbicacion: any; // replace with the actual type
}

export const MapForm: React.FC<MapFormProps> = ({
  onClose,
  formik,
  setUbicacion,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onChangeLocation = () => {
    formik.setFieldValue("ubicacion", location);
    onClose();
  };

  //   -16.394598184045645, -71.57001663811025
  return (
    // <Modal show={showModal} close={onCloseOpenModal}>
    <View>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        initialRegion={{
          latitude: location?.coords.latitude ?? -16.394598184045645,
          longitude: location?.coords.longitude ?? -71.57001663811025,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // onLongPress={(e) => {
        //   console.log("e", e.nativeEvent.coordinate);
        //   console.log("location", location);
        //   //   setLocation;
        // }}
        // onRegionChange={(e) => {
        //   console.log("e", e);
        // }}
        // onUserLocationChange={
        //   (e) => {
        //     console.log("e", e.nativeEvent.coordinate);
        //   }
        //   //   console.log("e", e.nativeEvent.coordinate);
        // }
        // onUserLocationChange={(e) => {
        //     console.log("e", e.nativeEvent.coordinate);
        // }
      >
        <Marker
          coordinate={{
            latitude: location?.coords.latitude ?? -16.394598184045645,
            longitude: location?.coords.longitude ?? -71.57031663811025,
          }}
          title={"teste"}
          description={"teste"}
        />
      </MapView>
      <Button
        title="Ubicar"
        buttonStyle={styles.addInformation}
        onPress={onChangeLocation}
      />
    </View>
    // </Modal>
    // <View style={styles.container}>
    //   <Text style={styles.paragraph}>{text}</Text>
    // </View>
  );
};
