import React from "react";
import {
  SiPostgresql,
  SiJavascript,
  SiRedis,
  SiDjango,
  SiPython,
  SiClickup,
  SiReact,
  SiTypescript,
  SiFirebase,
  SiGooglecloud,
  SiSlack,
  SiNginx,
  SiGunicorn,
} from "react-icons/si";

function getIconStyle(activeSection: string, activeSections: string[]) {
  return {
    transform: activeSections.includes(activeSection) ? "scale(1.8)" : "none",
    transition: "transform 0.3s ease-in-out",
  };
}

export default function Sidebar({ activeSection }) {
  return (
    <div className="hover:scale-150 translate-x-4 transition-transform fixed left-20 top-1/2 transform -translate-y-1/2 space-y-8 screen-1400px:block hidden">
      <SiPython
        style={getIconStyle(activeSection, ["devjourney", "projectas"])}
      />
      <SiJavascript style={getIconStyle(activeSection, ["projectas"])} />
      <SiTypescript style={getIconStyle(activeSection, ["projectas"])} />

      <SiDjango style={getIconStyle(activeSection, ["projectas"])} />

      <SiReact style={getIconStyle(activeSection, ["projectas"])} />

      <SiRedis style={getIconStyle(activeSection, ["projectas"])} />

      <SiPostgresql style={getIconStyle(activeSection, ["projectas"])} />

      <SiFirebase style={getIconStyle(activeSection, ["projectas"])} />

      <SiGooglecloud style={getIconStyle(activeSection, ["projectas"])} />

      <SiNginx style={getIconStyle(activeSection, ["projectas"])} />

      <SiGunicorn style={getIconStyle(activeSection, ["projectas"])} />

      <SiClickup style={getIconStyle(activeSection, ["projectas"])} />

      <SiSlack style={getIconStyle(activeSection, ["projectas"])} />
    </div>
  );
}
