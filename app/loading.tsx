"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function MainLoading() {
  const { theme, resolvedTheme } = useTheme();
  const [loadingColor, setLoadingColor] = useState(""); // Start with an empty string

  useEffect(() => {
    // Once the component has mounted, we can use the resolvedTheme
    const color = resolvedTheme === "light" ? "black" : "white";
    setLoadingColor(color);
  }, [resolvedTheme]);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Render the loader with the updated color once the client has mounted */}
      <PacmanLoader color={loadingColor || "#ffffff"} />
    </div>
  );
}
