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

export function ChangeAssets(props: any) {
  const { onClose, uidUser } = props;
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <View style={styles.content}>
        <MultiSelectExample setAssets={setAssets} />
        <Button
          title="Aceptar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={async () => {
            setLoading(true);
            const Ref = doc(db, "users", uidUser);
            await updateDoc(Ref, { assetAssigned: assets });
            setLoading(false);
            onClose();
          }}
          loading={loading}
        />
      </View>
    </View>
  );
}
