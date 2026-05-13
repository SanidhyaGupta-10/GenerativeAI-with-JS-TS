export default function Home() {
  return (
    <>
      {/* Animated background (CSS in globals.css) */}
      <div className="page-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 pt-20 pb-24">
        {/* ── Hero ── */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/25 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            RAG · Vector Search · AI Chat
          </div>

          <h1 className="text-5xl md:text-[4.5rem] font-black leading-[1.06] tracking-tight text-white mb-5">
            Upload a PDF.<br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)' }}
            >
              Talk to it instantly.
            </span>
          </h1>

          <p className="text-lg text-[rgba(200,190,230,0.65)] leading-relaxed max-w-xl mx-auto">
            VectorTalk uses retrieval-augmented generation to surface precise,
            cited answers straight from your documents — no hallucinations.
          </p>
        </section>

        {/* ── Interactive Demo ── */}
        <section className="w-full max-w-5xl mx-auto">

        </section>
      </div>
    </>
  );
}
