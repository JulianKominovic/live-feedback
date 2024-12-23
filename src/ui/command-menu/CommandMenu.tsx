import {
  KBarPortal,
  KBarPositioner,
  useMatches,
  KBarResults,
  type Action,
  useRegisterActions,
  useKBar,
  VisualState,
} from "kbar";
import { Z_INDEXES } from "../../styles/tokens";
import {
  ArrowUUpRight,
  Presentation,
  HandTap,
  Image,
  Database,
  WifiMedium,
  Compass,
  File,
  Link,
  Video,
  MusicNote,
  Browser,
  FileCss,
  Network,
  CloudArrowUp,
  Code,
} from "@phosphor-icons/react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import useDevtools from "../../store/devtools";
import { IVitalsScore } from "perfume.js";
import { useEffect, useMemo } from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import useAuthStore from "../../store/auth";
import prettyBytes from "pretty-bytes";
import useUIStore from "../../store/ui";
import { StyledAnimator } from "./StyledAnimator";
import { StyledKBarSearch } from "./StyledKBarSearch";
import { StyledResults } from "./StyledResults";
import { MetricItem } from "./MetricItem";
import { StyledGroup } from "./StyledGroup";
import { CommandMenuAction } from "../../types/Devtoolts";
import { focusAndAnimateElement } from "../../logic/dom";

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <StyledGroup>{item}</StyledGroup>
        ) : (
          <StyledResults active={active} data-parent={item.parent}>
            <div>
              {item.icon && <span>{item.icon}</span>}
              {item.name && <span>{item.name}</span>}
            </div>
            {item.subtitle && <span className="subtitle">{item.subtitle}</span>}
          </StyledResults>
        )
      }
    />
  );
}

