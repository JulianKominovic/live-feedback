import Link from "next/link";
import LiveFeedbackIcon from "../components/icons/LiveFeedbackIcon";
import { Play } from "@phosphor-icons/react/dist/ssr";
import GithubStarButton from "../components/GithubStarButton";
import { Suspense } from "react";
const links = [{ url: "/docs", children: "Docs" }];

export default async function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-50 flex items-center justify-center py-4">
      <ul className="flex items-center gap-3 px-3 border w-fit h-14 rounded-2xl bg-background/50 border-white/10 backdrop-blur-xl">
        <li>
          <Link
            href="/"
            className="px-2 py-1 text-2xl rounded-md text-foreground group-hover:bg-white/10"
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
            href="/?demo=true"
            className="text-foreground bg-primary px-3.5 py-1.5 rounded-lg text-sm group-hover:bg-primary-accent flex items-center gap-2 transition-all group-hover:transition-all group-hover:shadow-primary-outline duration-200"
          >
            <span className="hidden sm:inline-block">Try it out</span> <Play />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
