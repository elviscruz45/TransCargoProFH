import { View, Text, Platform, Alert } from "react-native";
import React, { useState } from "react";
import { styles } from "./addFiles.styles";
import { Input, Button } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "../../../components/shared/Modal";
import { ChangeDisplayFileTipo } from "../../../components/search/ChangeFIleTipo/ChangeDisplayFileTipo";
// import { connect } from "react-redux";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./addFiles.data";
import { db } from "../../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
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
import { SelectDocument } from "../../../components/search/TipoFile/Tipo";
import { supabase } from "@/supabase/client";

export default function AddDocs() {
  const [pickedDocument, setPickedDocument] = useState(null);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [shortNameFileUpdated, setShortNameFileUpdated] = useState("");
  const [tipoFile, setTipoFile] = useState("");
  //global state management for the user_uid
  const { item }: any = useLocalSearchParams();
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );

  const currentUserNameDoc = currentAsset?.nombre;
  const currentAssetId = currentAsset?.id;

  const tipoActivoCurrent = currentAsset?.tipoActivo;
  const files = currentAsset?.files;

  const tipoFileList = files?.map((item: any) => item.tipoFile);

  const email = useSelector((state: RootState) => state.userId.email) ?? "";
  // const navigation = useNavigation();
  const router = useRouter();

  //configuring the name of the pdf file to make it readable
  let shortNameFile = "";

  if (pickedDocument) {
    shortNameFile = pickedDocument;
    // shortNameFile = pickedDocument.replace(/%20/g, "_").split("/").pop();
  }

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  const [pdfFileURL, setPdfFileURL] = useState("");

  //using Formik
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (tipoFileList?.includes(formValue.tipoFile)) {
          if (Platform.OS === "web") {
            const confirmed = window.confirm("Ya esta creado este documento");
          } else {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Ya esta creado este documento",
            });
          }
          router.back();

          return;
        }
        const newData = formValue;
        newData.fechaPostFormato = CurrentFormatDate();
        newData.autor = email;
        newData.nombre = currentUserNameDoc;
        newData.idAssetFirebase = currentAssetId;

        //manage the file updated to ask for aprovals
        let imageUrlPDF: any;
        let snapshotPDF;

        // if (pdfFileURL) {
        //   snapshotPDF = await uploadPdf(pdfFileURL, newData.fechaPostFormato);

        //   const imagePathPDF = snapshotPDF?.metadata.fullPath;
        //   imageUrlPDF = await getDownloadURL(ref(getStorage(), imagePathPDF));
        // }
        const file = await uploadPdf(pdfFileURL, newData.fechaPostFormato);
        let publicUrl = "";
        if (file) {
          const { blob, fileName } = file;
          // Use blob and fileName here

          // Upload to Supabase Storage
          const { data, error } = await supabase.storage
            .from("assets_documents")
            .upload(fileName, blob, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) throw error;


          // Get Public URL
          publicUrl = supabase.storage
            .from("assets_documents")
            .getPublicUrl(fileName).data.publicUrl;

         

          Alert.alert("Success", "File uploaded successfully!");
        } else {
          console.error("Failed to upload PDF");
        }

        newData.pdfFileURLFirebase = publicUrl;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        // const RefFirebaseLasEventPostd = doc(db, "Asset", item);

        // const updatedData = {
        //   files: arrayUnion(newData),
        // };

        // await updateDoc(RefFirebaseLasEventPostd, updatedData);

        //----------SUPABASE ADD DATABASE-------------
        // const updatedData = {
        //   files: arrayUnion(newData),
        // };

        // const { data, error } = await supabase
        //   .from("assets")
        //   .update({ other_column: "otherValue" })
        //   .eq("some_column", "someValue")
        //   .select();

        // if (error) {
        //   console.error("Error inserting data:", error);
        // } else {
        // }
    
        //----------SUPABASE-------------
        const { data: currentData, error: fetchError } = await supabase
          .from("assets")
          .select("files")
          .eq("id", currentAssetId)
          .single();


        if (fetchError) {
          console.error("Error fetching current data:", fetchError);
          throw fetchError;
        }

        const updatedFiles = [...(currentData?.files || []), newData];

        const { data: files, error: errorFiles } = await supabase
          .from("assets")
          .update({ files: updatedFiles })
          .eq("id", currentAssetId)
          .select();

        if (errorFiles) {
          console.error("Error updating data:", errorFiles);
        } else {
          console.log("Update successful:", files);
        }

        router.back();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Documento Agregado Correctamente",
        });
      } catch (error) {
        console.error("Error uploading PDF file:", error);

        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir documento",
        });
      }
    },
  });

  const uploadPdf = async (uri: any, formattedDate: any) => {
    try {
      const response = await fetch(uri);

      const blob = await response.blob();
      const fileName = `${emailCompany}/pdfPost/assets/${shortNameFileUpdated}-${formattedDate}`;
      const fileSize = blob.size;
      if (fileSize > 50 * 1024 * 1024) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "El archivo excede los 50 MB",
        });
        throw new Error("El archivo excede los 50 MB");
      }
      return { blob, fileName };
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al tratar de subir documento actual",
      });
    }
  };

  const selectComponent = (key: string, formikValue?: string) => {
    if (key === "TipoDocumento") {
      setRenderComponent(
        <SelectDocument
          onClose={onCloseOpenModal}
          formik={formik}
          setTipoFile={setTipoFile}
          tipoActivoCurrent={tipoActivoCurrent}
        />
      );
    }

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

        <Input
          value={formik.values.tipoFile}
          // errorMessage={formik.errors.tipoFile}
          label="Tipo de Documento Adjunto"
          multiline={true}
          editable={true}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("TipoDocumento"),
          }}
          onChangeText={(text) => formik.setFieldValue("tipoFile", text)}
        />

        {/* {tipoFile === "Otro" && (
          <Input
            label="Nuevo Tipo de Documento Adjunto"
            // value={formik.values.tipoFile}
            editable={true}
            onChangeText={(text) => formik.setFieldValue("tipoFile", text)}
          />
        )} */}

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
        title="Agregar Documento"
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
