import AppendWrapper from "./components/AppendWrapper";
import MainButton from "./components/MainButton";
import { useStore } from "./stores/store";
import { observeSelectedMessage } from "./utils/observer";

observeSelectedMessage();

function App() {
  const selectedThreadId = useStore((state) => state.selectedThreadId);

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
      {selectedThreadId && (
        <AppendWrapper
          id="action-buttons-container"
          parentQuery={"[aria-label][role='toolbar'].ms-OverflowSet"}
          at="start"
        >
          <p className="bg-red-600 text-white break-words">
            {selectedThreadId}
          </p>
        </AppendWrapper>
      )}
    </div>
  );
}

export default App;
