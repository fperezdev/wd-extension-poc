window.addEventListener("message", function (event) {
  if (event.origin !== this.window.location.origin) return;

  if (event.data.origin !== "wd-extension") return;

  this.chrome.runtime.sendMessage({ data: event.data });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log("wd-ext Received message from background:", request, sender);
});
