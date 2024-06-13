import { create } from "zustand";

type UIStore = {
  isThreadListOpen: boolean;
  setIsThreadListOpen: (isOpen: boolean) => void;
};

const useUIStore = create<UIStore>((set) => ({
  isThreadListOpen: false,
  setIsThreadListOpen: (isOpen: boolean) => set({ isThreadListOpen: isOpen }),
}));

export default useUIStore;
