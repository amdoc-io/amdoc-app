import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocAccount } from "../../model/AccountModel";
import { GithubAccessToken } from "../../model/AuthModel";

export interface AuthState {
  token?: string;
  account?: DocAccount;
  githubAccessToken?: GithubAccessToken;
  signedInAt?: string;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
  signedInAt: undefined,
  githubAccessToken: undefined,
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
    setGithubAccessToken: (
      state,
      action: PayloadAction<GithubAccessToken | undefined>
    ) => {
      state.githubAccessToken = action.payload;
    },
  },
});

export const { login, setAccount, setToken, setGithubAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
