import { Suspense } from "react";
import Badge from "../components/Badge";
import { StarFour, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ToolbarImage from "../assets/toolbar.png";
import Image from "next/image";
import { H1, H2 } from "../components/Titles";

async function LastVersionTag() {
  const response = await fetch(
    "https://api.github.com/repos/JulianKominovic/live-feedback/releases/latest",
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );
  const data = await response.json();
  const lastVersion = data.tag_name;
  return (
    <a
      href="https://github.com/JulianKominovic/live-feedback/releases/latest"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-1 px-3 py-2 text-xs transition-colors duration-200 rounded-lg hover:bg-white/10"
    >
      <Badge className="inline-flex px-1.5 text-[10px] py-0.5 gap-1 items-center">
        <StarFour weight="fill" className="mr-1" />
        New
      </Badge>
      Version {lastVersion} is here!
    </a>
  );
}

export default async function Hero() {
  console.log(ToolbarImage);
  return (
    <main
      id="hero"
      className="relative flex flex-col items-center max-w-screen-lg gap-4 px-8 pt-32 pb-32 mx-auto overflow-hidden"
    >
      <Suspense>
        <LastVersionTag />
      </Suspense>
      <H1 id="hero-title">Live Feedback</H1>
      <H2 id="description" className="text-base text-foreground-muted">
        Inject Live Feedback script and start getting feedback on your website
        in real time from your developers, designers and collaborators.
      </H2>
      <section
        id="cta"
        className="flex flex-col items-center gap-3 mt-8 sm:flex-row"
      >
        <Link
          href="/?demo=true"
          className="relative flex items-center gap-2 px-4 py-3 transition-all duration-200 rounded-lg text-foreground bg-primary hover:bg-primary-accent hover:transition-all hover:shadow-primary-outline"
        >
          Try right here <RocketLaunch weight="fill" />
        </Link>
        <Link
          href="/auth"
          className="flex items-center gap-2 px-4 py-2 transition-all duration-200 border rounded-lg text-foreground bg-background/10 hover:transition-all hover:shadow-white-outline border-white/10"
        >
          Get started
        </Link>
      </section>
      <section className="relative mt-16">
        <Image
          src={ToolbarImage}
          alt="Toolbar"
          className="object-contain w-auto h-16 rounded-full"
        />
      </section>
      <div
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%,#ff0000 0deg,hsl(354,100%,50%) 54.89161972682219deg,#00a6ff 106.69924423399361deg,#4797ff 162deg,#04f 252.00000000000003deg,#ff8000 306.00000000000006deg,hsl(0,100%,50%) 360deg)",
        }}
        className="absolute -bottom-[300px] left-1/2 -translate-x-1/2 rounded-[50%] w-[600px] h-[600px] blur-3xl -z-10 animate-spin-slow"
      />
    </main>
  );
}

export const revalidate = 3600; // revalidate at most every hour
