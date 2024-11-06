// const sizePx = 40;

import { Button } from "./ui/button";

const MainButton = () => {
  const handleClick = async () => {
    alert("Hello from the content script!");
  };
  return (
    <Button
      className="w-[50px] h-[50px] absolute top-[calc(50%-25px)] right-10 pointer-events-auto text-3xl bg-pink-600 text-white rounded-full"
      onClick={handleClick}
    >
      W
    </Button>
  );
};

export default MainButton;
