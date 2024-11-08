// Background service worker
importScripts("socket.io-client.js");

let socket;

let tabId;

socket = io("http://localhost:3001", { transports: ["websocket"] });

socket.on("message", (message) => {
  console.log("wd-ext Message!!", tabId);
  if (!tabId) return;

  chrome.tabs.sendMessage(tabId, { message });

  console.log("wd-ext Received message:", message);
});

// Functions to interact with dom through wd-extension-proxy
chrome.runtime.onMessage.addListener((request, sender) => {
  if (!request.data.origin || request.data.origin !== "wd-extension") return;

  tabId = sender.tab.id;

  console.log("wd-ext Received message from tab:", tabId, request);
});
