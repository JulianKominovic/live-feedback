import { useEffect, useMemo } from "react";
import Navbar from "./ui/Navbar";
import useGithubStore from "./store/threads";
import ThreadBubbles from "./ui/ThreadBubbles";
import TemporalThreadBubble from "./ui/TemporalThreadBubble";
import { GlobalStyles, ResetCSS } from "./styles/tokens";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import ThreadSelectionRange from "./ui/ThreadSelectionRange";
import { TRACKING_INTERVAL } from "./const";
import { focusThreadIfUrlMatches } from "./logic/threads";
function RegisterEvents() {
  const {
    populateThreads,
    checkThreadsVisibility,
    updateThreadCoords,
    threads,
  } = useGithubStore((state) => ({
    populateThreads: state.populateThreads,
    checkThreadsVisibility: state.checkThreadsVisibility,
    updateThreadCoords: state.updateThreadCoords,
    threads: state.threads,
  }));

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
        <GlobalStyles />
        <RegisterEvents />
        <Navbar />
        <TemporalThreadBubble />
        <ThreadBubbles />
        <ThreadSelectionRange />
      </ResetCSS>
    </CacheProvider>
  );
}

export default App;
