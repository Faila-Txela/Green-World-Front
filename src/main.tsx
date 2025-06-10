import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./routes/auth_context";
import { ProfileProvider } from './routes/profileContext'
import App from "./App";

createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <ProfileProvider>
        <App />
     </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
