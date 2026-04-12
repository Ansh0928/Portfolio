import { Navbar } from "@/components/Navbar";
import { UnderstandingAI } from "@/components/UnderstandingAI";

export const metadata = {
  title: "AI — Anshumaan Saraf",
  description:
    "How I think about AI, its capabilities, and where it's heading.",
};

export default function AIPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <UnderstandingAI />
      </main>
    </>
  );
}
