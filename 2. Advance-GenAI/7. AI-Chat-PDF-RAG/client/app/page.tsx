import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      {/* Animated background (CSS in globals.css) */}
      <div className="page-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 mt-24">
        <Hero />
      </div>
    </>
  );
}
