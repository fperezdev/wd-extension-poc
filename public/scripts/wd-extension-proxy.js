// Contents script that communicates DOM and Background
const WD_EXTENSION_DOM_ORIGIN = "WD_EXTENSION_DOM_ORIGIN";
const WD_EXTENSION_BACKGROUND_ORIGIN = "WD_EXTENSION_BACKGROUND_ORIGIN";

// Listen for messages from DOM
window.addEventListener("message", function (event) {
  if (event.origin !== this.window.location.origin) return;

  if (event.data.origin !== WD_EXTENSION_DOM_ORIGIN) return;

  // Send messages to background
  this.chrome.runtime.sendMessage({ data: event.data });
});

// Listen for messages from background
chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (!request.data || request.origin !== WD_EXTENSION_BACKGROUND_ORIGIN)
    return;
  // Send messages to DOM
  window.postMessage(request, "/");
});
