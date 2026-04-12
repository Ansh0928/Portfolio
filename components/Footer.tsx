export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-[#484f58]">
          © {new Date().getFullYear()} Anshumaan Saraf. Built with Next.js.
        </p>
        <p className="text-xs font-mono text-[#484f58]">
          Gold Coast, Australia 🇦🇺
        </p>
      </div>
    </footer>
  );
}
