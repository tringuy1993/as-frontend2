import { PageIntro } from "./Intro";

export default function AboutPage() {
  return (
    <main>
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          FullStack Developer
        </h1>
      </header>

      <section>
        <PageIntro></PageIntro>
      </section>
    </main>
  );
}
