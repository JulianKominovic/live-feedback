import { useEffect, useRef, useState } from "react";
import Navbar from "./ui/Navbar";
import { Thread, ThreadInternalProps } from "./types/Threads";
import ThreadBubble from "./ui/ThreadBubble";
import { checkThreadsBubbles, createThread, getThreads } from "./logic/threads";
import TemporalThreadBubble from "./ui/TemporalThreadBubble";
import { addComment, getComments } from "./logic/github";

function App() {
  const [isPicking, setIsPicking] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [tempThreadCreationIntent, setTempThreadCreationIntent] = useState<
    (Pick<ThreadInternalProps, "x" | "y"> & { target: HTMLElement }) | null
  >(null);
  const temporalThreadBubble = useRef<HTMLButtonElement>(null);

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
  function handleMouseMove(e: MouseEvent) {
    if (!isPicking) return;
    const mouseY = e.pageY;
    const mouseX = e.pageX;

    document.body.style.cursor = "hidden";
    (temporalThreadBubble.current as HTMLButtonElement).style.display = "block";
    (temporalThreadBubble.current as HTMLButtonElement).style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }

  async function handleMouseClick(e: MouseEvent) {
    if (!isPicking) return;
    const target = e.target as HTMLElement;
    console.log("CLICKED", target);
    target.style.outline = "none";
    const tempThreadBubble = temporalThreadBubble.current as HTMLButtonElement;
    tempThreadBubble.style.display = "none";
    console.log("STOPPING PICKING");
    setIsPicking(false);

    setTempThreadCreationIntent({
      target,
      x: e.pageX,
      y: e.pageY,
    });
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  async function loadComments(thread: Thread) {
    const threadWithComments = await getComments(thread);
    setThreads((prev) =>
      prev.map((t) =>
        t.GHissueId === thread.GHissueId ? threadWithComments : t
      )
    );
  }

  async function createComment(thread: Thread, comment: string) {
    addComment(thread, comment).then((updatedThread) => {
      setThreads((prev) =>
        prev.map((t) =>
          t.GHissueId === updatedThread.GHissueId ? updatedThread : t
        )
      );
    });
  }

  async function createNewThread(comment: string) {
    console.log("Creating new thread", comment);

    if (!tempThreadCreationIntent) return;
    setTempThreadCreationIntent(null);
    createThread(
      comment,
      tempThreadCreationIntent?.target,
      tempThreadCreationIntent?.x,
      tempThreadCreationIntent?.y
    )
      .then((createdThread) => {
        if (createdThread) setThreads((prev) => [...prev, createdThread]);
        else alert("Thread creation failed");
      })
      .finally(() => {
        setTempThreadCreationIntent(null);
        setIsPicking(false);
        (temporalThreadBubble.current as HTMLButtonElement).style.display =
          "none";
        (temporalThreadBubble.current as HTMLButtonElement).style.top = "0px";
        (temporalThreadBubble.current as HTMLButtonElement).style.left = "0px";
      });
  }

  useEffect(() => {
    getThreads().then((threads) => setThreads(threads));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreads((prev) => checkThreadsBubbles(prev));
    }, 1000);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [isPicking]);

  return (
    <>
      <Navbar setIsPicking={setIsPicking} isPicking={isPicking} />
      <TemporalThreadBubble
        x={tempThreadCreationIntent?.x}
        y={tempThreadCreationIntent?.y}
        createThread={(comment) => createNewThread(comment)}
        isCreatingThreadPromptOpen={tempThreadCreationIntent !== null}
        setIsCreatingThreadPromptOpen={(isOpen) =>
          isOpen
            ? setTempThreadCreationIntent(tempThreadCreationIntent)
            : setTempThreadCreationIntent(null)
        }
        ref={temporalThreadBubble}
      />
      {isPicking === false &&
        tempThreadCreationIntent === null &&
        threads.map((thread) => (
          <ThreadBubble
            key={thread.GHissueId}
            thread={thread}
            loadComments={() => loadComments(thread)}
            addComment={(comment) => createComment(thread, comment)}
          />
        ))}
    </>
  );
}

export default App;
