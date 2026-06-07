import Link from "next/link";

const STATS = [
  {
    value: "10",
    label: "Members",
    sub: "give or take, depending on the round",
  },
  {
    value: "∞",
    label: "Pints Consumed",
    sub: "we stopped counting after year one",
  },
  {
    value: "0",
    label: "Regrets",
    sub: "that we'll admit to publicly",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-28 px-6 flex flex-col items-center text-center bg-gradient-to-b from-amber-950/20 to-stone-950">
        <div className="text-8xl mb-8">🍺</div>
        <h1 className="text-8xl md:text-9xl font-black tracking-[0.3em] text-amber-400 mb-4 drop-shadow-lg">
          P.I.N.T
        </h1>
        <p className="text-2xl text-amber-200 font-light tracking-widest mb-3 uppercase">
          Pub Inebriation Night Tour
        </p>
        <p className="text-amber-600 text-lg mb-12 max-w-lg leading-relaxed">
          A drinking group of questionable taste, impeccable camaraderie, and
          very strong opinions about round-buying etiquette.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/people"
            className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold px-8 py-3 rounded-full transition-colors text-lg shadow-lg shadow-amber-900/30"
          >
            Meet the Crew
          </Link>
          <Link
            href="/about"
            className="border-2 border-amber-600 hover:border-amber-400 text-amber-400 hover:text-amber-300 font-bold px-8 py-3 rounded-full transition-colors text-lg"
          >
            Our Story
          </Link>
        </div>
      </section>

      <section className="w-full py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-stone-900 rounded-2xl p-8 border border-amber-900/30 hover:border-amber-700/50 transition-colors"
            >
              <div className="text-6xl font-black text-amber-400 mb-2 tabular-nums">
                {s.value}
              </div>
              <div className="text-amber-200 font-semibold mb-1">{s.label}</div>
              <div className="text-amber-700 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full pb-16 px-6">
        <div className="max-w-4xl mx-auto bg-stone-900 rounded-3xl border border-amber-900/30 p-10 text-center">
          <div className="text-4xl mb-4">📍</div>
          <h2 className="text-2xl font-bold text-amber-300 mb-3">Where to Find Us</h2>
          <p className="text-amber-500 leading-relaxed max-w-md mx-auto">
            Wherever has a good tap selection and doesn&apos;t kick us out before
            we&apos;re ready. We&apos;ll know it when we see it.
          </p>
        </div>
      </section>
    </div>
  );
}
