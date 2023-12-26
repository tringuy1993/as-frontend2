import { PageDevJourney } from "./DevJourney";
import { PageIntro } from "./Intro";
import { PageProjectAS } from "./ProjectAS";

export default function AboutPage() {
  return (
    <main className="h-20 items-center mt-20 mx-10 xl:mx-64">
      <header></header>

      <section>
        <PageIntro></PageIntro>
        <PageDevJourney />
        <br></br>
        <br />
        <PageProjectAS />
        <br />
        <br />
      </section>
    </main>
  );
}
