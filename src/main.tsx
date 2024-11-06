import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("wd-extension-container")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
