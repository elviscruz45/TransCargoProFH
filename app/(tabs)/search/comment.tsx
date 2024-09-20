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
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useRouter } from "expo-router";

export default function Comment() {
  const [postsComments, setPostsComments] = useState([]);
  const [comment, setComment] = useState("");
  interface Post {
    fotoPrincipal?: string;
    fechaPostFormato?: string;
    tipoEvento?: string;
    comentarios?: string;
    emailPerfil?: string;

    // Add other properties of the post object here if needed
  }
  const email = useSelector((state: RootState) => state.userId.email) ?? "";

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

  // console.log("CommentScreen");

  // const navigation = useNavigation();
  // const {
  //   route: {
  //     params: { Item },
  //   },
  // } = props;

  // useEffect(() => {
  //   const docRef = doc(db, "events", Item.idDocFirestoreDB);

  //   // const docRef = doc(db, "events", "u9UoHrWiq0ZxIuH8ggsw");
  //   let unsubscribe = onSnapshot(docRef, (snapshot) => {
  //     const post_array = snapshot.data().comentariosUsuarios || [];
  //     setPostsComments(post_array);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // //---This is used to get the attached file in the post that contain an attached file---
  // const uploadFile = useCallback(async (uri) => {
  //   try {
  //     const supported = await Linking.canOpenURL(uri);
  //     if (supported) {
  //       await Linking.openURL(uri);
  //     } else {
  //       Toast.show({
  //         type: "error",
  //         position: "bottom",
  //         text1: "No se pudo abrir el documento",
  //       });
  //     }
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       position: "bottom",
  //       text1: "Error al abrir el documento",
  //     });
  //   }
  // }, []);

  // const handleCommentChange = (text) => {
  //   setComment(text);
  // };

  // const handleSendComment = async (comment) => {
  //   // Send the comment to Firebase
  //   // Check if the comment parameter is empty or contains only spaces
  //   if (comment.trim() === "") {
  //     return;
  //   }

  //   const PostRef = doc(db, "events", Item.idDocFirestoreDB);
  //   const commentObj = {
  //     comment: comment,
  //     commenterEmail: props.email,
  //     commenterName: props.firebase_user_name,
  //     commenterPhoto: props.user_photo,
  //     date: new Date().getTime(),
  //   };
  //   await updateDoc(PostRef, {
  //     comentariosUsuarios: arrayUnion(commentObj),
  //   });
  //   // Clear the comment input
  //   setComment("");
  // };

  // // goToServiceInfo
  // const goToServiceInfo = () => {
  //   navigation.navigate(screen.search.tab, {
  //     screen: screen.search.item,
  //     params: { Item: Item.AITidServicios },
  //   });
  // };

  //Delete function
  const docDelete = async (idDoc: any) => {
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
  };

  if (!post) {
    return <LoadingSpinner />;
  } else {
    return (
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}

        // contentContainerStyle={{ flexGrow: 1 }} // Allow the content to grow inside the ScrollView
        // keyboardShouldPersistTaps="handled" // Ensure taps are handled when the keyboard is open
      >
        <Text></Text>
        <View style={[styles.row5, styles.center]}>
          <Text style={{ margin: 5, color: "#5B5B5B" }}>
            {"Fecha:  "}
            {post?.fechaPostFormato}
          </Text>
        </View>

        <ImageExpo
          source={{ uri: post?.fotoPrincipal }}
          style={styles.postPhoto}
          cachePolicy={"memory-disk"}
        />

        <Text
          style={{
            color: "black",
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
        {email === post?.emailPerfil && (
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
        )}

        <Text></Text>
        <Text
          style={{
            paddingHorizontal: 5,
          }}
        >
          {post?.comentarios}
        </Text>
        <Text></Text>
      </ScrollView>
    );
  }
}
