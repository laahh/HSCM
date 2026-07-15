import Hero from "@/components/hero/Hero";
import PresentationFlow from "@/components/next/PresentationFlow";

export default function Home() {
  return (
    <main>
      <PresentationFlow>
        <Hero />
      </PresentationFlow>
    </main>
  );
}
