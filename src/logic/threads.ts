import { createIssue, getIssues } from "../integrations/github/issues";
import { Thread } from "../types/Threads";
import { log, pipe } from "../utils";
import {
  buildSelectors,
  checkVisibility,
  checkVisibilityInCoords,
  getCssSelectorForTextNode,
  getElementFromCssSelectorAndChildrenIndex,
  tryToGetElementFromSelectors,
} from "./dom";

export async function createThreadOnTextRange({
  title,
  commonAncestor,
  start,
  end,
  startNode,
  endNode,
  bindedPullRequestId,
}: {
  title: string;
  commonAncestor: HTMLElement;
  start: number;
  end: number;
  startNode: Node;
  endNode: Node;
  bindedPullRequestId: number;
}) {
  const startNodeSelector = getCssSelectorForTextNode(startNode);
  const endNodeSelector = getCssSelectorForTextNode(endNode);

  const thread: Thread = {
    title: "[LIVE FEEDBACK] - " + title,
    status: "OPEN",
    date: new Date().toISOString(),
    comments: [],
    tracking: {
      type: "TEXT_RANGE",
      selectors: buildSelectors(commonAncestor),
      attributes: {
        display: commonAncestor.style.display,
        visibility: commonAncestor.style.visibility,
        opacity: commonAncestor.style.opacity,
        hidden: commonAncestor.getAttribute("hidden"),
        "aria-hidden": commonAncestor.getAttribute("aria-hidden"),
        "aria-expanded": commonAncestor.getAttribute("aria-expanded"),
      },
      selectedTextRange: {
        start,
        end,
        startNode: startNodeSelector,
        endNode: endNodeSelector,
      },
      url: window.location.href,
    },
  };
  log("Thread created", thread);
  try {
    log("Creating issue");

    const issueBody = `
  # ${thread.title}

  ## Info
  - **Date**: ${new Date(thread.date).toLocaleString()}
  - **User Agent**: ${navigator.userAgent}
  - **URL**: ${window.location.href}
  - **OS**: ${navigator.platform}
  - **Browser**: ${navigator.appVersion}
  - **Resolution**: ${window.screen.width}w x${window.screen.height}h
  ${bindedPullRequestId !== 0 ? `- **Pull Request**: #${bindedPullRequestId}` : ""}

  ## Tracking (internal use)
  \`\`\`json
  ${JSON.stringify(thread.tracking)}
  \`\`\`
              `;
    const issueResponse = await createIssue({
      body: issueBody,
      title: thread.title,
    });
    if (!issueResponse) return null;
    const GHissueId = issueResponse.data.number;
    const GHIssueCreatorName =
      issueResponse.data.user?.name || issueResponse.data.user?.login;
    const GHIssueCreatorAvatar = issueResponse.data.user?.avatar_url;

    thread.GHissueId = GHissueId + "";
    thread.creator = {
      name: GHIssueCreatorName,
      avatar: GHIssueCreatorAvatar,
    };
    return thread;
  } catch (err) {
    log(err);
    return null;
  }
}

export async function createThreadOnElement({
  bindedPullRequestId,
  clickXCoord,
  clickYCoord,
  element,
  title,
}: {
  title: string;
  element: HTMLElement;
  clickXCoord: number;
  clickYCoord: number;
  bindedPullRequestId: number;
}) {
  const elementRect = element.getBoundingClientRect();
  const xPercentageFromSelectedElement =
    ((clickXCoord - elementRect.left) / elementRect.width) * 100;
  const yPercentageFromSelectedElement =
    ((clickYCoord - (elementRect.top + window.scrollY)) / elementRect.height) *
    100;

  const thread: Thread = {
    title: "[LIVE FEEDBACK] - " + title,
    status: "OPEN",
    date: new Date().toISOString(),
    comments: [],
    tracking: {
      type: "ELEMENT",
      selectors: buildSelectors(element),
      attributes: {
        display: element.style.display,
        visibility: element.style.visibility,
        opacity: element.style.opacity,
        hidden: element.getAttribute("hidden"),
        "aria-hidden": element.getAttribute("aria-hidden"),
        "aria-expanded": element.getAttribute("aria-expanded"),
      },
      xPercentageFromSelectedElement: xPercentageFromSelectedElement + "%",
      yPercentageFromSelectedElement: yPercentageFromSelectedElement + "%",
      url: window.location.href,
    },
  };
  log("Thread created", thread);
  try {
    log("Creating issue");
    const issueBody = `
  # ${thread.title}

  ## Info
  - **Date**: ${new Date(thread.date).toLocaleString()}
  - **User Agent**: ${navigator.userAgent}
  - **URL**: ${window.location.href}
  - **OS**: ${navigator.platform}
  - **Browser**: ${navigator.appVersion}
  - **Resolution**: ${window.screen.width}w x${window.screen.height}h
  ${bindedPullRequestId !== 0 ? `- **Pull Request**: #${bindedPullRequestId}` : ""}

  ## Tracking (internal use)
  \`\`\`json
  ${JSON.stringify(thread.tracking)}
  \`\`\`
              `;

    const issueResponse = await createIssue({
      body: issueBody,
      title: thread.title,
    });
    if (!issueResponse) return null;
    const GHissueId = issueResponse.data.number;
    const GHIssueCreatorName =
      issueResponse.data.user?.name || issueResponse.data.user?.login;
    const GHIssueCreatorAvatar = issueResponse.data.user?.avatar_url;

    thread.GHissueId = GHissueId + "";
    thread.creator = {
      name: GHIssueCreatorName,
      avatar: GHIssueCreatorAvatar,
    };
    return thread;
  } catch (err) {
    log(err);
    return null;
  }
}