export function metricScoreToColorScheme(
  score?: IVitalsScore | "needs-improvement"
) {
  switch (score) {
    case "good":
      return "success";
    case "needsImprovement":
    case "needs-improvement":
      return "warning";
    case "poor":
      return "error";
    default:
      return "info";
  }
}
export default function Cmdk({ shadowRoot }: { shadowRoot: ShadowRoot }) {
  const metrics = useDevtools((state) => state.metrics);
  const brokenResources = useDevtools((state) => state.brokenResources);
  const findBrokenResources = useDevtools((state) => state.findBrokenResources);
  const visualState = useKBar((state) => state.visualState);
  const setIsAuthed = useAuthStore((state) => state.setIsAuthed);
  const setIsThreadListOpen = useUIStore((state) => state.setIsThreadListOpen);
  // Kbar has a bug where visualState is not an enum, string is spread all over the object as object's keys
  const isShowing = Object.values(visualState)
    .join("")
    .includes(VisualState.showing);
  useEffect(() => {
    function onWindowUrlChange() {
      if (brokenResources.length === 0 && isShowing) findBrokenResources();
    }
    onWindowUrlChange();
    window.addEventListener("popstate", onWindowUrlChange);
    return () => window.removeEventListener("popstate", onWindowUrlChange);
  }, [isShowing, brokenResources]);

  const fixedActions: CommandMenuAction[] = [
    {
      id: "logout",
      section: {
        name: "Live Feedback actions",
        priority: 1,
      },
      icon: <ExitIcon />,
      name: "Log out",
      keywords: "logout",
      perform: () => setIsAuthed(false),
      mainActionLabel: "Log out",
    },
    {
      id: "Open-thread-list",
      section: {
        name: "Live Feedback actions",
        priority: 1,
      },
      icon: <ArchiveIcon />,
      name: "Open Thread List",
      keywords: "Open thread list",
      perform: () => setIsThreadListOpen(true),
      mainActionLabel: "Open Thread List",
    },
  ];
  const actions = useMemo(() => {
    if (metrics?.RT !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "Redirect time",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <ArrowUUpRight />,
        name: (
          <MetricItem
            metric={{
              name: "Redirect time",
              value: `${metrics?.RT?.value}ms`,
              score: metrics?.RT?.score,
            }}
          />
        ),
        subtitle:
          "Redirects add latency to requests, so measuring them may be worth the effort.",
        keywords: "Redirect time",
      });
    }
    if (metrics?.FCP !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "First Contentful Paint",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <Presentation />,
        name: (
          <MetricItem
            metric={{
              name: "First Contentful Paint",
              value: `${metrics?.FCP?.value}ms`,
              score: metrics?.FCP?.score,
            }}
          />
        ),
        subtitle:
          "Measures how long it takes the browser to render the first piece of DOM content after a user navigates to your page. Images, non-white <canvas> elements, and SVGs on your page are considered DOM content; anything inside an iframe isn't included.",
        keywords: "First Contentful Paint",
      });
    }

    if (metrics?.FID !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "First Input Delay",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <HandTap />,
        name: (
          <MetricItem
            metric={{
              name: "First Input Delay",
              value: `${metrics?.FID?.value}ms`,
              score: metrics?.FID?.score,
            }}
          />
        ),
        subtitle:
          "Measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.",
        keywords: "First Input Delay",
      });
    }

    if (metrics?.LCP !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "Largest Contentful Paint",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <Image />,
        name: (
          <MetricItem
            metric={{
              name: "Largest Contentful Paint",
              value: `${metrics?.LCP?.value}ms`,
              score: metrics?.LCP?.score,
            }}
          />
        ),
        subtitle:
          "Largest Contentful Paint marks the time at which the largest text or image is painted.",
        keywords: "Largest Contentful Paint",
      });
    }

    if (metrics?.CLS !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "Cumulative Layout Shift",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <Image />,
        name: (
          <MetricItem
            metric={{
              name: "Cumulative Layout Shift",
              value: `${metrics?.CLS?.value}`,
              score: metrics?.CLS?.score,
            }}
          />
        ),
        subtitle:
          "Measures the sum total of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.",
        keywords: "Cumulative Layout Shift",
      });
    }

    if (metrics?.INP !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "Interaction to Next Paint",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <HandTap />,
        name: (
          <MetricItem
            metric={{
              name: "Interaction to Next Paint",
              value: `${metrics?.INP?.value}ms`,
              score: metrics?.INP?.score,
            }}
          />
        ),
        subtitle:
          "Measures user interface responsiveness. How quickly a website responds to user interactions like clicks or key presses.",
        keywords: "Interaction to Next Paint",
      });
    }

    if (
      metrics?.storageEstimate !== undefined &&
      metrics?.storageEstimate.score &&
      metrics.storageEstimate.value
    ) {
      fixedActions.push({
        perform: () => {},
        id: "Storage Estimate",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <Database />,
        name: (
          <MetricItem
            metric={{
              name: "Storage Estimate",
              value: `${metrics?.storageEstimate?.value}ms`,
              score: metrics?.storageEstimate?.score,
            }}
          />
        ),
        subtitle:
          "Storage Estimate measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.",
        keywords: "Storage Estimate",
      });
    }

    if (metrics?.TTFB !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "Time to First Byte",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <WifiMedium />,
        name: (
          <MetricItem
            metric={{
              name: "Time to First Byte",
              value: `${metrics?.TTFB?.value}ms`,
              score: metrics?.TTFB?.score,
            }}
          />
        ),
        subtitle:
          "The amount of time it takes after the client sends an HTTP GET request to receive the first byte of the requested resource from the server. It is the largest web page load time component taking 40 to 60% of total web page latency.",
        keywords: "Time to First Byte",
      });
    }

    if (metrics?.NTBT !== undefined) {
      fixedActions.push({
        perform: () => {},
        id: "Navigation Total Blocking Time",
        section: {
          name: "Metrics",
          priority: 1,
        },
        icon: <Compass />,
        name: (
          <MetricItem
            metric={{
              name: "Navigation Total Blocking Time",
              value: `${metrics?.NTBT?.value}ms`,
              score: metrics?.NTBT?.score,
            }}
          />
        ),
        subtitle:
          "Measures the amount of time the application may be blocked from processing code during the 2s window after a user navigates from page A to page B. The NTBT metric is the summation of the blocking time of all long tasks in the 2s window after this method is invoked.",
        keywords: "Navigation Total Blocking Time",
      });
    }

    if (
      metrics?.performanceResourceTiming &&
      metrics?.performanceResourceTiming?.length > 0
    ) {
      metrics.performanceResourceTiming.forEach((resource) => {
        if (resource)
          fixedActions.push({
            perform: () => {
              window.open(resource.name, "_blank");
            },
            mainActionLabel: "Open in new tab",
            id: resource.name,
            section: {
              name: "Elevated response times",
              priority: 1,
            },
            icon:
              resource.initiator === "audio" ? (
                <MusicNote />
              ) : resource.initiator === "img" ||
                resource.initiator === "image" ? (
                <Image />
              ) : resource.initiator === "frame" ||
                resource.initiator === "iframe" ? (
                <Browser />
              ) : resource.initiator === "css" ? (
                <FileCss />
              ) : resource.initiator === "fetch" ? (
                <CloudArrowUp />
              ) : resource.initiator === "link" ? (
                <Link />
              ) : resource.initiator === "script" ? (
                <Code />
              ) : resource.initiator === "navigation" ? (
                <Compass />
              ) : resource.initiator === "xmlhttprequest" ? (
                <Network />
              ) : resource.initiator === "video" ? (
                <Video />
              ) : (
                <File />
              ),
            name: (
              <MetricItem
                metric={{
                  name: resource.name,
                  value: `${Math.round(resource.duration)}ms`,
                  score: resource.duration > 1000 ? "needsImprovement" : "good",
                }}
              />
            ),
            subtitle: `Transfer size: ${prettyBytes(resource.transferSize)}`,
            keywords: resource.name,
          });
      });
    }

    if (brokenResources && brokenResources.length > 0) {
      brokenResources.forEach((resource) => {
        if (resource)
          fixedActions.push({
            mainActionLabel: "Focus on this resource",
            perform: () => {
              console.log(resource.element);
              focusAndAnimateElement(resource.element);
            },
            id: resource.url,
            section: {
              name: "Broken links",
              priority: 1,
            },
            icon:
              resource.type === "VIDEO" ? (
                <Video />
              ) : resource.type === "AUDIO" ? (
                <MusicNote />
              ) : resource.type === "IMG" ? (
                <Image />
              ) : resource.type === "IFRAME" ? (
                <Browser />
              ) : (
                <Link />
              ),
            name: (
              <MetricItem
                metric={{
                  name: resource.url,
                  value: resource.statusCode + "",
                  score:
                    +resource.statusCode >= 400
                      ? "needsImprovement"
                      : +resource.statusCode >= 500 ||
                          resource.statusCode === "CORS"
                        ? "poor"
                        : "good",
                }}
              />
            ),
            keywords: resource.url,
          });
      });
    }

    return fixedActions;
  }, [isShowing, brokenResources]);

  useRegisterActions(actions as any, [actions]);
  return (
    <KBarPortal
      container={
        (shadowRoot as unknown as HTMLElement).querySelector(
          "#live-feedback-styles-wrapper"
        ) as HTMLElement
      }
    >
      <KBarPositioner
        style={{
          zIndex: Z_INDEXES.TOOLBAR,
          background: "rgba(0,0,0,.8)",
        }}
      >
        <StyledAnimator>
          <StyledKBarSearch />
          <RenderResults />
        </StyledAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
