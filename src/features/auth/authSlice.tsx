import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocAccount } from "../../model/AccountModel";

export interface AuthState {
  token?: string;
  account?: DocAccount;
  signedInAt?: string;
  githubUser?: any;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
  signedInAt: undefined,
  githubUser: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
      state.signedInAt = action.payload.signedInAt;
    },
    setAccount: (state, action: PayloadAction<DocAccount>) => {
      state.account = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setGithubUser: (state, action: PayloadAction<any | undefined>) => {
      state.githubUser = action.payload;
    },
  },
});

export const { login, setAccount, setToken, setGithubUser } = authSlice.actions;

export default authSlice.reducer;
