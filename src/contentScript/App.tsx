import { useEffect } from "react";
import Navbar from "./ui/Navbar";
import useGithubStore from "./store/threads";
import ThreadBubbles from "./ui/ThreadBubbles";
import TemporalThreadBubble from "./ui/TemporalThreadBubble";

function RegisterEvents() {
  const {
    isPicking,
    setIsPicking,
    setTempThreadCreationIntent,
    populateThreads,
    checkThreadsVisibility,
  } = useGithubStore((state) => ({
    isPicking: state.isPicking,
    setIsPicking: state.setIsPicking,
    setTempThreadCreationIntent: state.setTempThreadCreationIntent,
    populateThreads: state.populateThreads,
    checkThreadsVisibility: state.checkThreadsVisibility,
  }));
  function handleMouseOver(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
    target.style.outline = "2px solid red";
  }

  function handleMouseOut(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
    target.style.outline = "none";
  }

  async function handleMouseClick(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
    target.style.outline = "none";
    // const tempThreadBubble = temporalThreadBubble.current as HTMLButtonElement;
    // tempThreadBubble.style.display = "none";
    setIsPicking(false);
    console.log({
      target,
      x: e.pageX,
      y: e.pageY,
    });

    setTempThreadCreationIntent({
      target,
      x: e.pageX,
      y: e.pageY,
    });
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

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
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(checkThreadsVisibility, 1000);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseClick);
    // window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseClick);
      // window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [isPicking]);

  return null;
}

function App() {
  return (
    <>
      <RegisterEvents />
      <Navbar />
      <TemporalThreadBubble />
      <ThreadBubbles />
    </>
  );
}

export default App;
