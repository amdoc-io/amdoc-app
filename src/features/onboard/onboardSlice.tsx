import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubAccessToken } from "../../model/AuthModel";
import { InstallationToken } from "../../utils/GithubFetchUtils";

export interface OnboardState {
  gitProvider?: string;
  githubOAuthAccessToken?: GithubAccessToken;
  githubInstallationToken?: InstallationToken;
}

const initialState: OnboardState = {
  gitProvider: undefined,
  githubOAuthAccessToken: undefined,
  githubInstallationToken: undefined,
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    setGitProvider: (state, action: PayloadAction<string>) => {
      state.gitProvider = action.payload;
    },
    setGithubOAuthAccessToken: (
      state,
      action: PayloadAction<GithubAccessToken | undefined>
    ) => {
      state.githubOAuthAccessToken = action.payload;
    },
    setGithubInstallationToken: (
      state,
      action: PayloadAction<InstallationToken | undefined>
    ) => {
      state.githubInstallationToken = action.payload;
    },
  },
});

export const {
  setGitProvider,
  setGithubOAuthAccessToken,
  setGithubInstallationToken,
} = onboardSlice.actions;

export default onboardSlice.reducer;
