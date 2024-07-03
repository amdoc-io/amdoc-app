import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocAccount } from "../../model/AccountModel";
import { InstallationToken } from "../../utils/GithubFetchUtils";

export interface AuthState {
  token?: string;
  account?: DocAccount;
  githubInstallationToken?: InstallationToken;
  signedInAt?: string;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
  signedInAt: undefined,
  githubInstallationToken: undefined,
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
    setGithubInstallationToken: (
      state,
      action: PayloadAction<InstallationToken | undefined>
    ) => {
      state.githubInstallationToken = action.payload;
    },
  },
});

export const { login, setAccount, setToken, setGithubInstallationToken } =
  authSlice.actions;

export default authSlice.reducer;
