import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People · P.I.N.T",
  description: "Meet the ten members of P.I.N.T",
};

const MEMBERS = [
  {
    name: "Phil Brew",
    title: "The Brewmaster",
    emoji: "🍺",
    bio: "Founding member by virtue of having the best surname. Responsible for setting the group's absurdly high standards for a good pint.",
  },
  {
    name: "Issy Steele",
    title: "The Iron Liver",
    emoji: "💪",
    bio: "Unshakeable. Can pivot from prosecco to Guinness to cocktails without missing a beat or a conversation.",
  },
  {
    name: "Emily Oldroyd",
    title: "The Wise Elder",
    emoji: "🦉",
    bio: "Provides calm, measured advice up until round three, after which the advice gets significantly better.",
  },
  {
    name: "Daniel Routledge",
    title: "The Navigator",
    emoji: "🗺️",
    bio: "Always knows a better pub just around the corner. Has led the group exactly nowhere bad. Well, almost never.",
  },
  {
    name: "Emma Rees",
    title: "The Round Keeper",
    emoji: "📋",
    bio: "Has an impeccable memory for whose round it is. Nobody escapes. Nobody has ever tried.",
  },
  {
    name: "James Whitehead",
    title: "The Frothy Top",
    emoji: "🫧",
    bio: "Full of energy and ideas, especially after a Guinness. The most likely to suggest 'one more for the road'.",
  },
  {
    name: "Alex Gibbons",
    title: "The Social Secretary",
    emoji: "📅",
    bio: "Somehow manages to herd ten very busy adults into the same pub at the same time. An organisational miracle worker.",
  },
  {
    name: "Tara Gibbons",
    title: "The Other Gibbons",
    emoji: "🌟",
    bio: "Not to be confused with Alex. Brings independent spirit, excellent taste, and healthy scepticism about whatever Alex has organised.",
  },
  {
    name: "Tom Burdon",
    title: "The Heavy Lifter",
    emoji: "🏋️",
    bio: "First to arrive, last to leave, and most likely to carry everyone else's coat. The backbone of any good night out.",
  },
  {
    name: "Ryan Holmes",
    title: "The Deducer",
    emoji: "🔍",
    bio: "Quietly observes, says very little, then makes exactly the right call on where to go next. Elementary, really.",
  },
];

export default function People() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-6xl mb-6">👥</div>
        <h1 className="text-5xl font-black text-amber-400 mb-4 tracking-wide">
          The Crew
        </h1>
        <p className="text-xl text-amber-300">
          Ten people. One group chat. Infinite rounds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {MEMBERS.map((member) => (
          <div
            key={member.name}
            className="bg-stone-900 rounded-2xl p-6 border border-amber-900/30 hover:border-amber-600/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-2xl flex-shrink-0">
                {member.emoji}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-amber-100 leading-tight">
                  {member.name}
                </h2>
                <div className="text-amber-500 text-sm font-medium mb-2">
                  {member.title}
                </div>
                <p className="text-amber-300/70 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
