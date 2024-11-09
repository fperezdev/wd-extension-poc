import { useStore } from "@/stores/store";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { sendAction } from "@/utils/background-connection";
import { useState } from "react";

const ActionButton = () => {
  const pendingMessages = useStore((state) => state.pendingMessages);
  const setPendingMessages = useStore((state) => state.setPendingMessages);
  const selectedThreadId = useStore((state) => state.selectedThreadId);
  const openMenu = useStore((state) => state.openMenu);

  const [openPopover, setOpenPopover] = useState(false);

  const actionEnabled =
    selectedThreadId !== null &&
    pendingMessages.some((m) => m.threadId === selectedThreadId) &&
    openMenu;

  const handleAction = (action: string) => {
    if (!selectedThreadId) return;
    sendAction(action, selectedThreadId);
    // Remove from pending messages
    const newPendingMessages = [...pendingMessages].filter(
      (m) => m.threadId !== selectedThreadId
    );
    setPendingMessages(newPendingMessages);
    setOpenPopover(false);
  };

  return (
    <div
      className={`${openMenu ? "opacity-100" : "opacity-0"} absolute ${openMenu ? "top-[calc(50%-20px+60px)]" : "top-[calc(50%-25px)]"} right-16 transition-[opacity,top]`}
    >
      <Popover open={openPopover} onOpenChange={(open) => setOpenPopover(open)}>
        <PopoverTrigger>
          <Button
            className="w-[40px] h-[40px] pointer-events-auto text-xl bg-pink-600 text-white rounded-full"
            onClick={() => setOpenPopover(!openPopover)}
            disabled={!actionEnabled}
          >
            A
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="left"
          className="w-fit flex flex-col gap-2 bg-transparent shadow-none"
        >
          <Button onClick={() => handleAction("close")}>Cerrar</Button>
          <Button onClick={() => handleAction("derive")}>Derivar</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionButton;
