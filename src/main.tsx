import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { observeSelectedMessage } from "./utils/observer.ts";
import { connectToBackground } from "./utils/background.ts";

observeSelectedMessage();

connectToBackground();

createRoot(document.getElementById("wd-extension-container")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
