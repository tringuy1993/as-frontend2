"use client";
import { useEffect, useState } from "react";
import { PageDevJourney } from "./DevJourney";
import { PageIntro } from "./Intro";
import { PageProjectAS } from "./ProjectAS";
import Sidebar from "./Stacks";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const introPosition = document
      .getElementById("intro")
      .getBoundingClientRect().top;
    const journeyPosition = document
      .getElementById("devjourney")
      .getBoundingClientRect().top;
    const projectPosition = document
      .getElementById("projectas")
      .getBoundingClientRect().top;

    if (introPosition < window.innerHeight && introPosition >= 0) {
      setActiveSection("intro");
    } else if (journeyPosition < window.innerHeight && journeyPosition >= 0) {
      setActiveSection("devjourney");
    } else if (projectPosition < window.innerHeight && projectPosition >= 0) {
      setActiveSection("projectas");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} />
      <main
        className="h-20 items-center mt-20 mx-10 xl:mx-64"
        style={{
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <section>
          <div id="intro">
            <PageIntro />
          </div>

          <div id="devjourney">
            <PageDevJourney />
          </div>
          <br></br>
          <br />
          <div id="projectas">
            <PageProjectAS />
          </div>
          <br />
          <br />
        </section>
      </main>
    </div>
  );
}
