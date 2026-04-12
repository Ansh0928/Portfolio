import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { CaseStudy } from "@/components/CaseStudy";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { TechStack } from "@/components/TechStack";
import { UnderstandingAI } from "@/components/UnderstandingAI";
import { Beliefs } from "@/components/Beliefs";
import { Contact } from "@/components/Contact";
import { caseStudies } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <section id="work" className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          {caseStudies.map((cs) => (
            <CaseStudy key={cs.id} caseStudy={cs} />
          ))}
          <Projects />
        </section>
        <About />
        <Experience />
        <Achievements />
        <TechStack />
        <UnderstandingAI />
        <Beliefs />
        <Contact />
      </main>
    </>
  );
}
