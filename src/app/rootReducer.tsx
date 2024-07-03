import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import persistedReducer from "./reduxPersistConfig";
import { ReduxActionType } from "../model/ReduxModel";
import onboardSlice from "../features/onboard/onboardSlice";

const appReducer = combineReducers({
  auth: authSlice,
  onboard: onboardSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === ReduxActionType.logout) {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistedReducer(rootReducer);
