import Link from "next/link";
import LiveFeedbackIcon from "../components/icons/LiveFeedbackIcon";

export default function Footer() {
  return (
    <footer className="relative px-4 pt-16 pb-32 mt-24 overflow-y-visible bg-black/60 backdrop-blur-3xl border-y border-white/10">
      <div className="flex items-center max-w-screen-md gap-2 mx-auto text-3xl">
        <LiveFeedbackIcon />
        <p>Live Feedback</p>
      </div>
      <div className="flex flex-wrap items-start max-w-screen-md gap-12 mx-auto mt-12">
        <ul className="font-light text-foreground-muted [&>li]:leading-7 [&>li:first-child]:mb-4">
          <li className="font-bold text-foreground">Links</li>
          <li>
            <Link href="#hero">Home</Link>
          </li>
          <li>
            <Link href="#github-integration">Integration</Link>
          </li>
          <li>
            <Link href="#comparison">Comparison</Link>
          </li>
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#first-steps">First steps</Link>
          </li>
          <li>
            <Link href="#security-and-privacy">Security and Privacy</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
        </ul>
        <ul className="font-light text-foreground-muted [&>li]:leading-7 [&>li:first-child]:mb-4">
          <li className="font-bold text-foreground">Docs</li>
          <li>
            <Link href="#hero">Home</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
