import MainButton from "./components/MainButton";
import PendingBadge from "./components/PendingBadge";
import { useStore } from "./stores/store";
import ActionButton from "./components/ActionButton";

function App() {
  const selectedThreadId = useStore((state) => state.selectedThreadId);
  const pendingMessages = useStore((state) => state.pendingMessages);

  const currentThreadIsPending =
    selectedThreadId &&
    pendingMessages.some((m) => m.threadId === selectedThreadId);

  return (
    <div
      style={{
        width: 400,
        height: 400,
        position: "absolute",
        top: "20vh",
        right: 0,
        zIndex: 9999,
        border: "1px solid transparent",
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    >
      <MainButton />
      <ActionButton />
      {currentThreadIsPending && <PendingBadge />}
    </div>
  );
}

export default App;
