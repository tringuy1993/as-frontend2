import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";

type ProgressBarProps = {
  progress: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
};

const ProgressBar = ({
  progress,
  onChange,
  leftLabel,
  rightLabel,
}: ProgressBarProps) => {
  return (
    <div className="flex flex-col">
      {/* <input
        type="range"
        min="1"
        max="100"
        value={progress}
        step="0.25"
        className="slider bg-primary"
        onChange={(event) => {
          onChange(parseInt(event?.target.value));
        }}
      /> */}
      <Slider
        className="w-52"
        value={[progress]}
        max={100}
        step={0.1}
        onValueChange={(event) => {
          onChange(event[0]);
        }}
      />

      <div className="flex w-full flex-row justify-between mt-1 text-primary">
        <span className="text-xs">{leftLabel}</span>
        <span className="text-xs">{rightLabel}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
