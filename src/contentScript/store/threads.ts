import { create } from "zustand";
import { Thread } from "../types/Threads";
import {
  calculateBubblePosition,
  checkThreadsBubbles,
  createThread,
  getThreads,
} from "../logic/threads";
import { addComment, getComments } from "../logic/github";

export type ThreadsStore = {
  // Threads
  threads: Thread[];
  setThreads: (threads: Thread[]) => void;
  populateThreads: () => void;
  populateThreadComments: (thread: Thread) => void;
  createThread: (comment: string) => Promise<void>;
  checkThreadsVisibility: () => void;
  createThreadComment: (thread: Thread, comment: string) => Promise<void>;
  updateThreadCoords: () => Thread[];
  // Temporal creation threads
  tempThreadCreationIntent: {
    x: number;
    y: number;
    target: HTMLElement;
  } | null;
  setTempThreadCreationIntent: (
    intent: { x: number; y: number; target: HTMLElement } | null
  ) => void;
  isPicking: boolean;
  setIsPicking: (isPicking: boolean) => void;
};

const useThreadsStore = create<ThreadsStore>((set, get) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
  populateThreads: async () => {
    const threads = await getThreads();
    const updatedThreads = threads.map(calculateBubblePosition);
    set({ threads: updatedThreads });
  },
  populateThreadComments: async (thread: Thread) => {
    const threadWithComments = await getComments(thread);
    set({
      threads: get().threads.map((t) =>
        t.GHissueId === thread.GHissueId ? threadWithComments : t
      ),
    });
  },
  createThreadComment: async (thread: Thread, comment: string) => {
    return await addComment(thread, comment).then((updatedThread) => {
      set({
        threads: get().threads.map((t) =>
          t.GHissueId === updatedThread.GHissueId ? updatedThread : t
        ),
      });
    });
  },
  updateThreadCoords: () => {
    const updatedThreads = get().threads.map(calculateBubblePosition);
    set({ threads: updatedThreads });
    return updatedThreads;
  },
  checkThreadsVisibility: () => {
    set({
      threads: checkThreadsBubbles(get().threads),
    });
  },
  createThread: async (comment) => {
    if (!get().tempThreadCreationIntent) return;
    console.log("Creating new thread", comment);
    const tempThreadBubble = get().tempThreadCreationIntent!;
    return await createThread(
      comment,
      tempThreadBubble?.target,
      tempThreadBubble?.x,
      tempThreadBubble?.y
    )
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
