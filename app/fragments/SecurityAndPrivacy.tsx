import { H2, H3 } from "../components/Titles";
import { GitPullRequest, Lock, EyeSlash } from "@phosphor-icons/react/dist/ssr";

export default function SecurityAndPrivacy() {
  return (
    <section
      id="security-and-privacy"
      className="relative flex flex-col items-center max-w-screen-lg gap-4 px-8 pt-32 pb-32 mx-auto overflow-hidden"
    >
      <span className="px-4 py-2 mb-8 text-xs border rounded-lg border-white/10">
        Security and privacy
      </span>
      <H2>Secure, private, open source</H2>
      <p className="text-center text-foreground-muted">
        We like to keep things crystal clear.
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-8 mt-16">
        <li className="flex flex-col gap-3 min-h-60 max-w-[50ch] border border-white/10 rounded-3xl p-8">
          <H3 className="flex items-center gap-2 !text-left">
            <GitPullRequest weight="fill" className="text-foreground" />
            Open source
          </H3>
          <p className="text-foreground-muted">
            Source code is public. You can inspect every inch. We are also
            accepting pull requests. Live Feedback is and will be open source.
          </p>
        </li>
        <li className="flex flex-col gap-3 min-h-60 max-w-[50ch] border border-white/10 rounded-3xl p-8">
          <H3 className="flex items-center gap-2 !text-left">
            <Lock weight="fill" className="text-foreground" />
            Secure
          </H3>
          <p className="text-foreground-muted">
            Live Feedback uses Github Issues to store your feedback so you need
            to login and allow Github Live Feedback App to act on your behalf.
            Don't worry Live Feedback is only allowed to create and read issues
            and read pull requests.
          </p>
        </li>
        <li className="flex flex-col gap-3 min-h-60 max-w-[50ch] border border-white/10 rounded-3xl p-8">
          <H3 className="flex items-center gap-2 !text-left">
            <EyeSlash weight="fill" className="text-foreground" />
            Private
          </H3>
          <p className="text-foreground-muted">
            Your data goes directly to Github. There is no proxy, no hidden
            network traffic. Your token remains secure on your browser cookies.
            Only exception is github authentication flow which requires a server
            to work.
          </p>
        </li>
      </ul>
    </section>
  );
}
