import { MotionSection } from "@/components/ui/MotionSection";
import { CredentialCards } from "@/components/CredentialCards";

export function Education() {
  return (
    <MotionSection
      id="education"
      className="max-w-5xl mx-auto px-6 py-16"
      aria-label="Education"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-10">
        Education
      </h2>
      <CredentialCards />
    </MotionSection>
  );
}
