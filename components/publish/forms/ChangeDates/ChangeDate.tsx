import React, { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, Button, Text } from "react-native";
interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
  formikValue: any;
}

export function ChangeDate({ onClose, formik, formikValue }: Event) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(true);

  const onChange = (event: any, selectedDate: any) => {
    if (Platform.OS === "ios") {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      formik.setFieldValue(formikValue, currentDate);
      onClose();
    } else {
      const currentDate = selectedDate;
      setDate(currentDate);
      onClose();
    }
  };

  const showMode = (currentMode: any) => {
    if (Platform.OS === "ios") {
      setShow(true);
      setMode(currentMode);
    } else {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    }
  };

  useEffect(() => {}, []);

  const showDatepicker = () => {
    showMode("date");
  };

  if (Platform.OS === "ios") {
    return (
      <SafeAreaView>
        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
        {/* <Text>selected: {date.toLocaleString()}</Text> */}
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            style={{ alignSelf: "center", backgroundColor: "#2A3B76" }}

            // onChange={onChange}
          />
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Button onPress={showDatepicker} title="Show date pickerrr!" />
        {/* <Text>selected: {date.toLocaleString()}</Text> */}
      </SafeAreaView>
    );
  }
}

// export function ChangeFecha() {
//   // const { onClose, formik, setFechafin } = props;

//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(true);

//   const onChange = (event: any, selectedDate: any) => {
//     const currentDate = selectedDate;
//     setShow(false);
//     setDate(currentDate);
//     // setFechafin(currentDate);
//     // formik.setFieldValue("NuevaFechaEstimada", currentDate);
//     // onClose();
//   };
//   const showMode = () => {
//     DateTimePickerAndroid.open({
//       value: date,
//       // onChange,
//       // mode: mode,
//       is24Hour: true,
//     });
//   };

//   const showDatepicker = () => {
//     showMode();
//   };
//   if (Platform.OS === "ios") {
//     return (
//       <SafeAreaView>
//         {show && (
//           <DateTimePicker
//             value={date}
//             // mode={mode}
//             is24Hour={true}
//             onChange={onChange}
//             style={{ alignSelf: "center", backgroundColor: "#2A3B76" }}
//           />
//         )}
//       </SafeAreaView>
//     );
//   } else {
//     return (
//       <SafeAreaView>
//         <Button onPress={showDatepicker} title="Calendario" />
//       </SafeAreaView>
//     );
//   }
// }
