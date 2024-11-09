window.onload = () => {
  const extensionContainer = document.createElement("div");
  extensionContainer.id = "wd-extension-container";
  document.body.appendChild(extensionContainer);

  const script = document.createElement("script");
  script.type = "module";
  script.src = chrome.runtime.getURL("scripts/index.js");
  document.body.appendChild(script);
};
