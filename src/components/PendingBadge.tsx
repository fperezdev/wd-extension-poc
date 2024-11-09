import { useRef } from "react";
import { Badge } from "./ui/badge";
import { createPortal } from "react-dom";
import { SELECTOR } from "@/lib/consts";

const PendingBadge = () => {
  const readMessageAreaEl = useRef(
    document.querySelector(SELECTOR.OUTLOOK_MAIL_READ)
  );

  if (!readMessageAreaEl.current)
    readMessageAreaEl.current = document.querySelector(
      SELECTOR.OUTLOOK_MAIL_READ
    );

  if (!readMessageAreaEl.current) return null;

  return createPortal(
    <Badge className="absolute top-2 right-4" variant="destructive">
      Pendiente
    </Badge>,
    readMessageAreaEl.current
  );
};

export default PendingBadge;
