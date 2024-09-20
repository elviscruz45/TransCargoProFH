import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface searchState {
  asset: Object | null;
  pictureEvent: string | null;
}

const initialState: searchState = {
  asset: null,
  pictureEvent: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    pickAsset: (state, action: PayloadAction<Object>) => {
      state.asset = action.payload;
    },
    pickPictureEvent: (state, action: PayloadAction<string>) => {
      state.pictureEvent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pickAsset, pickPictureEvent } = searchSlice.actions;

export default searchSlice.reducer;
