import { useEffect, useMemo } from "react";
import Navbar from "./ui/Navbar";
import useThreadsStore from "./store/threads";
import ThreadBubbles from "./ui/ThreadBubbles";
import TemporalThreadBubble from "./ui/TemporalThreadBubble";
import { GlobalStyles, LiveFeedbackGlobalStyles, ResetCSS } from "./styles";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import ThreadSelectionRange from "./ui/ThreadSelectionRange";
import { TRACKING_INTERVAL } from "./const";
import { focusThreadIfUrlMatches } from "./logic/threads";
import Cmdk from "./ui/command-menu/CommandMenu";
import ThreadsPanel from "./ui/ThreadsPanel";

function RegisterEvents() {
  const populateThreads = useThreadsStore((state) => state.populateThreads);
  const checkThreadsVisibility = useThreadsStore(
    (state) => state.checkThreadsVisibility
  );
  const updateThreadCoords = useThreadsStore(
    (state) => state.updateThreadCoords
  );
  const threads = useThreadsStore((state) => state.threads);

  useEffect(() => {
    focusThreadIfUrlMatches(threads);
  }, [threads, window.location]);

  useEffect(() => {
    populateThreads();
    window.addEventListener("resize", updateThreadCoords);
    updateThreadCoords();
    focusThreadIfUrlMatches(threads);
    const interval = setInterval(checkThreadsVisibility, TRACKING_INTERVAL);
    return () => {
      window.removeEventListener("resize", updateThreadCoords);
      clearInterval(interval);
    };
  }, []);

  return null;
}

function App({ shadowRoot }: { shadowRoot: ShadowRoot }) {
  const isPicking = useThreadsStore((state) => state.isPicking);
  const setTempThreadCreationIntent = useThreadsStore(
    (state) => state.setTempThreadCreationIntent
  );
  const setIsPicking = useThreadsStore((state) => state.setIsPicking);

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
    <>
      <GlobalStyles />
      <CacheProvider value={cache}>
        <ResetCSS
          id="live-feedback-styles-wrapper"
          data-is-picking={isPicking}
          onClick={(e) => {
            if (!isPicking) return;
            setIsPicking(false);
            const elementsFromPoint = document.elementsFromPoint(
              e.clientX,
              e.clientY
            );
            const target = elementsFromPoint.filter(
              (el) => el.id !== "live-feedback"
            )[0];
            if (target) {
              setTempThreadCreationIntent({
                target: target as HTMLElement,
                type: "ELEMENT",
                x: e.pageX,
                y: e.pageY,
              });
            }
          }}
        >
          <LiveFeedbackGlobalStyles />
          <RegisterEvents />
          <TemporalThreadBubble />
          <ThreadBubbles />
          <ThreadSelectionRange />
          <ThreadsPanel />
          <Navbar />
          <Cmdk shadowRoot={shadowRoot} />
        </ResetCSS>
      </CacheProvider>
    </>
  );
}

export default App;
