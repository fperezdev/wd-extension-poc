import MainButton from "./components/MainButton";

function App() {
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
    </div>
  );
}

export default App;
