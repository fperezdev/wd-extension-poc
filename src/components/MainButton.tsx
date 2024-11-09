import { useStore } from "@/stores/store";
import { Button } from "./ui/button";

const MainButton = () => {
  const toggleMenu = useStore((state) => state.toggleMenu);

  return (
    <Button
      className="w-[50px] h-[50px] absolute top-[calc(50%-25px)] right-16 pointer-events-auto text-3xl bg-pink-600 text-white rounded-full"
      onClick={toggleMenu}
    >
      W
    </Button>
  );
};

export default MainButton;
