import { TouchableOpacity, Button } from "react-native";
import React, { useRef, useState } from "react";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
import { styles } from "./camera.styles";
import {
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { takePhoto } from "../../../slices/publish";

export default function CameraScreen() {
  const [type, setType] = useState<CameraType>("back");
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const dispatch = useDispatch();
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tu permiso para usar la camara
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  async function snapPhoto() {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef?.current?.takePictureAsync(options);

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 800 } }],
        {
          compress: 0.2,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );
      // props.savePhotoUri(resizedPhoto.uri);
      dispatch(takePhoto(resizedPhoto.uri));
      // navigation.navigate(screen.post.form);
      router.push({
        pathname: "/publish/events",
        // params: { item: item },
      });
    }
  }
  // function toggleCameraType() {
  //   setType((current) =>
  //     current === "back" ? "front" : "back"
  //   console.log("current", current);
  //   );
  // }
  function toggleCameraType() {
    setType((current) => {
      const newType = current === "back" ? "front" : "back";
      console.log("current", current);
      return newType;
    });
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse-sharp" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => snapPhoto()}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 30,
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
