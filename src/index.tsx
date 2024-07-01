import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
      >
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
