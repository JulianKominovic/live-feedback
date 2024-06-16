import Link from "next/link";
import LiveFeedbackIcon from "../components/icons/LiveFeedbackIcon";
import { Play } from "@phosphor-icons/react/dist/ssr";
import GithubStarButton from "../components/GithubStarButton";
import { Suspense } from "react";
const links = [
  { url: "/home", children: "Home" },
  { url: "/docs", children: "Docs" },
];

export default async function Navbar() {
  return (
    <nav className="sticky flex py-4 justify-center items-center top-0 z-50 left-0">
      <ul className="w-fit h-14 items-center gap-3 px-3 rounded-2xl  bg-background/50 border border-white/10 hidden sm:flex backdrop-blur-xl">
        <li>
          <Link
            href="/"
            className="text-foreground px-2 py-1 rounded-md text-2xl group-hover:bg-white/10"
          >
            <LiveFeedbackIcon />
          </Link>
        </li>
        {links.map(({ url, children }) => (
          <li key={url} className="flex items-center gap-2 group">
            <Link
              href={url}
              className="text-foreground transition-colors px-3.5 py-1.5 duration-200 rounded-md text-sm group-hover:bg-white/10"
            >
              {children}
            </Link>
          </li>
        ))}
        <li className="group">
          <Suspense fallback={<></>}>
            <GithubStarButton />
          </Suspense>
        </li>
        <li className="group">
          <Link
            href="/auth"
            className="text-foreground bg-primary px-3.5 py-1.5 rounded-lg text-sm group-hover:bg-primary-accent flex items-center gap-2 transition-all group-hover:transition-all group-hover:shadow-primary-outline duration-200"
          >
            Try it out <Play />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
