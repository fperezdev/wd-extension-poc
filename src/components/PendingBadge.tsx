import { useRef } from "react";
import { Badge } from "./ui/badge";
import { createPortal } from "react-dom";

const PendingBadge = () => {
  const readMessageAreaEl = useRef(
    document.querySelector("[data-app-section='MailReadCompose']")
  );

  if (!readMessageAreaEl.current)
    readMessageAreaEl.current = document.querySelector(
      "[data-app-section='MailReadCompose']"
    );

  if (!readMessageAreaEl.current) return null;

  return createPortal(
    <Badge className="absolute top-0 right-0" variant="destructive">
      Pendiente
    </Badge>,
    readMessageAreaEl.current
  );
};

export default PendingBadge;
