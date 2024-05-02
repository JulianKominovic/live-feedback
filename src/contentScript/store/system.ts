import { create } from "zustand";

export type SystemType = {
  asyncOperationsStatus: "idle" | "pending" | "success" | "error";
  setAsyncOperationsStatus: (
    status: SystemType["asyncOperationsStatus"]
  ) => void;
};

const useSystemStore = create<SystemType>((set, get) => ({
  asyncOperationsStatus: "idle",
  setAsyncOperationsStatus: (status) => {
    if (status === "error" || status === "success") {
      setTimeout(() => {
        set({ asyncOperationsStatus: "idle" });
      }, 3000);
    }
    set({ asyncOperationsStatus: status });
  },
}));

export default useSystemStore;
