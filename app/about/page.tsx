import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · P.I.N.T",
  description: "The story, mission, and unofficial rules of P.I.N.T — Pub Inebriation Night Tour",
};

const RULES = [
  {
    emoji: "🔄",
    rule: "No empty glasses at the table",
    detail: "Non-negotiable. If you see one, you know what to do.",
  },
  {
    emoji: "📵",
    rule: "Phones down for the first round",
    detail: "Be present. The group chat can wait. (Unless it's the group chat).",
  },
  {
    emoji: "🚫",
    rule: "No discussing work after 9pm",
    detail: "We have enough going on. Leave it at the door.",
  },
  {
    emoji: "🏆",
    rule: "Last one standing buys the post-pub kebab",
    detail: "The rules are the rules.",
  },
  {
    emoji: "🎵",
    rule: "The jukebox is a democracy",
    detail: "Put a pound in, but prepare to be outvoted on the song.",
  },
  {
    emoji: "🧾",
    rule: "Split the bill. Always.",
    detail: "Arguing over who had the extra pint is beneath us. Mostly.",
  },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-6xl mb-6">🍻</div>
        <h1 className="text-5xl font-black text-amber-400 mb-6 tracking-wide">
          About P.I.N.T
        </h1>
        <p className="text-2xl text-amber-200">
          <span className="text-amber-400 font-bold">P</span>ub{" "}
          <span className="text-amber-400 font-bold">I</span>nebriation{" "}
          <span className="text-amber-400 font-bold">N</span>ight{" "}
          <span className="text-amber-400 font-bold">T</span>our
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-stone-900 rounded-2xl p-8 border border-amber-900/30">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">
            The Origin Story
          </h2>
          <p className="text-amber-200 leading-relaxed">
            Nobody really remembers who started it. Somewhere between &quot;should
            we grab a quick one after work?&quot; and &quot;it&apos;s 2am and we&apos;ve
            somehow ended up in a karaoke bar&quot;, P.I.N.T was born. What began
            as a loose collection of people who enjoyed a drink together slowly
            coalesced into something with slightly more structure: a name, a
            WhatsApp group, and an unspoken agreement that if someone mentions
            the pub, everyone shows up.
          </p>
        </div>

        <div className="bg-stone-900 rounded-2xl p-8 border border-amber-900/30">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">
            The Mission
          </h2>
          <p className="text-amber-200 leading-relaxed">
            P.I.N.T exists for one reason: good people, good drinks, good times.
            We&apos;re not a club, not an organisation, and definitely don&apos;t have a
            committee. We&apos;re ten mates who make time for each other in the way
            adults are supposed to but often forget — by meeting in a pub and
            talking about nothing and everything until last orders.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">
            The Unofficial Rules
          </h2>
          <div className="grid gap-4">
            {RULES.map((item) => (
              <div
                key={item.rule}
                className="bg-stone-900 rounded-xl p-5 border border-amber-900/30 flex gap-4 items-start hover:border-amber-700/50 transition-colors"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                <div>
                  <div className="font-semibold text-amber-300 mb-1">
                    {item.rule}
                  </div>
                  <div className="text-amber-600 text-sm">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
