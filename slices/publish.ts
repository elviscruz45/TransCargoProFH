import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface publishState {
  asset: Object | null;
  cameraUri: string | null;
  tires: Array<Object> | null;
}

const initialState: publishState = {
  asset: null,
  cameraUri: null,
  tires: null,
};

export const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    pickAsset: (state, action: PayloadAction<Object>) => {
      state.asset = action.payload;
    },

    takePhoto: (state, action: PayloadAction<string>) => {
      state.cameraUri = action.payload;
    },
    uploadTires: (state, action: PayloadAction<Array<Object>>) => {
      state.tires = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pickAsset, takePhoto, uploadTires } = publishSlice.actions;

export default publishSlice.reducer;
