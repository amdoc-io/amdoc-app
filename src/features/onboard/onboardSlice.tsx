import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubAccessToken } from "../../model/AuthModel";
import { InstallationToken } from "../../utils/GithubFetchUtils";

export interface OnboardState {
  gitProvider?: string;
  githubOAuthAccessToken?: GithubAccessToken;
  githubInstallationToken?: InstallationToken;
  githubInstallationId?: string;
  docInitialRepo?: string;
  currentStep?: number;
}

const initialState: OnboardState = {
  gitProvider: undefined,
  githubOAuthAccessToken: undefined,
  githubInstallationToken: undefined,
  githubInstallationId: undefined,
  docInitialRepo: undefined,
  currentStep: -1,
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
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
    setGithubInstallationId: (state, action: PayloadAction<string>) => {
      state.githubInstallationId = action.payload;
    },
    setDocInitialRepo: (state, action: PayloadAction<string>) => {
      state.docInitialRepo = action.payload;
    },
  },
});

export const {
  setGitProvider,
  setCurrentStep,
  setGithubOAuthAccessToken,
  setGithubInstallationToken,
  setGithubInstallationId,
  setDocInitialRepo,
} = onboardSlice.actions;

export default onboardSlice.reducer;
