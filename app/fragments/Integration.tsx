import Image from "next/image";
import { BentoCard, BentoGrid } from "../components/BentoGrid";
import octokitLogo from "../assets/octokit-logo.png";
import loginWithGithub from "../assets/login-with-github-btn.png";
import GithubAnimatedBeam from "../components/GithubAsDatabaseAnimatedBeam";
import { H2 } from "../components/Titles";
import { Database, Cloud, UserSwitch } from "@phosphor-icons/react/dist/ssr";
const integrationFeatures = [
  {
    Icon: Database,
    name: "Github as database",
    description:
      "In order to keep things simple, we use Github Issues to store your feedback.",
    href: "#",
    cta: "Learn more",
    background: <GithubAnimatedBeam className="mt-12 px-4" />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-4",
  },
  {
    Icon: Cloud,
    name: "Github API Rest",
    description:
      "Thanks to Octokit SDK for browsers every request is client-side. No server needed.",
    href: "https://github.com/octokit/octokit.js",
    cta: "Learn more",
    background: (
      <Image
        src={octokitLogo}
        alt="Octokit logo"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: UserSwitch,
    name: "No registration needed",
    description: "Just use your existing Github account.",
    href: "#",
    cta: "Learn more",
    background: (
      <Image
        src={loginWithGithub}
        alt="Login with Github Live Feedback button"
        className="absolute -right-20 top-12 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

export default function Integration() {
  return (
    <section className="flex overflow-hidden max-w-screen-lg mx-auto px-8 flex-col gap-4 items-center pt-32 relative pb-32">
      <span className="px-4 py-2 mb-8 text-xs border border-white/10 rounded-lg">
        Integration
      </span>
      <H2>Github integration</H2>
      <p className="text-foreground-muted text-center">
        Your feedback remains private next to your source code.
      </p>
      <BentoGrid className="my-12">
        {integrationFeatures.map((feature) => (
          <BentoCard {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
