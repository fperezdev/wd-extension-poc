import { SELECTOR } from "@/lib/consts";
import { useStore } from "@/stores/store";

let selectedMessageId: string | null = null;

/**
 * Observe the selected message in outlook mail list.
 * It observes changes in mail read area and when it changes
 * it updates the selected thread id in the store.
 */
export async function observeSelectedMessage() {
  waitForElement(SELECTOR.OUTLOOK_MAIL_READ, observeMailReadArea);
}

function observeMailReadArea(mailReadCompose: Element) {
  const mailReadComposeObserver = new MutationObserver(() => {
    ackSelectedThreadIdChange();
  });

  mailReadComposeObserver.observe(mailReadCompose, {
    childList: true,
    subtree: true,
  });
}

/**
 * If the selected thread id changes, update the store.
 */
function ackSelectedThreadIdChange() {
  const listElement = document.querySelector(SELECTOR.OUTLOOK_MAIL_LIST);
  if (!listElement) return;
  const newSelectedMessageId = listElement.getAttribute(
    SELECTOR.OUTLOOK_ACTIVE_LIST_ITEM_ID_ATTR
  );
  if (!newSelectedMessageId || newSelectedMessageId === selectedMessageId)
    return;

  selectedMessageId = newSelectedMessageId;

  const selectedMessage = document.getElementById(newSelectedMessageId);

  if (!selectedMessage) return;

  const threadId = selectedMessage.getAttribute(
    SELECTOR.OUTLOOK_ACTIVE_LIST_ITEM_THREAD_ID_ATTR
  );

  useStore.getState().setSelectedThreadId(threadId);
}

/**
 * Wait for an element to be added to the DOM and call the callback with the element.
 */
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
