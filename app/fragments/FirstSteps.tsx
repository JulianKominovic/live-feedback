import { H2, H3 } from "../components/Titles";
import { Code, GithubLogo, Rocket } from "@phosphor-icons/react/dist/ssr";

export default function FirstSteps() {
  return (
    <section
      id="first-steps"
      className="relative flex flex-col items-center max-w-screen-lg gap-4 px-8 pt-32 pb-32 mx-auto overflow-hidden"
    >
      <span className="px-4 py-2 mb-8 text-xs border rounded-lg border-white/10">
        First steps
      </span>
      <H2>Our simple process to start using Live Feedback</H2>
      <p className="text-center text-foreground-muted">
        Just like you, we love simple things.
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-8 mt-16">
        <li className="flex flex-col items-center gap-3 max-w-[28ch] min-h-60">
          <Code weight="duotone" className="text-primary text-7xl" />
          <H3 className="">Add script tag</H3>
          <p className="text-center text-foreground-muted">
            Add a script tag in your website and set a few properties.
          </p>
        </li>
        <li className="flex flex-col items-center gap-3 max-w-[28ch] min-h-60">
          <GithubLogo weight="duotone" className="text-primary text-7xl" />
          <H3 className="">Login with Github</H3>
          <p className="text-center text-foreground-muted">
            After adding the script you will see a login button at the bottom
            left to login with your Github account.
          </p>
        </li>
        <li className="flex flex-col items-center gap-3 max-w-[28ch] min-h-60">
          <Rocket weight="duotone" className="text-primary text-7xl" />
          <H3 className="">Start leaving feedback</H3>
          <p className="text-center text-foreground-muted">Ready to sail!</p>
        </li>
      </ul>
    </section>
  );
}
