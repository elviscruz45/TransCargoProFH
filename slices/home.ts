import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface homeState {
  assetList: Array<Object> | null;
  eventList: Array<Object> | null;
  assetList_idFirebaseAsset: Array<Object> | null;
}

const initialState: homeState = {
  assetList: null,
  assetList_idFirebaseAsset: null,
  eventList: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setAssetList: (state, action: PayloadAction<Array<Object>>) => {
      state.assetList = action.payload;
    },
    setAssetList_idFirebaseAsset: (
      state,
      action: PayloadAction<Array<Object>>
    ) => {
      state.assetList_idFirebaseAsset = action.payload;
    },
    setEventList: (state, action: PayloadAction<Array<Object>>) => {
      state.eventList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAssetList, setEventList, setAssetList_idFirebaseAsset } =
  homeSlice.actions;

export default homeSlice.reducer;
