export function removeAnchorHrefFromAncestors(
  e: HTMLElement,
  anchorsWithReplacedHrefs: React.MutableRefObject<HTMLAnchorElement[]>
) {
  let currTarget: HTMLElement | null = e;
  while (currTarget) {
    if (currTarget.tagName === "A") {
      (currTarget as HTMLAnchorElement).setAttribute(
        "live-feedback-temp-href",
        (currTarget as HTMLAnchorElement).href
      );
      (currTarget as HTMLAnchorElement).href = "javascript:void(0);";
      anchorsWithReplacedHrefs.current.push(currTarget as HTMLAnchorElement);
    }
    currTarget = currTarget.parentElement;
  }
}

export function restoreAnchorHrefFromAncestors(
  anchorsWithReplacedHrefs: React.MutableRefObject<HTMLAnchorElement[]>
) {
  anchorsWithReplacedHrefs.current.forEach((anchor) => {
    const href = anchor.getAttribute("live-feedback-temp-href");
    if (href && anchor.href === "javascript:void(0);") {
      anchor.href = href;
    }
  });
  anchorsWithReplacedHrefs.current = [];
}
