import { IntroImages } from "./Intro-Images";

export function PageIntro() {
  return (
    <div className="flex flex-col screen-1200px:flex-row mb-10">
      <div className="flex-1 flex items-center md:mb-0">
        <div className="mx-4 space-y-5">
          <h1 className="text-75px font-extrabold tracking-tight mb-10">
            FullStack Developer
          </h1>
          <h2 className="text-35px scroll-m-20 border-b pb-2 font-semibold tracking-tight first:mt-0">
            Hi, I'm Tri Nguyen
          </h2>
          <p className="text-25px text-justify">
            I am a passionate, self-taught, full-stack developer who goes the
            extra mile, dedicating 40 hours of coding after my 9-5 job. With my
            unwavering commitment to continuous learning and delivering
            high-quality solutions, I thrive in fast-paced environments and
            excel at turning complex ideas into functional and intuitive
            applications.
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <IntroImages />
      </div>
    </div>
  );
}
