window.addEventListener("message", function (event) {
  if (event.origin !== this.window.location.origin) return;

  if (event.data.origin !== "wd-extension") return;

  this.chrome.runtime.sendMessage({ data: event.data });
});

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (!request.data || request.origin !== "wd-extension-background") return;
  window.postMessage(request, "/");
});
