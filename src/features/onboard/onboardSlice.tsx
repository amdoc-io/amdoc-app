import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Infrastructure } from "../../model/AccountModel";

export interface OnboardState {
  infrastructure?: Infrastructure;
}

const initialState: OnboardState = {
  infrastructure: undefined,
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    setInfrastructure: (state, action: PayloadAction<Infrastructure>) => {
      state.infrastructure = action.payload;
    },
  },
});

export const { setInfrastructure } = onboardSlice.actions;

export default onboardSlice.reducer;
