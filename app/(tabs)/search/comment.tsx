import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./comment.styles";
import { db } from "../../../utils/firebase";
import { Image as ImageExpo } from "expo-image";
import { Item } from "../../../utils/comment";
// import { db } from "../../../utils";
// import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
// import { useNavigation } from "@react-navigation/native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { screen } from "../../../utils";
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
  deleteDoc,
  persistentLocalCache,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
interface CommentProps {
  data: any[]; // Define the type of data appropriately
}
interface Post {
  fotoPrincipal?: string;
  fechaPostFormato?: string;
  tipoEvento?: string;
  comentarios?: string;
  emailPerfil?: string;
  tipoGasto?: string;
  ubicacion?: any;
  llanta?: any;
  costo?: number;
  numeroFactura?: string;
  guiaRemitente?: string;
  guiTransportista?: string;
  pdfPrincipal?: string;
  FilenameTitle?: string;
  pdfPrincipal2?: string;
  FilenameTitle2?: string;

  // Add other properties of the post object here if needed
}

export default function Comment() {
  const [postsComments, setPostsComments] = useState([]);
  const [comment, setComment] = useState("");
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const user_email =
    useSelector((state: RootState) => state.userId.email) ?? "";

  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  //global state management for the user_uid
  const { item }: any = useLocalSearchParams();

  useEffect(() => {
    let q;

    async function fetchData() {
      q = query(collection(db, "Events"), where("idEventFirebase", "==", item));

      try {
        const querySnapshot = await getDocs(q);
        const lista: any = [];
        querySnapshot.forEach((doc) => {
          lista.push(doc.data());

          // lista.push(doc.data());
        });
        const [post_unique] = lista;
        setPost(post_unique);

        // setPost(lista.slice(0, 100));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, [item]);

  //Delete function
  const docDelete = async (idDoc: any) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Estas Seguro que desear Eliminar el evento?"
      );
      if (confirmed) {
        //delete the doc from events collections
        router.back();
        await deleteDoc(doc(db, "Events", idDoc));
      }
    } else {
      Alert.alert(
        "Eliminar Evento",
        "Estas Seguro que desear Eliminar el evento?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              //delete the doc from events collections
              router.back();
              await deleteDoc(doc(db, "Events", idDoc));

              Toast.show({
                type: "success",
                position: "bottom",
                text1: "Se ha eliminado correctamente",
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  const arrayLlanta = post?.llanta.filter((item: any) => item.selected);
  const llantaTipo = post?.llanta[post?.llanta?.length - 1]?.tipo;
  console.log("llantaTipo111111111111", llantaTipo);
  //this function goes to homeTab=>commentScreen
  const editEvent = (item: any) => {
    router.push({
      pathname: "/(tabs)/search/editEvents",
      params: {
        idEventFirebase: item?.idEventFirebase,
        idFirebaseAsset: item?.idFirebaseAsset,
        fechaPostFormato: item?.fechaPostFormato,
        tipoEvento: item?.tipoEvento,
        comentarios: item?.comentarios,
        emailPerfil: item?.emailPerfil,
        tipoGasto: item?.tipoGasto,
        nombreAsset: item?.nombreAsset,
        placa: item?.placa,
      },
    });
  };

  const openMap = (latitude: any, longitude: any) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  //---This is used to get the attached file in the post that contain an attached file---
  const uploadFile = useCallback(async (uri: string) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Unable to open PDF document",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error opening PDF document",
      });
    }
  }, []);
  if (!post) {
    return <LoadingSpinner />;
  } else {
    return (
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text> </Text>
        {/* <View style={[styles.row5, styles.center]}>
          <Text style={{ margin: 5, color: "#5B5B5B" }}>
            {"Fecha:  "}
            {post?.fechaPostFormato}
          </Text>
        </View> */}
        <ImageExpo
          source={{ uri: post?.fotoPrincipal }}
          style={styles.postPhoto}
          cachePolicy={"memory-disk"}
        />
        <Text> </Text>
        <Text
          style={{
            color: "",
            fontWeight: "700",
            textAlign: "center",
            // alignSelf: "center",

            fontSize: 15,
            paddingHorizontal: 30,
          }}
          // onPress={() => goToServiceInfo()}
        >
          {post?.tipoEvento}
        </Text>
        {user_email === post?.emailPerfil && (
          <View>
            <TouchableOpacity
              onPress={() => docDelete(item)}
              style={{
                marginRight: "2%",
              }}
            >
              <ImageExpo
                source={require("../../../assets/pictures/deleteIcon.png")}
                style={styles.roundImage10}
                cachePolicy={"memory-disk"}
              />
            </TouchableOpacity>
          </View>
        )}

        {emailCompany === user_email && (
          <View>
            <TouchableOpacity
              style={{
                marginRight: "2%",
              }}
              onPress={() => editEvent(post)}
            >
              <Text> </Text>
              <ImageExpo
                source={require("../../../assets/pictures/editIcon2.png")}
                style={styles.roundImage10}
                cachePolicy={"memory-disk"}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text
          style={{
            paddingHorizontal: 5,
            fontWeight: "700",
            marginBottom: 10,
            color: "",
          }}
        >
          {" "}
          Comentario:
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            color: "",
          }}
        >
          {post?.comentarios}
        </Text>
        <Text> </Text>
        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Autor: </Text>
          <Text style={styles.detail}> {post?.emailPerfil}</Text>
        </View>
        <Text> </Text>

        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Tipo de Gasto o Ingreso: </Text>
          <Text style={styles.detail}> {post?.tipoGasto}</Text>
        </View>
        <Text> </Text>

        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Monto: </Text>
          <Text style={styles.detail}>S/. {post?.costo}</Text>
        </View>
        <Text> </Text>
        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Numero de Factura: </Text>
          <Text style={styles.detail}> {post?.numeroFactura}</Text>
        </View>
        <Text> </Text>
        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Guia de Remitente: </Text>
          <Text style={styles.detail}> {post?.guiaRemitente}</Text>
        </View>
        <Text> </Text>
        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Guia de Transportista: </Text>
          <Text style={styles.detail}> {post?.guiTransportista}</Text>
        </View>
        <Text> </Text>
        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Fecha: </Text>
          <Text style={styles.detail}> {post?.fechaPostFormato}</Text>
        </View>
        <Text> </Text>

        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Ubicacion Latitud: </Text>
          <Text style={styles.detail}>{post?.ubicacion?.coords?.latitude}</Text>
        </View>
        <Text> </Text>

        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Ubicacion Longitud: </Text>
          <Text style={styles.detail}>
            {post?.ubicacion?.coords?.longitude}
          </Text>
        </View>

        <Text> </Text>
        {post?.ubicacion?.coords?.latitude &&
          post?.ubicacion?.coords?.longitude && (
            <TouchableOpacity
              style={{ paddingHorizontal: 9 }}
              onPress={() =>
                openMap(
                  post?.ubicacion?.coords?.latitude,
                  post?.ubicacion?.coords?.longitude
                )
              }
            >
              <Text style={[styles.avanceNombre, { color: "blue" }]}>
                Ver Ubicacion
              </Text>
            </TouchableOpacity>
          )}
        <Text> </Text>

        <View style={styles.rowavanceNombre}>
          {arrayLlanta && arrayLlanta?.length > 0 && (
            <Text style={styles.avanceNombre}> Ubicacion de las llantas: </Text>
          )}

          {arrayLlanta &&
            arrayLlanta?.length > 0 &&
            arrayLlanta?.map((item: any, index: any) => (
              <Text key={index}>Llanta N: {item.value}, </Text>
            ))}
          <Text>{"  "}</Text>
          {arrayLlanta && arrayLlanta?.length > 0 && (
            <ImageExpo
              source={
                llantaTipo === "Tracto"
                  ? require("../../../assets/reportes/Tracto.png")
                  : llantaTipo === "Tracto balon"
                  ? require("../../../assets/reportes/Tracto_balon.png")
                  : llantaTipo === "Carroceria 3 ejes"
                  ? require("../../../assets/reportes/Carroceria_3_ejes.png")
                  : llantaTipo === "Carroceria 3 ejes balon"
                  ? require("../../../assets/reportes/Carroceria_3_ejes_balon.png")
                  : llantaTipo === "Auto"
                  ? require("../../../assets/reportes/Auto.png")
                  : llantaTipo === "Pick Up"
                  ? require("../../../assets/reportes/Pick_Up.png")
                  : llantaTipo === "Van"
                  ? require("../../../assets/reportes/Van.png")
                  : llantaTipo === "Volquete"
                  ? require("../../../assets/reportes/Volquete.png")
                  : require("../../../assets/reportes/Tracto.png")
              }
              style={styles.diagrama}
              cachePolicy={"memory-disk"}
            />
          )}
        </View>
        <Text> </Text>

        <Text> </Text>

        <View style={styles.rowavanceNombre}>
          <Text style={styles.avanceNombre}> Archivo Adjunto: </Text>
        </View>

        <Text> </Text>
        {post?.pdfPrincipal && (
          <TouchableOpacity
            style={{ paddingHorizontal: 9 }}
            onPress={() => uploadFile(post?.pdfPrincipal as string)}
          >
            <Text style={[styles.avanceNombre, { color: "blue" }]}>
              {post?.FilenameTitle}
            </Text>
          </TouchableOpacity>
        )}
        <Text> </Text>
        {post?.pdfPrincipal2 && (
          <TouchableOpacity
            style={{ paddingHorizontal: 9 }}
            onPress={() => uploadFile(post?.pdfPrincipal2 as string)}
          >
            <Text style={[styles.avanceNombre, { color: "blue" }]}>
              {post?.FilenameTitle2}
            </Text>
          </TouchableOpacity>
        )}
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </ScrollView>
    );
  }
}
