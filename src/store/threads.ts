import { create } from "zustand";
import { Thread } from "../types/Threads";
import {
  calculateBubblePosition,
  checkThreadsBubbles,
  createThreadOnElement,
  createThreadOnTextRange,
  getThreads,
} from "../logic/threads";
import { addComment, getComments } from "../logic/github";
import { log } from "../utils";
import { closeIssue } from "../integrations/github/issues";

export type ThreadsStore = {
  // Threads
  threads: Thread[];
  setThreads: (threads: Thread[]) => void;
  populateThreads: () => void;
  populateThreadComments: (thread: Thread) => void;
  createThread: (comment: string, bindedPullRequestId: number) => Promise<void>;
  closeThread: (thread: Thread) => void;
  checkThreadsVisibility: () => void;
  createThreadComment: (thread: Thread, comment: string) => Promise<void>;
  updateThreadCoords: () => Thread[];
  // Temporal creation threads
  tempThreadCreationIntent:
    | {
        x: number;
        y: number;
        target: HTMLElement;
        type: "ELEMENT";
      }
    | {
        commonAncestor: HTMLElement;
        start: number;
        end: number;
        startNode: Node;
        endNode: Node;
        type: "TEXT_RANGE";
      }
    | null;
  setTempThreadCreationIntent: (
    intent: ThreadsStore["tempThreadCreationIntent"]
  ) => void;
  isPicking: boolean;
  isLoading: boolean;
  setIsPicking: (isPicking: boolean) => void;
};

const useThreadsStore = create<ThreadsStore>((set, get) => ({
  isLoading: false,
  threads: [],
  setThreads: (threads) => set({ threads }),
  populateThreads: async () => {
    set({ isLoading: true });
    const threads = await getThreads();
    const updatedThreads = threads.map(calculateBubblePosition);
    set({ threads: updatedThreads, isLoading: false });
  },
  populateThreadComments: async (thread: Thread) => {
    set({ isLoading: true });
    const threadWithComments = await getComments(thread);
    set({
      threads: get().threads.map((t) =>
        t.GHissueId === thread.GHissueId ? threadWithComments : t
      ),
      isLoading: false,
    });
  },
  createThreadComment: async (thread: Thread, comment: string) => {
    set({ isLoading: true });
    return await addComment(thread, comment).then((updatedThread) => {
      set({
        threads: get().threads.map((t) =>
          t.GHissueId === updatedThread.GHissueId ? updatedThread : t
        ),
        isLoading: false,
      });
    });
  },
  updateThreadCoords: () => {
    const updatedThreads = get().threads.map(calculateBubblePosition);
    set({ threads: updatedThreads });
    return updatedThreads;
  },
  checkThreadsVisibility: () => {
    if (get().isPicking)
      return set({
        threads: get().threads.map((thread) => {
          thread.tracking.show = false;
          return thread;
        }),
      });
    const updatedThreads = checkThreadsBubbles(get().threads).map(
      calculateBubblePosition
    );
    set({ threads: updatedThreads });
  },
  closeThread: async (thread) => {
    set({ isLoading: true });
    await closeIssue({
      issue_number: parseInt(thread.GHissueId as string, 10),
    });
    set({
      threads: get().threads.filter((t) => t.GHissueId !== thread.GHissueId),
      isLoading: false,
    });
  },
  createThread: async (comment, bindedPullRequestId) => {
    if (!get().tempThreadCreationIntent) return;
    log("Creating new thread", comment);
    const tempThreadBubble = get().tempThreadCreationIntent!;
    const creationJob =
      tempThreadBubble.type === "ELEMENT"
        ? createThreadOnElement({
            title: comment,
            element: tempThreadBubble.target,
            clickXCoord: tempThreadBubble.x,
            clickYCoord: tempThreadBubble.y,
            bindedPullRequestId,
          })
        : createThreadOnTextRange({
            title: comment,
            commonAncestor: tempThreadBubble.commonAncestor,
            start: tempThreadBubble.start,
            end: tempThreadBubble.end,
            startNode: tempThreadBubble.startNode,
            endNode: tempThreadBubble.endNode,
            bindedPullRequestId,
          });
    return await creationJob
      .then((createdThread) => {
        if (createdThread) {
          const updatedThreads = [...get().threads, createdThread].map(
            calculateBubblePosition
          );
          set({ threads: updatedThreads });
        } else alert("Thread creation failed");
      })
      .finally(() => {
        set({
          isLoading: false,
          isPicking: false,
          tempThreadCreationIntent: null,
        });
      });
  },
  tempThreadCreationIntent: null,
  setTempThreadCreationIntent: (intent) =>
    set({ tempThreadCreationIntent: intent }),
  isPicking: false,
  setIsPicking: (isPicking) => set({ isPicking }),
}));

export default useThreadsStore;
