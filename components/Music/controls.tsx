import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  ChevronLeftIcon,
  ChevronRight,
  PauseCircle,
  PlayCircle,
  Repeat,
  Shuffle,
} from "lucide-react";
import { getCssVariable } from "@/lib/utils";

type ControlsProps = {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onRepeatClick: () => void;
  onShuffleClick: () => void;
  isPlaying: boolean;
  repeat: boolean;
  shuffle: boolean;
};

const Controls = ({
  onPlayClick,
  isPlaying,
  onPrevClick,
  onNextClick,
  repeat,
  onRepeatClick,
  shuffle,
  onShuffleClick,
}: ControlsProps) => {
  const getStyle = () => ({ stroke: `${getCssVariable("--primary")}` });

  const controlButtons = [
    {
      id: "shuffle",
      icon: Shuffle,
      onClick: onShuffleClick,
      disabled: shuffle,
    },
    { id: "prev", icon: ChevronLeftIcon, onClick: onPrevClick },
    {
      id: "play-pause",
      icon: isPlaying ? PauseCircle : PlayCircle,
      onClick: onPlayClick,
      size: 45,
    },
    { id: "next", icon: ChevronRight, onClick: onNextClick },
    { id: "repeat", icon: Repeat, onClick: onRepeatClick, disabled: repeat },
  ];
  return (
    <div className="z-10 flex flex-row mt-4">
      {controlButtons.map(({ id, icon: Icon, onClick, disabled, size }) => (
        <ControlButton key={id} onClick={onClick} disabled={disabled}>
          <Icon style={getStyle()} size={size} />
        </ControlButton>
      ))}
    </div>
  );
};

export default Controls;

type ControlButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const ControlButton = ({ children, onClick, disabled }: ControlButtonProps) => {
  const variant = disabled ? "ghost" : "default";
  return (
    <Button variant={"ghost"} onClick={onClick}>
      {children}
    </Button>
  );
};
