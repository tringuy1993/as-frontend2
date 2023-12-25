"use client";
import { IntroImages } from "./Intro-Images";

export function PageIntro() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 flex items-center md:mb-0">
        <div className="mx-4 space-y-5">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Hi, I'm Tri Nguyen
          </h2>
          <p className="text-justify">
            I am a passionate, self-taught, full-stack developer who goes the
            extra mile, dedicating 40 hours of coding after my 9-5 job. With my
            unwavering commitment to continuous learning and delivering
            high-quality solutions, I thrive in fast-paced environments and
            excel at turning complex ideas into functional and intuitive
            applications.
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <IntroImages />
      </div>
    </div>
  );
}
