import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterDOM from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Google Client ID - Thay thế bằng Client ID mới từ Google Cloud Console
// Đảm bảo đã cấu hình http://localhost:3000 trong Authorized JavaScript origins
const GOOGLE_CLIENT_ID = "327990336235-b3403ve7a01hv89ibkil36cglplipg3g.apps.googleusercontent.com";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterDOM />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
