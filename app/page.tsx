import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-24">
      <section className="py-24 flex flex-col items-center text-center gap-8">
        <h1>Still Working :)</h1>
      </section>

      <div className="flex gap-6 py-6 items-center justify-center">
        <Button>Learn</Button>
      </div>
    </main>
  );
}
