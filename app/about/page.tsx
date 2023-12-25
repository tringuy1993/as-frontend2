import { PageDevJourney } from "./DevJourney";
import { PageIntro } from "./Intro";

export default function AboutPage() {
  return (
    <main className="h-20 items-center mt-20 mr-10 ml-10 xl:mr-64 xl:ml-64">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          FullStack Developer
        </h1>
      </header>

      <section>
        <PageIntro></PageIntro>
        <PageDevJourney />
      </section>
    </main>
  );
}
