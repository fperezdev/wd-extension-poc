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

function observeMessageList() {
  let messageSubListObserver = observeMessageSubList();

  const messageListElement = document.querySelector(
    "[data-app-section=MessageList]"
  );

  if (!messageListElement) return setTimeout(observeMessageList, 1000);

  const messageListObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        messageSubListObserver.disconnect();
        messageSubListObserver = observeMessageSubList();
      }
    });
  });

  messageListObserver.observe(messageListElement, {
    childList: true,
  });
}

function observeMessageSubList() {
  const messageSubListElement = document.querySelector(
    "[aria-activedescendant][role=listbox]"
  );

  if (!messageSubListElement) return setTimeout(observeMessageSubList, 1000);

  console.log("sub observando", messageSubListElement);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-activedescendant"
      ) {
        console.log("sub aria-activedescendant changed");

        // Example of accessing the element for which
        // event was triggered
        // console.log(mutation.target);
        // mutation.target.textContent = "Attribute of the element changed";
      }

      console.log("sub", mutation.target);
    });
  });

  observer.observe(messageSubListElement, {
    attributes: true, //configure it to listen to attribute changes
  });

  return observer;
}
