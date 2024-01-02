"use client";
import { grid } from "ldrs";
import { useTheme } from "next-themes";

grid.register();

export default function MainLoading() {
  const theme = useTheme();
  const loadingColor = theme.theme === "light" ? "black" : "white";
  return (
    <div className="flex justify-center items-center h-screen">
      <l-grid size="60" speed="1.5" color={loadingColor}></l-grid>
    </div>
  );
}
