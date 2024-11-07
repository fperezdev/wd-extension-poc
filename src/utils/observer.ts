export async function observeSelectedMessage() {
  waitForElement('[data-app-section="MessageList"]', observeMessageList);
}

function observeMessageList(messageListElement: Element) {
  let selectedMessageObserver: MutationObserver | null = null;

  const selectedMessageElement = document.querySelector(
    "[aria-activedescendant][role=listbox]"
  );
  if (selectedMessageElement) {
    selectedMessageObserver = observeMessageSpecificList(
      selectedMessageElement,
      selectedMessageObserver
    );
  }

  const messageListObserver = new MutationObserver(() => {
    waitForElement(
      "[aria-activedescendant][role=listbox]",
      (selectedMessageElement) => {
        selectedMessageObserver = observeMessageSpecificList(
          selectedMessageElement,
          selectedMessageObserver
        );
      }
    );
  });

  messageListObserver.observe(messageListElement, {
    childList: true,
  });
}

function observeMessageSpecificList(
  selectedMessageElement: Element,
  selectedMessageObserver: MutationObserver | null
) {
  if (selectedMessageObserver) selectedMessageObserver.disconnect();
  selectedMessageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-activedescendant"
      ) {
        const selectedMessageId = selectedMessageElement.getAttribute(
          "aria-activedescendant"
        );

        if (!selectedMessageId) return;

        const listMessageElement = document.getElementById(selectedMessageId);
        if (!listMessageElement) return;

        console.log(
          "wd-ext selected message",
          listMessageElement.getAttribute("data-convid"),
          listMessageElement
        );
      }
    });
  });

  selectedMessageObserver.observe(selectedMessageElement, {
    attributes: true,
    attributeFilter: ["aria-activedescendant"],
  });

  return selectedMessageObserver;
}

function waitForElement(
  selector: string,
  callback: (element: Element) => void
) {
  const observer = new MutationObserver((_, observer) => {
    const element = document.querySelector(selector);
    if (element) {
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
