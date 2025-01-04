import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { Button } from "@rneui/themed";

import { styles } from "./assetAssigned.styles";
import { useNavigation, useLocalSearchParams } from "expo-router";
// import { screen } from "../../../utils";
import { connect } from "react-redux";
// import { saveActualEquipment } from "../../../actions/post";
// import { EquipmentListUpper } from "../../../actions/home";
// import { areaLists } from "../../../utils/areaList";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Item } from "../../../utils/moreInformation";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { SearchBar, Icon } from "@rneui/themed";
import { Modal } from "../../../components/shared/Modal";
import { ChangeUserAssign } from "../../../components/profile/ChangeUserAssigned/ChangeUser";
import { updateEmployees } from "../../../slices/profile";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
  getDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  limit,
} from "firebase/firestore";
import { ChangeResponsability } from "@/components/profile/ChangeResponsabilityForm/Selection";
import { ChangeAssets } from "@/components/profile/ChangeAssetAssigned/ChangeAssets";

import { db } from "../../../utils/firebase";
const windowWidth = Dimensions.get("window").width;
export default function AssetAssigned() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [responsability, setResponsability] = useState("");

  const email = useSelector((state: RootState) => state.userId.email);
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  //global state management for the user_uid
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  const employees = useSelector((state: RootState) => state.profile.employees);
  const companyRUC = useSelector((state: RootState) => state.userId.companyRUC);
  const dispatch = useDispatch();
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  //modal management
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(employees?.slice(0, 100));
    } else {
      const result = employees?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.displayNameform) || re.test(item.email);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText, employees]);

  // const userCompanyConfirmation = (
  //   uid: any,
  //   companyManagerConfimation: any
  // ) => {
  //   Alert.alert(
  //     "Confirmar",
  //     "Estas Seguro de confirmar a este usuario en la empresa?",
  //     [
  //       {
  //         text: "Cancelar",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Aceptar",
  //         onPress: async () => {
  //           const Ref = doc(db, "users", uid);
  //           companyManagerConfimation
  //             ? await updateDoc(Ref, { companyManagerConfimation: false })
  //             : await updateDoc(Ref, { companyManagerConfimation: true });
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };
  // useEffect(() => {
  //   let unsubscribe: any;
  //   let lista: any = [];

  //   async function fetchData() {
  //     let queryRef;
  //     queryRef = query(
  //       collection(db, "users"),
  //       where("emailCompany", "==", emailCompany)
  //     );
  //     unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
  //       lista = [];
  //       ItemFirebase.forEach((doc) => {
  //         lista.push(doc.data());
  //       });
  //       dispatch(updateEmployees(lista));
  //     });
  //   }

  //   fetchData();

  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, []);
  //this function goes to another screen to get more detail about the service state
  const MoreDetail = (item: any) => {
    router.push({
      pathname: "/profile/moreDetail",
      params: { item: item },
    });
  };

  const update_Data = (uid: any) => {
    setRenderComponent(
      <ChangeResponsability onClose={onCloseOpenModal} uid={uid} />
    );
    setShowModal(true);
  };

  const SelectAssets = (uidUser: any) => {
    setRenderComponent(
      <ChangeAssets onClose={onCloseOpenModal} uidUser={uidUser} />
    );
    setShowModal(true);
  };

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        {/* {console.log("SearchItem")} */}
        <FlatList
          data={searchResults}
          ListHeaderComponent={
            <SearchBar
              placeholder="Buscar Usuario"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              lightTheme={true}
              inputContainerStyle={{ backgroundColor: "white" }}
            />
          }
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  // alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 15,
                }}
              >
                <View
                  style={[styles.equipments, { alignSelf: "center", flex: 2 }]}
                >
                  <TouchableOpacity onPress={() => MoreDetail(item.uid)}>
                    <ImageExpo
                      source={
                        item?.photoURL
                          ? { uri: item?.photoURL }
                          : require("../../../assets/assetpics/userIcon.png")
                      }
                      style={styles.image}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>

                  <View>
                    {item.displayNameform && (
                      <Text style={[styles.info, { alignSelf: "center" }]}>
                        {item.displayNameform}
                      </Text>
                    )}
                    {item.email && (
                      <Text style={styles.info}>{item.email}</Text>
                    )}
                  </View>
                </View>

                <View
                  style={[styles.equipments, { alignSelf: "center", flex: 1 }]}
                >
                  <Button
                    title={
                      item?.assetAssigned?.length > 0
                        ? item?.assetAssigned.join(", ")
                        : "No tiene responsabilidades"
                    }
                    titleStyle={styles.btnTextStyle}
                    onPress={() => SelectAssets(item.uid)}
                  />
                  <Text> </Text>
                  <Button
                    title={item.userType ? item.userType : "Ninguno"}
                    buttonStyle={[
                      // styles.btnActualizarStyles,
                      item.userType !== "Inactivo" && item.userType !== ""
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" },
                    ]}
                    titleStyle={styles.btnTextStyle}
                    onPress={() => update_Data(item.uid)}
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item: any) => item.uid}
        />
      </View>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}
