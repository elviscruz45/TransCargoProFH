import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface homeState {
  assetList: Array<Object> | null;
  eventList: Array<Object> | null;
  assetList_idFirebaseAsset: Array<Object> | null;
}

const initialState: homeState = {
  assetList: [],
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

    addAsset: (state, action: PayloadAction<Object>) => {
      state.assetList?.unshift(action.payload);
    },
    updateAsset: (state, action: PayloadAction<any>) => {
      state.assetList =
        state.assetList?.map((asset: any) =>
          asset.id === action.payload.id ? action.payload : asset
        ) || null;
    },
    removeAsset: (state, action: PayloadAction<any>) => {
      state.assetList =
        state.assetList?.filter((asset: any) => asset.id !== action.payload) ||
        null;
    },
    addEvent: (state, action: PayloadAction<Object>) => {
      state.eventList?.unshift(action.payload);
    },
    updateEvent: (state, action: PayloadAction<any>) => {
      state.eventList =
        state.eventList?.map((event: any) =>
          event.id === action.payload.id ? action.payload : event
        ) || null;
    },
    removeEvent: (state, action: PayloadAction<any>) => {
      state.eventList =
        state.eventList?.filter((event: any) => event.id !== action.payload) ||
        null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAssetList,
  setEventList,
  setAssetList_idFirebaseAsset,
  addAsset,
  updateAsset,
  removeAsset,
  addEvent,
  updateEvent,
  removeEvent,
} = homeSlice.actions;

export default homeSlice.reducer;
