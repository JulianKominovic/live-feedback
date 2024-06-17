import Image from "next/image";
import { BentoCard, BentoGrid } from "../components/BentoGrid";
import textRangeSelect from "../assets/feature-text-range-select.jpeg";
import elementSelect from "../assets/feature-element-select.jpeg";
import featureThreadBubblePopover from "../assets/feature-thread-bubble-popover.jpeg";
import featureThreadList from "../assets/feature-thread-list.jpeg";
import featureGithubIssue from "../assets/feature-github-issue.jpeg";
import { H2 } from "../components/Titles";
import {
  CursorText,
  CursorClick,
  ChatTeardrop,
  LightbulbFilament,
  ListChecks,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
const integrationFeatures = [
  {
    Icon: CursorText,
    name: "Text range select",
    description:
      "Select text on your website and start a conversation with your team members.",
    href: "#",
    cta: "Learn more",
    background: (
      <Image
        src={textRangeSelect}
        alt="Text range select feature in action"
        className="absolute -right-32 -top-16 opacity-80"
      />
    ),
    className: "md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3",
  },
  {
    Icon: CursorClick,
    name: "Feedback on elements",
    description:
      "Click on any element on your website and start a conversation with your team members.",
    href: "https://github.com/octokit/octokit.js",
    cta: "Learn more",
    background: (
      <Image
        src={elementSelect}
        alt="Octokit logo"
        className="absolute -right-20 -top-20 opacity-80"
      />
    ),
    className: "md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3",
  },
  {
    Icon: ChatTeardrop,
    name: "Comment threads",
    description:
      "Add comments, inspect details, close the thread and more from the bubble popover.",
    href: "https://github.com/octokit/octokit.js",
    cta: "Learn more",
    background: (
      <Image
        src={featureThreadBubblePopover}
        alt="Octokit logo"
        className="absolute -right-0 -top-40 opacity-60"
      />
    ),
    className: "md:col-start-2 md:col-end-4 md:row-start-3 md:row-end-4",
  },
  {
    Icon: LightbulbFilament,
    name: "Smart tracking",
    description:
      "We don't save the coordinates of the feedback bubble, instead we use multiple strategies to track the element, ensuring the bubble is always in the right place.",
    href: "https://github.com/octokit/octokit.js",
    cta: "Learn more",
    background: null,
    className: "md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2",
  },
  {
    Icon: ListChecks,
    name: "Thread history",
    description:
      "Easily navigate through the thread history and find where the feedback was left.",
    href: "https://github.com/octokit/octokit.js",
    cta: "Learn more",
    background: (
      <Image
        src={featureThreadList}
        alt="Octokit logo"
        className="absolute object-cover w-auto h-full -right-0 -top-0 opacity-60"
      />
    ),
    className: "md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4",
  },
  {
    Icon: GithubLogo,
    name: "Feedback stored in Github Issues",
    description:
      "All feedback is stored in Github Issues, so it's easy to track and manage.",
    href: "https://github.com/octokit/octokit.js",
    cta: "Learn more",
    background: (
      <Image
        src={featureGithubIssue}
        alt="Octokit logo"
        className="absolute -right-40 -top-20 opacity-60"
      />
    ),
    className: "md:col-start-1 md:col-end-4 md:row-start-4 md:row-end-5",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative flex flex-col items-center max-w-screen-lg gap-4 px-8 pt-32 pb-32 mx-auto overflow-hidden"
    >
      <span className="px-4 py-2 mb-8 text-xs border rounded-lg border-white/10">
        Features
      </span>
      <H2>Some innovative features that will improve your workflow</H2>
      <p className="text-center text-foreground-muted">
        Remember that Live Feedback is under heavy development and we are always
        adding new features.
      </p>
      <BentoGrid className="my-12">
        {integrationFeatures.map((feature) => (
          <BentoCard {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
