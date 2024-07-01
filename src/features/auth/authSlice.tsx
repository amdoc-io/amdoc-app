import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocAccount } from "../../model/AccountModel";

export interface AuthState {
  token?: string;
  account?: DocAccount;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
    },
    setAccount: (state, action: PayloadAction<DocAccount>) => {
      state.account = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, setAccount, setToken } = authSlice.actions;

export default authSlice.reducer;
