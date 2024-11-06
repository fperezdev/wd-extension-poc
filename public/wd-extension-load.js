window.onload = () => {
  const extensionContainer = document.createElement("div");
  extensionContainer.id = "wd-extension-container";

  const parent = document.getElementsByTagName("body")[0];
  parent.appendChild(extensionContainer);

  const script = document.createElement("script");
  script.type = "module";
  script.src = chrome.runtime.getURL("assets/index.js");
  document.body.appendChild(script);
};
