import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocAccount, Organization } from "../../model/AccountModel";

export interface AuthState {
  token?: string;
  setupCompleted?: boolean;
  prepareCompleted?: boolean;
  account?: DocAccount;
  signedInAt?: string;
  organizations?: Organization[];
  organization?: Organization;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
  signedInAt: undefined,
  setupCompleted: undefined,
  prepareCompleted: undefined,
  organizations: [],
  organization: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
      state.setupCompleted = action.payload.account?.isSetupComplete;
      state.signedInAt = action.payload.signedInAt;
    },
    setAccount: (state, action: PayloadAction<DocAccount>) => {
      state.account = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setSetupCompleted: (state, action: PayloadAction<boolean | undefined>) => {
      state.setupCompleted = action.payload;
    },
    setOrganizations: (
      state,
      action: PayloadAction<Organization[] | undefined>
    ) => {
      state.organizations = action.payload || [];
    },
    setOrganization: (
      state,
      action: PayloadAction<Organization | undefined>
    ) => {
      state.organization = action.payload;
    },
    setPrepareCompleted: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.prepareCompleted = action.payload;
    },
  },
});

export const {
  login,
  setAccount,
  setToken,
  setSetupCompleted,
  setOrganizations,
  setOrganization,
  setPrepareCompleted,
} = authSlice.actions;

export default authSlice.reducer;
