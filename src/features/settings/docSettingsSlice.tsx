import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocSettings } from "../../model/AccountModel";

export interface DocSettingsState {
  docSettings?: DocSettings;
}

const initialState: DocSettingsState = {
  docSettings: undefined,
};

export const docSettingsSlice = createSlice({
  name: "docSettings",
  initialState,
  reducers: {
    setDocSettings: (state, action: PayloadAction<DocSettings | undefined>) => {
      state.docSettings = action.payload;
    },
  },
});

export const { setDocSettings } = docSettingsSlice.actions;

export default docSettingsSlice.reducer;
