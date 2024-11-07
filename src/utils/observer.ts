import { useStore } from "@/stores/store";

let selectedMessageId: string | null = null;

export async function observeSelectedMessage() {
  waitForElement(
    "[data-app-section='MailReadCompose']",
    observeMailReadCompose
  );
}
// "data-app-section='MailReadCompose'"
// "[data-app-section='MessageList'"
// "[aria-activedescendant][role=listbox]"
function observeMailReadCompose(mailReadCompose: Element) {
  const mailReadComposeObserver = new MutationObserver(() => {
    ackSelectedThreadIdChange();
  });

  mailReadComposeObserver.observe(mailReadCompose, {
    childList: true,
    subtree: true,
  });
}

function ackSelectedThreadIdChange() {
  const subListElement = document.querySelector(
    "[aria-activedescendant][role=listbox]"
  );
  if (!subListElement) return;
  const newSelectedMessageId = subListElement.getAttribute(
    "aria-activedescendant"
  );
  if (!newSelectedMessageId || newSelectedMessageId === selectedMessageId)
    return;

  selectedMessageId = newSelectedMessageId;

  const selectedMessage = document.getElementById(newSelectedMessageId);

  if (!selectedMessage) return;

  const threadId = selectedMessage.getAttribute("data-convid");

  useStore.getState().setSelectedThreadId(threadId);

  console.log("wd-ext", threadId);
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
