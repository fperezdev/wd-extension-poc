// Background service worker
importScripts("socket.io-client.js");

let tabId;

const socket = io("http://localhost:3001", { transports: ["websocket"] });

socket.on("messages", (body) => {
  if (!tabId) return;

  // Send to dom through wd-extension-proxy
  chrome.tabs.sendMessage(tabId, {
    ...body,
    origin: "wd-extension-background",
  });
});

// Receive from dom through wd-extension-proxy
chrome.runtime.onMessage.addListener((request, sender) => {
  if (!request.data.origin || request.data.origin !== "wd-extension") return;

  tabId = sender.tab.id;

  socket.emit("action", request.data);
});
