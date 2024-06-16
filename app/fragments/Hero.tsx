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
      className="text-xs flex gap-3 items-center px-3 py-2 hover:bg-white/10 p-1 rounded-lg transition-colors duration-200"
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
    <main className="flex overflow-hidden max-w-screen-lg mx-auto px-8 flex-col gap-4 items-center pt-32 relative pb-32">
      <Suspense>
        <LastVersionTag />
      </Suspense>
      <H1 id="title">Live Feedback</H1>
      <H2 id="description" className="text-foreground-muted text-base">
        Inject Live Feedback script and start getting feedback on your website
        in real time from your developers, designers and collaborators.
      </H2>
      <section id="cta" className="flex gap-3 items-center mt-8">
        <Link
          href="/auth"
          className="text-foreground bg-background/10 px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:transition-all hover:shadow-white-outline duration-200 border border-white/10"
        >
          Get started
        </Link>
        <Link
          href="/?demo=true"
          className="text-foreground bg-primary px-4 py-3 rounded-lg hover:bg-primary-accent flex items-center gap-2 transition-all hover:transition-all hover:shadow-primary-outline duration-200 relative"
        >
          Try right here <RocketLaunch weight="fill" />
        </Link>
      </section>
      <section className="relative mt-16">
        <Image
          src={ToolbarImage}
          alt="Toolbar"
          className="h-16 w-auto object-contain rounded-full mix-blend-screen shadow-xl backdrop-blur-md backdrop-brightness-[0.7]"
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
