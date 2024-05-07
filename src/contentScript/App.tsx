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
