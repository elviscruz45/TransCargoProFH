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
import { v4 as uuidv4 } from "uuid";

import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useLocalSearchParams } from "expo-router";
import { ChangeDate } from "../../../components/publish/forms/ChangeDates/ChangeDate";
import { formatdate, CurrentFormatDate } from "../../../utils/formats";
import { SelectDocument } from "../../../components/profile/TipoFile/Tipo";
import { supabase } from "@/supabase/client";

export default function AddDocs() {
  const emailCompany = useSelector(
    (state: RootState) => state.userId.emailCompany
  );
  const [renderComponent, setRenderComponent] =
    useState<React.ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [shortNameFileUpdated, setShortNameFileUpdated] = useState("");
  const [tipoFile, setTipoFile] = useState("");
  //global state management for the user_uid
  const { item }: any = useLocalSearchParams();

  const employeesList = useSelector(
    (state: RootState) => state.profile.employees
  );
  const currentEmployee: any = employeesList.find(
    (user: any) => user.id === item
  );
  const currentUserNameDoc = currentEmployee?.email.split("@")[0];
  const usuarioIDCurrent = currentEmployee?.id;

  const files = currentEmployee?.files;

  const tipoFileList = files?.map((item: any) => item.tipoFile);

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
        if (tipoFileList?.includes(formValue.tipoFile)) {
          router.back();
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Ya esta creado este documento",
          });
          return;
        }

        const newData = formValue;
        newData.fechaPostFormato = CurrentFormatDate();
        newData.autor = email;
        newData.nombre = currentUserNameDoc;
        newData.idFirebase = usuarioIDCurrent;

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

          if (error) console.error("Error uploading PDF:", error);

          // Get Public URL
          publicUrl = supabase.storage
            .from("assets_documents")
            .getPublicUrl(fileName).data.publicUrl;


          Alert.alert("Success", "File uploaded successfully!");
        } else {
          console.error("Failed to upload PDF");
        }

        newData.pdfFileURLFirebase = publicUrl;

        //----------SUPABASE-------------
        const { data: currentData, error: fetchError } = await supabase
          .from("users")
          .select("files")
          .eq("id", usuarioIDCurrent)
          .single();

        if (fetchError) {
          console.error("Error fetching current data:", fetchError);
          throw fetchError;
        }

        const updatedFiles = [...(currentData?.files || []), newData];

        const { data: files, error: errorFiles } = await supabase
          .from("users")
          .update({ files: updatedFiles })
          .eq("id", usuarioIDCurrent)
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
      const fileName = `${emailCompany}/pdfPost/profile/${shortNameFileUpdated}-${formattedDate}`;
      const fileSize = blob.size;

      if (fileSize > 50 * 1024 * 1024) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "El archivo excede los 50 MB",
        });
        throw new Error("El archivo excede los 50 MB");
      }

      // const storage = getStorage();

      // const storageRef = ref(
      //   storage,
      //   `${emailCompany}/pdfPost/${shortNameFileUpdated}-${formattedDate}`
      // );
      // return await uploadBytesResumable(storageRef, blob);
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

  // const handleChange = (event: any) => {
  //   const selectedDateString = event.target.value; // "YYYY-MM-DD" string
  //   const [year, month, day] = selectedDateString.split("-");
  //   const selectedDate = new Date(Number(year), Number(month) - 1, Number(day)); // month is 0-indexed in JavaScript Date
  //   formik.setFieldValue("fechaVencimiento", selectedDate);
  // };

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
