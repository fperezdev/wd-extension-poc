// Functions to interact with background chrome extension service
// chrome.runtime.onMessage.addListener((request, sender) => {
//   console.log("Received message from content script:", request, sender);
// });

interface BackgroundMessage {
  action: string;
}

export async function connectToBackground() {
  window.postMessage({ action: "connected", origin: "wd-extension" }, "/");
}

export async function sendMessageToBackground(message: BackgroundMessage) {
  //   const response = await chrome.runtime.sendMessage(message);
  window.postMessage({ ...message, extension: "wd-extension" }, "/");
  // console.log("wd-ext Response from background script:");
}

export async function listenBackgroundMessages() {}
