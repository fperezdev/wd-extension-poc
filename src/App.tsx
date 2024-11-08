import { useMemo } from "react";
import MainButton from "./components/MainButton";
import PendingBadge from "./components/PendingBadge";
import { useStore } from "./stores/store";
import { observeSelectedMessage } from "./utils/observer";
import { overview } from "./queries/overview";

observeSelectedMessage();

function App() {
  const selectedThreadId = useStore((state) => state.selectedThreadId);
  const pendingMessages = useStore((state) => state.pendingMessages);

  const setPendingMessages = useStore((state) => state.setPendingMessages);

  useMemo(async () => {
    const newPendingMessages = await overview();
    setPendingMessages(newPendingMessages);
  }, [setPendingMessages]);

  return (
    <div
      style={{
        width: 400,
        height: 400,
        position: "absolute",
        top: "25vh",
        right: 0,
        zIndex: 9999,
        border: "1px solid blue",
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    >
      <MainButton />
      {selectedThreadId && pendingMessages.includes(selectedThreadId) && (
        <PendingBadge />
      )}
    </div>
  );
}

export default App;
