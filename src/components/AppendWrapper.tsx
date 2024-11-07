import { useRef } from "react";
import { createPortal } from "react-dom";

interface AppendWrapperProps {
  id: string;
  parentQuery: string;
  at: "start" | "end";
  children: React.ReactNode;
}

const AppendWrapper = ({
  id,
  parentQuery,
  at,
  children,
}: AppendWrapperProps) => {
  const parentEl = useRef(document.querySelector(parentQuery));
  const containerEl = useRef(
    document.getElementById(id) || document.createElement("div")
  );

  if (!parentEl.current) {
    const newParent = document.querySelector(parentQuery);
    if (!newParent) return;
    parentEl.current = newParent;
  }

  const parent = parentEl.current;
  const container = containerEl.current;

  if (container.id !== id) container.id = id;

  if (container.parentNode !== parent) {
    if (at === "start") parent.prepend(container);
    else parent.append(container);
  }

  return createPortal(children, container);
};

export default AppendWrapper;
