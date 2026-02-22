import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

const THINGS = [
  {
    emoji: "🔍",
    text: (
      <>
        Curious by nature — I enjoy learning how things work, especially in tech
        and programming.
      </>
    ),
  },
  {
    emoji: "🧩",
    text: (
      <>
        I like solving problems, improving my skills, and pushing myself to get
        better every day.
      </>
    ),
  },
  {
    emoji: "🛠️",
    text: (
      <>
        I often spend time exploring new tools, practicing coding and working on
        personal projects.
      </>
    ),
  },
  {
    emoji: "🎵",
    text: (
      <>
        Outside of studies, I enjoy listening to music, thinking about ideas,
        and planning my future goals.
      </>
    ),
  },
  {
    emoji: "📈",
    text: (
      <>
        I believe in learning through practice, staying consistent, and growing
        step by step.
      </>
    ),
  },
];

export function ThingAboutMe() {
  return (
    <Panel id="personality">
      <PanelHeader>
        <PanelTitle>Thing About Me</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-5">
          {THINGS.map(({ emoji, text }, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* Emoji icon in a subtle pill */}
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/30 bg-muted/30 text-base">
                {emoji}
              </div>
              <p className="pt-1 text-sm leading-relaxed text-foreground/65">
                {text}
              </p>
            </div>
          ))}

          <p className="mt-1 font-serif text-xs text-muted-foreground/35 italic">
            *this is just the surface — the rest shows up in what I build.
          </p>
        </div>
      </PanelContent>
    </Panel>
  );
}
