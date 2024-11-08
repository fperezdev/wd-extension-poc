import { useStore } from "@/stores/store";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { sendAction } from "@/websocket/socket";

const ActionButton = () => {
  const selectedThreadId = useStore((state) => state.selectedThreadId);

  const handleAction = (action: string) => {
    if (!selectedThreadId) return;
    console.log("wd-ext", { action, threadId: selectedThreadId });
    // sendAction({ action, threadId: selectedThreadId });
  };

  return (
    <div className="absolute top-[calc(50%-20px+60px)] right-16">
      <Popover>
        <PopoverTrigger>
          <Button
            className="w-[40px] h-[40px] pointer-events-auto text-xl bg-pink-500 text-white rounded-full"
            disabled={selectedThreadId === null}
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
