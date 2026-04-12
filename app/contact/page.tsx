import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import CelestialMatrixShader from "@/components/ui/matrix-shader";

export const metadata = {
  title: "Contact — Anshumaan Saraf",
  description: "Get in touch with Anshumaan Saraf.",
};

export default function ContactPage() {
  return (
    <>
      <CelestialMatrixShader />
      <Navbar />
      <main className="pt-14">
        <Contact />
      </main>
    </>
  );
}
