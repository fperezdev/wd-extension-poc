import { useStore } from "@/stores/store";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { sendAction } from "@/utils/background-connection";
import { useState } from "react";

const ActionButton = () => {
  const pendingMessages = useStore((state) => state.pendingMessages);
  const setPendingMessages = useStore((state) => state.setPendingMessages);
  const selectedThreadId = useStore((state) => state.selectedThreadId);

  const [openPopover, setOpenPopover] = useState(false);

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
    <div className="absolute top-[calc(50%-20px+60px)] right-16">
      <Popover open={openPopover}>
        <PopoverTrigger>
          <Button
            className="w-[40px] h-[40px] pointer-events-auto text-xl bg-pink-500 text-white rounded-full"
            onClick={() => setOpenPopover(true)}
            disabled={
              selectedThreadId === null ||
              !pendingMessages.some((m) => m.threadId === selectedThreadId)
            }
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
