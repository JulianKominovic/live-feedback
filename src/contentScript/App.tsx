import { useEffect } from "react";
import Navbar from "./ui/Navbar";
import useGithubStore from "./store/threads";
import ThreadBubbles from "./ui/ThreadBubbles";
import TemporalThreadBubble from "./ui/TemporalThreadBubble";
import { GlobalStyles, ResetCSS } from "./styles/tokens";

function RegisterEvents() {
  const {
    isPicking,
    setIsPicking,
    setTempThreadCreationIntent,
    populateThreads,
    checkThreadsVisibility,
    updateThreadCoords,
  } = useGithubStore((state) => ({
    isPicking: state.isPicking,
    setIsPicking: state.setIsPicking,
    setTempThreadCreationIntent: state.setTempThreadCreationIntent,
    populateThreads: state.populateThreads,
    checkThreadsVisibility: state.checkThreadsVisibility,
    updateThreadCoords: state.updateThreadCoords,
  }));
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
    target.style.outline = "2px solid red";
  }

  function handleMouseOut(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
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
      target.style.pointerEvents = "all";
    }
  }

  function handleStorageChange(
    changes: { [key: string]: chrome.storage.StorageChange },
    areaName: "local" | "sync" | "managed" | "session",
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
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
      window.removeEventListener("resize", updateThreadCoords);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(checkThreadsVisibility, 1000);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseClick);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseClick);
      clearInterval(interval);
    };
  }, [isPicking]);

  return null;
}

function App() {
  return (
    <ResetCSS>
      <GlobalStyles />
      <RegisterEvents />
      <Navbar />
      <TemporalThreadBubble />
      <ThreadBubbles />
    </ResetCSS>
  );
}

export default App;