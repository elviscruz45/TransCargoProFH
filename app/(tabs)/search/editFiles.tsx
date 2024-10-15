import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
import { styles } from "./editFiles.styles";
import { Input, Button } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "../../../components/shared/Modal";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./editFiles.data";
import { db } from "../../../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useLocalSearchParams } from "expo-router";
import { ChangeDate } from "../../../components/publish/forms/ChangeDates/ChangeDate";
import { formatdate, CurrentFormatDate } from "../../../utils/formats";

export default function EditDocs() {
  const [renderComponent, setRenderComponent] =
    useState<React.ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [shortNameFileUpdated, setShortNameFileUpdated] = useState("");

  //global state management for the user_uid
  const {
    tipoFile,
    uidDoc,
    FilenameTitle,
    fechaPostFormato,
    pdfFileURLFirebase,
  }: any = useLocalSearchParams();
  console.log("FilenameTitle", FilenameTitle);
  console.log("fechaPostFormato", fechaPostFormato);

  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === uidDoc
  );
  const files = currentAsset?.files;

  const email = useSelector((state: RootState) => state.userId.email) ?? "";
  // const navigation = useNavigation();
  const router = useRouter();
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  const [pdfFileURL, setPdfFileURL] = useState("");

  //using Formik
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newFileListToUpdate = [...files];
        const newData = formValue;
        newData.fechaPostFormato = CurrentFormatDate(); //ok
        newData.autor = email; //ok
        newData.tipoFile = tipoFile; //ok
        // newData.FilenameTitle = FilenameTitle; //ok

        //manage the file updated to ask for aprovals
        let imageUrlPDF: any;
        let snapshotPDF;

        if (pdfFileURL) {
          snapshotPDF = await uploadPdf(pdfFileURL);
          const imagePathPDF = snapshotPDF?.metadata.fullPath;
          imageUrlPDF = await getDownloadURL(ref(getStorage(), imagePathPDF));
        }

        newData.pdfFileURLFirebase = imageUrlPDF;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events

        //managing the file
        const indexToUpdate = newFileListToUpdate.findIndex(
          (obj: any) => obj.tipoFile === tipoFile
        );
        // Check if the index is found
        if (indexToUpdate !== -1) {
          // Replace the object at the found index with the new object
          newFileListToUpdate[indexToUpdate] = newData;
        } else {
          console.log("Object with age 28 not found in the list.");
        }

        const RefFirebaseLasEventPostd = doc(db, "Asset", uidDoc);
        const updatedData = {
          files: newFileListToUpdate,
        };
        await updateDoc(RefFirebaseLasEventPostd, updatedData);
        router.back();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Documento Agregado Correctamente",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir documento",
        });
      }
    },
  });

  const uploadPdf = async (uri: any) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const fileSize = blob.size;

      if (fileSize > 50 * 1024 * 1024) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "El archivo excede los 50 MB",
        });
        throw new Error("El archivo excede los 50 MB");
      }

      const storage = getStorage();

      const storageRef = ref(
        storage,
        `${emailCompany}/pdfPost/${FilenameTitle}-${fechaPostFormato}`
      );
      return await uploadBytesResumable(storageRef, blob);
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al tratar de subir documento actual",
      });
    }
  };

  const selectComponent = (key: string, formikValue?: string) => {
    if (key === "date") {
      setRenderComponent(
        <ChangeDate
          onClose={onCloseOpenModal}
          formik={formik}
          formikValue={formikValue}
        />
      );
    }
    onCloseOpenModal();
  };

  //algorith to pick a pdf File to attach to the event
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.assets) {
        setShortNameFileUpdated(result?.assets[0]?.name);
        // formik.setFieldValue("pdfFileURL", result?.assets[0]?.uri);
        setPdfFileURL(result?.assets[0]?.uri);

        formik.setFieldValue("FilenameTitle", result?.assets[0]?.name);
      } else {
        setShortNameFileUpdated("");
      }
    } catch (err) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al tratar de subir estos datos",
      });
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.content}>
        <Input
          value={formik.values.FilenameTitle}
          errorMessage={formik.errors.FilenameTitle}
          label="Adjuntar PDF"
          multiline={true}
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              pickDocument();
            },
          }}
        />

        {Platform.OS === "web" ? (
          <View style={{ marginHorizontal: 10 }}>
            <Text> </Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              Fecha de Vencimiento
            </Text>
            <Text> </Text>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(event: any) => {
                const selectedDateString = event.target.value; // "YYYY-MM-DD" string
                const [year, month, day] = selectedDateString.split("-");
                const selectedDate = new Date(
                  Number(year),
                  Number(month) - 1,
                  Number(day)
                ); // month is 0-indexed in JavaScript Date
                formik.setFieldValue("fechaVencimiento", selectedDate);
              }}
            />
          </View>
        ) : (
          <Input
            label="Fecha de Vencimiento"
            value={formatdate(formik.values?.fechaVencimiento?.toString())}
            rightIcon={{
              type: "material-community",
              name: "update",
              color: "#c2c2c2",
              onPress: () => {
                selectComponent("date", "fechaVencimiento");
              },
            }}
          />
        )}
      </View>
      <Button
        title="Editar Documento"
        buttonStyle={styles.addInformation}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
