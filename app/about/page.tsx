import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { TechStack } from "@/components/TechStack";

export const metadata = {
  title: "About — Anshumaan Saraf",
  description: "Background, experience, achievements, and tech stack.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <About />
        <Experience />
        <Achievements />
        <TechStack />
      </main>
    </>
  );
}
