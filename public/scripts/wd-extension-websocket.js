// Background script for communication with backend
// cause the extension can't communicate with the background directly
// for outlook content security policy reasons
const BACKEND_URL = "http://localhost:3001";
const WD_EXTENSION_DOM_ORIGIN = "WD_EXTENSION_DOM_ORIGIN";
const WD_EXTENSION_BACKGROUND_ORIGIN = "WD_EXTENSION_BACKGROUND_ORIGIN";

importScripts("socket.io-client.js");

let tabId;

const socket = io(BACKEND_URL, { transports: ["websocket"] });

// Receive pending messages
socket.on("messages", (body) => {
  if (!tabId) return;

  // Send to DOM through wd-extension-proxy
  chrome.tabs.sendMessage(tabId, {
    ...body,
    origin: WD_EXTENSION_BACKGROUND_ORIGIN,
  });
});

// Receive from DOM through wd-extension-proxy
chrome.runtime.onMessage.addListener((request, sender) => {
  if (!request.data || request.data.origin !== WD_EXTENSION_DOM_ORIGIN) return;

  tabId = sender.tab.id;

  socket.emit("action", request.data);
});
