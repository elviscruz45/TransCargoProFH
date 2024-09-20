import { userTypeList } from "./../utils/userList";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { number } from "yup";

export interface userId {
  session?: string | null;
  isLoading: boolean | null;
  photoURL?: string | null;
  email: string | null;
  cargo: string | null;
  companyName: string | null;
  descripcion: string | null;
  displayName: string | null;
  userType: string | null;
  assetAssigned: string | null;
  companyRUC: string | null;
  emailCompany: string | null;
}

const initialState: userId = {
  session: "", //-----------ok
  isLoading: false,
  photoURL: "", //-----------ok
  email: "", //-----------ok
  cargo: "", //-----------ok
  companyName: "", //-----------ok
  descripcion: "", //-----------ok
  displayName: "", //-----------ok
  userType: "", //-----------ok
  assetAssigned: "", //-----------ok
  companyRUC: "", //-----------ok
  emailCompany: "", //-----------ok
};

export const userIdSlice = createSlice({
  name: "userIdSlice",
  initialState,
  reducers: {
    update_photoURL: (state, action: PayloadAction<string>) => {
      state.photoURL = action.payload;
    },
    signIn: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.session = action.payload;
    },
    signOut: (state) => {
      state.session = "";
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.email = action.payload;
    },
    updateCargo: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.cargo = action.payload;
    },
    updatecompanyName: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.companyName = action.payload;
    },
    updateDescripcion: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.descripcion = action.payload;
    },
    updateDisplayName: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.displayName = action.payload;
    },
    updateUserType: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.userType = action.payload;
    },
    updateAssetAssigned: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.assetAssigned = action.payload;
    },
    updatecompanyRUC: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.companyRUC = action.payload;
    },
    updateEmailCompany: (state, action: PayloadAction<string>) => {
      // Perform sign-in logic here
      state.emailCompany = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signIn,
  signOut,
  update_photoURL,
  updateEmail,
  updateCargo,
  updatecompanyName,
  updateDescripcion,
  updateDisplayName,
  updateUserType,
  updateAssetAssigned,
  updatecompanyRUC,
  updateEmailCompany,
} = userIdSlice.actions;

export default userIdSlice.reducer;
