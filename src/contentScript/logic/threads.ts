import {
  createIssue,
  getIssues,
  updateIssue,
} from "../integrations/github/issues";
import { Thread } from "../types/Threads";
import { uploadDomPhoto, uploadElementPhoto } from "./github";
import { getCssSelector } from "css-selector-generator";
import { sha256 } from "../utils";
import {
  takeElementScreenshot,
  takeTabScreenshot,
} from "../integrations/background/tabs";

export async function createThread(
  title: string,
  element: HTMLElement,
  clickXCoord: number,
  clickYCoord: number
) {
  const elementPhoto = (await takeElementScreenshot(element))?.replace(
    "data:image/png;base64,",
    ""
  );
  const domPhoto = (await takeTabScreenshot())?.replace(
    "data:image/png;base64,",
    ""
  );
  const textContent = element.textContent || "";
  const outerHTML = element.outerHTML || "";
  const textContentHash = await sha256(textContent);
  const outerHTMLHash = await sha256(outerHTML);
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
      selector: getCssSelector(element, {
        includeTag: true,
        selectors: ["id", "attribute", "class", "tag", "nthoftype", "nthchild"],
        blacklist: [/.*\[style(=.*)?\].*/],
      }),
      textContentHash,
      outerHTMLHash,
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
  console.log("Thread created", thread);
  try {
    console.log("Creating issue");
    const issueResponse = await createIssue({
      body: "",
      title: thread.title,
    });
    if (!issueResponse) return null;
    const GHissueId = issueResponse.data.number;
    const GHIssueCreatorName =
      issueResponse.data.user?.name || issueResponse.data.user?.login;
    const GHIssueCreatorAvatar = issueResponse.data.user?.avatar_url;
    console.log("Uploading dom & element photos");
    const domPhotoUpload = await uploadDomPhoto(GHissueId.toString(), domPhoto);
    if (!domPhotoUpload) return null;
    const elementPhotoUpload = await uploadElementPhoto(
      GHissueId.toString(),
      elementPhoto
    );
    if (!elementPhotoUpload) return null;

    const issueBody = `
  # ${thread.title}

  ## Info
  - **Date**: ${new Date(thread.date).toLocaleString()}
  - **User Agent**: ${navigator.userAgent}
  - **URL**: ${window.location.href}
  - **OS**: ${navigator.platform}
  - **Browser**: ${navigator.appVersion}
  - **Resolution**: ${window.screen.width}w x${window.screen.height}h

  ## Images
  ### DOM Photo
  ![Dom Photo](${domPhotoUpload.data.content?.download_url})

  ### Element Photo
  ![Element Photo](${elementPhotoUpload.data.content?.download_url})

  ## Tracking (internal use)
  \`\`\`json
  ${JSON.stringify(thread.tracking)}
  \`\`\`
              `;
    console.log("Updating issue");
    await updateIssue({
      body: issueBody,
      title: thread.title,
      issue_number: GHissueId,
    });
    thread.GHissueId = GHissueId + "";
    thread.creator = {
      name: GHIssueCreatorName,
      avatar: GHIssueCreatorAvatar,
    };
    return thread;
  } catch (err) {
    console.error(err);
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
    // console.log("Checking thread ", thread.GHissueId);
    const element = document.querySelector(
      thread.tracking.selector
    ) as HTMLElement;
    // console.log("Element found?", element);
    if (!element) {
      thread.tracking.show = false;
      return thread;
    }

    /*
     display: string;
    visibility: string;
    opacity: string;
    hidden: string | null;
    "aria-hidden": string | null;
    "aria-expanded": string | null;
    */
    const elementDisplay = element.style.display;
    const elementVisibility = element.style.visibility;
    const elementOpacity = element.style.opacity;
    const elementHidden = element.getAttribute("hidden");
    const elementAriaHidden = element.getAttribute("aria-hidden");
    const elementAriaExpanded = element.getAttribute("aria-expanded");
    // console.log("Same attributes?", {
    //   elementDisplay: elementDisplay === thread.tracking.attributes.display,
    //   elementVisibility:
    //     elementVisibility === thread.tracking.attributes.visibility,
    //   elementOpacity: elementOpacity === thread.tracking.attributes.opacity,
    //   elementHidden: elementHidden === thread.tracking.attributes.hidden,
    //   elementAriaHidden:
    //     elementAriaHidden === thread.tracking.attributes["aria-hidden"],
    //   elementAriaExpanded:
    //     elementAriaExpanded === thread.tracking.attributes["aria-expanded"],
    // });
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

    // console.log("Same URL?", window.location.href, thread.tracking.url);

    if (window.location.href !== thread.tracking.url) {
      thread.tracking.show = false;
      return thread;
    }

    // const elementsFromPoints = document.elementsFromPoint(
    //   thread.tracking.x,
    //   thread.tracking.y
    // );
    // console.log("Element from points", elementsFromPoints);
    // console.log(
    //   "Element is same node as element from points",
    //   elementsFromPoints.some((el) => el.isSameNode(element))
    // );

    // if (!elementsFromPoints.some((el) => el.isSameNode(element))) {
    //   thread.tracking.show = false;
    //   return thread;
    // }

    thread.tracking.show = true;
    return thread;
  });
}

export function calculateBubblePosition(thread: Thread) {
  const element = document.querySelector(
    thread.tracking.selector
  ) as HTMLElement;
  if (!element) return thread;
  const rect = element.getBoundingClientRect();

  const x =
    rect.width *
      (parseFloat(thread.tracking.xPercentageFromSelectedElement) / 100) +
    rect.left +
    window.scrollX;
  const y =
    rect.height *
      (parseFloat(thread.tracking.yPercentageFromSelectedElement) / 100) +
    rect.top +
    window.scrollY;
  thread.tracking.liveCoords = { x, y };
  return thread;
}
