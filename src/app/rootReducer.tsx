import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import persistedReducer from "./reduxPersistConfig";
import { ReduxActionType } from "../model/ReduxModel";

const appReducer = combineReducers({
  auth: authSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === ReduxActionType.logout) {
    storage.removeItem("persist:root");

    const resetState = appReducer(undefined, action);
    return {
      ...resetState,
      auth: {
        ...resetState.auth,
      },
    };
  }
  return appReducer(state, action);
};

export default persistedReducer(rootReducer);