export async function getThreads() {
  const issues = await getIssues();
  if (!issues) return [];
  return issues.data
    .filter(
      (issue) =>
        issue.state === "open" && issue.title.startsWith("[LIVE FEEDBACK]")
    )
    .map((issue) => {
      const trackingJSON =
        issue.body?.split("```json")[1].split("```")[0].trim() || "{}";
      const tracking = JSON.parse(trackingJSON);
      const thread: Thread = {
        GHissueId: issue.number + "",
        status: issue.state === "open" ? "OPEN" : "CLOSED",
        creator: {
          name: issue.user?.name || issue.user?.login,
          avatar: issue.user?.avatar_url,
        },
        title: issue.title,
        date: issue.created_at,
        comments: Array.from({ length: issue.comments }),
        tracking,
      };
      return thread;
    });
}

export function checkThreadsBubbles(threads: Thread[]) {
  return threads.map((thread) => {
    const element = (
      Array.isArray(thread.tracking.selectors)
        ? tryToGetElementFromSelectors(thread.tracking.selectors)
        : document.querySelector(thread.tracking.selectors)
    ) as HTMLElement | null;
    if (!element) {
      thread.tracking.show = false;
      return thread;
    }

    const elementDisplay = element.style.display;
    const elementVisibility = element.style.visibility;
    const elementOpacity = element.style.opacity;
    const elementHidden = element.getAttribute("hidden");
    const elementAriaHidden = element.getAttribute("aria-hidden");
    const elementAriaExpanded = element.getAttribute("aria-expanded");

    if (
      elementDisplay !== thread.tracking.attributes.display ||
      elementVisibility !== thread.tracking.attributes.visibility ||
      elementOpacity !== thread.tracking.attributes.opacity ||
      elementHidden !== thread.tracking.attributes.hidden ||
      elementAriaHidden !== thread.tracking.attributes["aria-hidden"] ||
      elementAriaExpanded !== thread.tracking.attributes["aria-expanded"]
    ) {
      thread.tracking.show = false;
      return thread;
    }

    if (window.location.href !== thread.tracking.url) {
      thread.tracking.show = false;
      return thread;
    }

    thread.tracking.show = checkVisibility(element);
    return thread;
  });
}

export function calculateBubblePosition(thread: Thread) {
  const element = Array.isArray(thread.tracking.selectors)
    ? tryToGetElementFromSelectors(thread.tracking.selectors)
    : document.querySelector(thread.tracking.selectors);
  if (!element) return thread;
  if (!thread.tracking.show) return thread;
  if (thread.tracking.type === "TEXT_RANGE") {
    const { start, end } = thread.tracking.selectedTextRange;
    const startNodeFound = pipe(
      thread.tracking.selectedTextRange.startNode,
      ({ childrenIndex, cssSelectors }) =>
        getElementFromCssSelectorAndChildrenIndex(cssSelectors, childrenIndex)
    );
    const endNodeFound = pipe(
      thread.tracking.selectedTextRange.endNode,
      ({ childrenIndex, cssSelectors }) =>
        getElementFromCssSelectorAndChildrenIndex(cssSelectors, childrenIndex)
    );
    const range = document.createRange();

    if (startNodeFound) range.setStart(startNodeFound, start);
    if (endNodeFound) range.setEnd(endNodeFound, end);
    const clientRects = range.getClientRects();
    if (!clientRects.length) {
      thread.tracking.show = false;
      return thread;
    }

    const xWithoutScroll = (
      clientRects.item(0) || range.getBoundingClientRect()
    ).right;
    const yWithoutScroll = (
      clientRects.item(0) || range.getBoundingClientRect()
    ).bottom;
    const x = xWithoutScroll + window.scrollX;
    const y = yWithoutScroll + window.scrollY;
    thread.tracking.show = checkVisibilityInCoords(
      startNodeFound,
      xWithoutScroll,
      yWithoutScroll,
      "TEXT_RANGE"
    );
    thread.tracking.liveCoords = { x, y, clientRects: range.getClientRects() };
    return thread;
  }
  const rect = element.getBoundingClientRect();

  const xWithoutScroll =
    rect.width *
      (parseFloat(thread.tracking.xPercentageFromSelectedElement) / 100) +
    rect.left;
  const yWithoutScroll =
    rect.height *
      (parseFloat(thread.tracking.yPercentageFromSelectedElement) / 100) +
    rect.top;

  const x = xWithoutScroll + window.scrollX;
  const y = yWithoutScroll + window.scrollY;
  thread.tracking.show = checkVisibilityInCoords(
    element,
    xWithoutScroll,
    yWithoutScroll,
    "ELEMENT"
  );
  thread.tracking.liveCoords = { x, y };
  return thread;
}
