import { create } from "zustand";

type UIStore = {
  isThreadListOpen: boolean;
  setIsThreadListOpen: (isOpen: boolean) => void;
  isCmdkOpen: boolean;
  setIsCmdkOpen: (isOpen: boolean) => void;
};

const useUIStore = create<UIStore>((set) => ({
  isThreadListOpen: false,
  setIsThreadListOpen: (isOpen: boolean) => set({ isThreadListOpen: isOpen }),
  isCmdkOpen: false,
  setIsCmdkOpen: (isOpen: boolean) => set({ isCmdkOpen: isOpen }),
}));

export default useUIStore;
