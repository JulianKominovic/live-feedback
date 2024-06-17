import Link from "next/link";
import { H2 } from "../components/Titles";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function FinalCTA() {
  return (
    <section className="relative flex flex-col items-center max-w-screen-lg gap-4 px-8 py-16 mx-4 my-16 overflow-hidden border lg:mx-auto border-white/10 rounded-3xl backdrop-blur-3xl bg-black/20">
      <H2 className="text-6xl">Ready to start?</H2>
      <p className="text-center text-foreground-muted">
        Ask your devs to start using Live Feedback. <br />
        If you are a dev go ahead, click 'Get started' button to read the docs.
      </p>
      <Link
        href="/docs"
        className="flex items-center gap-4 px-6 py-3 mt-6 transition-all duration-200text-foreground bg-primary hover:bg-primary-accent hover:transition-all hover:shadow-primary-outline rounded-2xl"
      >
        Get started <ArrowRight weight="bold" />
      </Link>
    </section>
  );
}
