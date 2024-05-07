import { useEffect, useMemo } from "react";
import Navbar from "./ui/Navbar";
import useGithubStore from "./store/threads";
import ThreadBubbles from "./ui/ThreadBubbles";
import TemporalThreadBubble from "./ui/TemporalThreadBubble";
import { GlobalStyles, ResetCSS } from "./styles/tokens";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
function RegisterEvents() {
  const { populateThreads, checkThreadsVisibility, updateThreadCoords } =
    useGithubStore((state) => ({
      populateThreads: state.populateThreads,
      checkThreadsVisibility: state.checkThreadsVisibility,
      updateThreadCoords: state.updateThreadCoords,
    }));
  /*
  function handleMouseOver(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
    let targetIsInsideLiveFeedbackWrapper = false;
    let currTarget: HTMLElement | null = target;
    while (currTarget) {
      if (currTarget.id === "live-feedback") {
        targetIsInsideLiveFeedbackWrapper = true;
      }
      currTarget = currTarget.parentElement;
    }
    if (targetIsInsideLiveFeedbackWrapper) return;
    removeAnchorHrefFromAncestors(target, anchorsWithReplacedHrefs);
    target.style.outline = "2px solid red";
  }

  function handleMouseOut(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
    restoreAnchorHrefFromAncestors(anchorsWithReplacedHrefs);
    target.style.outline = "none";
  }

  async function handleMouseClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    target.style.outline = "none";
    if (target.hasAttribute("data-live-feedback-thread-creation")) {
      return setIsPicking(!isPicking);
    }
    if (isPicking) {
      target.style.pointerEvents = "none";
      setIsPicking(false);

      let targetIsInsideLiveFeedbackWrapper = false;
      let currTarget: HTMLElement | null = target;
      while (currTarget) {
        if (currTarget.id === "live-feedback") {
          targetIsInsideLiveFeedbackWrapper = true;
        }
        currTarget = currTarget.parentElement;
      }
      if (targetIsInsideLiveFeedbackWrapper) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      setTempThreadCreationIntent({
        target,
        x: e.pageX,
        y: e.pageY,
      });
      restoreAnchorHrefFromAncestors(anchorsWithReplacedHrefs);

      target.style.pointerEvents = "all";
    }
  }
*/
  function handleStorageChange(
    changes: { [key: string]: chrome.storage.StorageChange },
    areaName: "local" | "sync" | "managed" | "session"
  ) {
    if (areaName !== "local") return;
    if (
      changes.gh_token?.newValue ||
      changes.repo?.newValue ||
      changes.owner?.newValue
    ) {
      populateThreads();
    }
  }

  useEffect(() => {
    populateThreads();
    chrome.storage.onChanged.addListener(handleStorageChange);
    window.addEventListener("resize", updateThreadCoords);
    updateThreadCoords();
    const interval = setInterval(checkThreadsVisibility, 1000);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
      window.removeEventListener("resize", updateThreadCoords);
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   window.addEventListener("mouseover", handleMouseOver);
  //   window.addEventListener("mouseout", handleMouseOut);
  //   window.addEventListener("click", handleMouseClick);
  //   return () => {
  //     window.removeEventListener("mouseover", handleMouseOver);
  //     window.removeEventListener("mouseout", handleMouseOut);
  //     window.removeEventListener("click", handleMouseClick);
  //   };
  // }, [isPicking]);

  return null;
}

function App({ shadowRoot }: { shadowRoot: ShadowRoot }) {
  const { isPicking, setTempThreadCreationIntent, setIsPicking } =
    useGithubStore((state) => ({
      isPicking: state.isPicking,
      setTempThreadCreationIntent: state.setTempThreadCreationIntent,
      setIsPicking: state.setIsPicking,
    }));
  const cache = useMemo(
    () =>
      createCache({
        key: "livfeeb", // Work
        container: shadowRoot || document.head,
        prepend: true,
      }),
    []
  );
  return (
    <CacheProvider value={cache}>
      <ResetCSS
        id="live-feedback-styles-wrapper"
        data-is-picking={isPicking}
        onClick={(e) => {
          if (!isPicking) return;
          setIsPicking(false);
          const target = document
            .elementsFromPoint(e.clientX, e.clientY)
            .filter((el) => el.id !== "live-feedback")[0];
          console.log("click", target);
          if (target) {
            setTempThreadCreationIntent({
              target: target as HTMLElement,
              x: e.pageX,
              y: e.pageY,
            });
          }
        }}
      >
        <GlobalStyles />
        <RegisterEvents />
        <Navbar />
        <TemporalThreadBubble />
        <ThreadBubbles />
      </ResetCSS>
    </CacheProvider>
  );
}

export default App;
