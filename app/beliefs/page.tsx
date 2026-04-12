import { Navbar } from "@/components/Navbar";
import { Beliefs } from "@/components/Beliefs";

export const metadata = {
  title: "Beliefs — Anshumaan Saraf",
  description:
    "How I think about AI, shipping, learning, and building things that matter.",
};

export default function BeliefsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Beliefs />
      </main>
    </>
  );
}
