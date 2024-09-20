import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { styles } from "./ChangeUser.styles";
import { MultiSelectExample } from "./MultiSelection";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";

export function ChangeUserAssign(props: any) {
  const { onClose, idFirebaseAsset } = props;
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample setUsers={setUsers} setUid={setUid} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={async () => {
            setLoading(true);
 
            const Ref = doc(db, "Asset", idFirebaseAsset);
            await updateDoc(Ref, { userAssigned: users });

            //update the
            // Loop through the uid list and update each document
            // uid.forEach(async (item, index) => {
            //   const Ref2 = doc(db, "users", item);
            //   await updateDoc(Ref2, { assetAssigned: idFirebaseAsset });
            // });
            // const Ref2 = doc(db, "users", uid);

            setLoading(false);
            onClose();
          }}
          loading={loading}
        />
      </View>
    </View>
  );
}
