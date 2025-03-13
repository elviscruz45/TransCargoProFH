// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // const { initializeApp } = require("firebase/app");
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// // import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { initializeAuth } from "firebase/auth";

// // import {
// //   initializeAuth,
// //   browserLocalPersistence,
// //   browserPopupRedirectResolver,
// //   browserSessionPersistence,
// //   indexedDBLocalPersistence,
// // } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // ---------TransCargoPro------TransCargoPro2--ecruzchullo@gmail.com

// const firebaseConfig = {
//   apiKey: "AIzaSyBJ24LyDaCfJkSfBWmygyyqlHTxrtheP2E",
//   authDomain: "transcargopro2.firebaseapp.com",
//   projectId: "transcargopro2",
//   storageBucket: "transcargopro2.appspot.com",
//   messagingSenderId: "53564081522",
//   appId: "1:53564081522:web:18632f6f784a3e7cb249eb",
// };

// // // ---------TransCargoPro-3------TransCargoPro2--ecruzchullo@gmail.com

// // // Your web app's Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDlxIAKLjR4gd-8CmBWm0WwixqWJdPHX60",
// //   authDomain: "transcargopro-3.firebaseapp.com",
// //   projectId: "transcargopro-3",
// //   storageBucket: "transcargopro-3.appspot.com",
// //   messagingSenderId: "661012100907",
// //   appId: "1:661012100907:web:dfdf753b18f59140a6376e"
// // };

// // //----

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const db = getFirestore(app);

// // export const auth = initializeAuth(app, {
// //   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// // });

// // export const auth = initializeAuth(app);

// export const auth = initializeAuth(app, {
//   persistence: [],
// });

// // let auth;
// // if (typeof window === "undefined") {
// //   // Running in a web browser
// //   auth = initializeAuth(app);
// // } else {
// //   // Running in a React Native environment
// //   auth = initializeAuth(app, {
// //     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// //   });
// // }

// // export { auth };
// // let auth;

// // if (typeof window !== "undefined") {
// //   // Running in a web browser
// //   auth = initializeAuth(app, {
// //     persistence: browserLocalPersistence,
// //   });
// // } else {
// //   // Running in a React Native environment
// //   auth = initializeAuth(app, {
// //     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// //   });
// // }

// // export { auth };
