import './index.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
// 1. Google Provider import केला
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    {/* 2. इथे तुझी Google Client ID टाकली आहे */}
    <GoogleOAuthProvider clientId="188075876848-t2fs41396i1ohv45clvjcis1d92a0m7c.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);