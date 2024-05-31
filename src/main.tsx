import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { UserProvider } from "./UserContext.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      {({ signOut, user }) => (
        <UserProvider user={user} signOut={signOut}>
          <App />
        </UserProvider>
      )}
    </Authenticator>
  </React.StrictMode>
);
