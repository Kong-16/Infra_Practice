import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { COGNITO_CONFIG } from "./constants";

const cognitoAuthConfig = {
  authority: COGNITO_CONFIG.AUTHORITY,
  client_id: COGNITO_CONFIG.CLIENT_ID,
  redirect_uri: COGNITO_CONFIG.REDIRECT_URI,
  response_type: COGNITO_CONFIG.RESPONSE_TYPE,
  scope: COGNITO_CONFIG.SCOPE,
  post_logout_redirect_uri :COGNITO_CONFIG.REDIRECT_URI,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  // </React.StrictMode>
);
