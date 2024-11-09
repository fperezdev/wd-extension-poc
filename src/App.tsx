import MainButton from "./components/MainButton";
import PendingBadge from "./components/PendingBadge";
import { useStore } from "./stores/store";
import ActionButton from "./components/ActionButton";

function App() {
  const selectedThreadId = useStore((state) => state.selectedThreadId);
  const pendingMessages = useStore((state) => state.pendingMessages);

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
      <ActionButton />
      {selectedThreadId &&
        pendingMessages.some((m) => m.threadId === selectedThreadId) && (
          <PendingBadge />
        )}
    </div>
  );
}

export default App;
