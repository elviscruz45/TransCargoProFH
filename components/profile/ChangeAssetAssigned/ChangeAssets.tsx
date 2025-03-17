import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { styles } from "./ChangeUser.styles";
import { MultiSelectExample } from "./MultiSelection";

import { supabase } from "@/supabase/client";

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
            // const Ref = doc(db, "users", uidUser);
            // await updateDoc(Ref, { assetAssigned: assets });

            // Update the assetAssigned field in the users table using Supabase

            console.log("uidUser", uidUser, assets);
            const { data, error } = await supabase
              .from("users")
              .update({ asset_assigned: assets })
              .eq("id", uidUser);

            if (error) {
              console.error("Error updating assetAssigned:", error);
            } else {
              console.log("assetAssigned updated successfully:", data);
            }

            setLoading(false);
            onClose();
          }}
          loading={loading}
        />
      </View>
    </View>
  );
}
