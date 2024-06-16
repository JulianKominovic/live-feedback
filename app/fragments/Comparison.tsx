import { H2, H3 } from "../components/Titles";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { NeonGradientCard } from "../components/NeonGradientCard";

const cons = [
  "Slow communication.",
  "Extra manual labor.",
  "Clunky bug reports.",
  "You have to interrupt what you're doing to write some feedback.",
  "In medium or large companies you may not know which team owns the app where you are leaving feedback.",
  "Bug reports could end up in backlog hell.",
];

const pros = [
  "Constant, proactive communication. Giving feedback is much easier.",
  "Chat with your team right inside the website.",
  "No need to interrupt your workflow. In just 3 clicks you can leave useful feedback.",
  "You don't need to know internal information to leave feedback.",
  "You actually see where the feedback is.",
  "Never miss a report again. Feedback bubble will not disappear until you close it manually.",
  "Feedback is stored in Github Issues, so it's easy to track and manage.",
];

export default function Comparison() {
  return (
    <section className="flex overflow-visible max-w-screen-lg mx-auto px-8 flex-col gap-4 items-center pt-32 relative pb-32">
      <span className="px-4 py-2 mb-8 text-xs border border-white/10 rounded-lg">
        Comparison
      </span>
      <H2>But, why would you want to use this?</H2>

      <article className="flex flex-col md:flex-row items-center gap-8 my-16">
        <div className="flex-grow">
          <H3 className="text-foreground-muted ">Without Live Feedback</H3>
          <ul className="mt-8 rounded-3xl border border-white/10 p-8">
            {cons.map((con) => (
              <li
                key={con}
                className="flex items-center mb-4 gap-2 text-foreground-muted"
              >
                <span className="flex-shrink-0 text-lg font-mono">x</span>
                <p>{con}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-grow">
          <H3 className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-primary from-35% to-orange-500 bg-clip-text text-center text-2xl font-medium leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            With Live Feedback
          </H3>
          <NeonGradientCard
            borderRadius={24}
            borderSize={1}
            neonColors={{
              firstColor: "rgb(255, 69, 51)",
              secondColor: "#ea16f9",
            }}
            className="mt-8 rounded-3xl border bg-background border-white/10"
          >
            <ul className="relative p-2">
              {pros.map((con) => (
                <li key={con} className="flex items-center mb-4 gap-2">
                  <Check className="flex-shrink-0 text-primary" />
                  <p>{con}</p>
                </li>
              ))}
            </ul>
          </NeonGradientCard>
        </div>
      </article>
    </section>
  );
}
