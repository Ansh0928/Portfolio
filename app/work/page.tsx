import { Navbar } from "@/components/Navbar";
import { CaseStudy } from "@/components/CaseStudy";
import { Projects } from "@/components/Projects";
import { caseStudies } from "@/lib/data";

export const metadata = {
  title: "Work — Anshumaan Saraf",
  description: "Case studies and projects built by Anshumaan Saraf.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          {caseStudies.map((cs) => (
            <CaseStudy key={cs.id} caseStudy={cs} />
          ))}
          <Projects />
        </section>
      </main>
    </>
  );
}
