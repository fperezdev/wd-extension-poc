// Functions to interact with background chrome extension service
import { ORIGIN } from "@/lib/consts";
import { useStore } from "@/stores/store";

/**
 * Connects to background and then set observer to receive background messages.
 * When connects inmmediately receives messages from backend through background.
 */
export async function connectToBackground() {
  window.postMessage(
    { action: "connect", origin: ORIGIN.WD_EXTENSION_DOM_ORIGIN },
    "/"
  );

  window.addEventListener("message", (event) => {
    const { data, origin } = event.data;
    if (!data || origin !== ORIGIN.WD_EXTENSION_BACKGROUND_ORIGIN) return;
    if (data.messages) useStore.getState().setPendingMessages(data.messages);
  });
}

/**
 * Send action for message to backend through background.
 */
export function sendAction(action: string, threadId: string) {
  window.postMessage(
    { action, threadId, origin: ORIGIN.WD_EXTENSION_DOM_ORIGIN },
    "/"
  );
}
