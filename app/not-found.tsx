import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-4">
          404
        </p>
        <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#e6edf3] mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-[#8b949e] text-sm mb-8">The builder does.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#3fb950] text-[#0d1117] font-mono text-sm font-semibold rounded-lg hover:bg-[#3fb950]/90 transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}
