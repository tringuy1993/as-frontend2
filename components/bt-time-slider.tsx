"use client";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";
import { useBTTimePickerStore } from "@/store";

type SliderProps = React.ComponentProps<typeof Slider>;

const calculateLabelTimes = () => {
  const start = new Date();
  start.setHours(9, 35, 0, 0); // Starting at 9:31:00

  const labels = [];
  for (let i = 0; i < 14; i++) {
    const time = new Date(start.getTime() + i * 30 * 60000); // Increment by 30 minutes
    labels.push(
      time.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }

  return labels;
};

const createTimeRange = () => {
  const startTime = new Date();
  startTime.setHours(9, 31, 0, 0);
  const endTime = new Date();
  endTime.setHours(16, 15, 0, 0);

  const timeRange = [];
  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    const militaryTime = currentTime.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    timeRange.push(militaryTime);
    currentTime.setMinutes(currentTime.getMinutes() + 1);
  }

  return timeRange;
};

export function BTTimeSlider({ className, ...props }: SliderProps) {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const timeRange = createTimeRange();
  const labels = calculateLabelTimes();

  const { updateBackTestTime } = useBTTimePickerStore();
  const [currentTimeValue, setCurrentTimeValue] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }

    // Optional: Handle window resize
    const handleResize = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSliderChange = (value) => {
    setCurrentTimeValue(value);
    updateBackTestTime(timeRange[value]);
  };

  return (
    <div className="my-4 relative" ref={sliderRef}>
      <Slider
        defaultValue={[0]}
        min={0}
        max={timeRange.length - 1}
        step={1}
        className={cn("", className)}
        onValueChange={handleSliderChange}
        {...props}
      />
      <div className="flex justify-between mt-2">
        {labels.map((label, index) => (
          <div key={index} className="text-center">
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-xl font-extrabold">
        Current Time: {timeRange[currentTimeValue]}
      </div>
    </div>
  );
}
