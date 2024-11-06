const sizePx = 40;

const MainButton = () => {
  const handleClick = async () => {
    alert("Hello from the content script!");
  };
  return (
    <button
      onClick={handleClick}
      style={{
        width: sizePx,
        height: sizePx,
        position: "absolute",
        top: `calc(50% - ${sizePx / 2}px)`,
        right: 30,
        borderRadius: "100%",
        border: "1px solid gray",
        backgroundColor: "green",
        color: "white",
        cursor: "pointer",
        pointerEvents: "all",
      }}
    >
      W
    </button>
  );
};

export default MainButton;
