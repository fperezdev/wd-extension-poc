// Functions to interact with background chrome extension service
import { useStore } from "@/stores/store";

interface BackgroundMessage {
  [key: string]: string;
}

export async function connectToBackground() {
  window.postMessage({ action: "connect", origin: "wd-extension" }, "/");

  window.addEventListener("message", (event) => {
    const { data, origin } = event.data;
    if (!data || origin !== "wd-extension-background") return;
    if (data.messages) useStore.getState().setPendingMessages(data.messages);
  });
}

export function sendMessageToBackground(message: BackgroundMessage) {
  window.postMessage({ ...message, origin: "wd-extension" }, "/");
}
