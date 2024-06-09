import { create } from "zustand";
import { GH_TOKEN_COOKIE_KEY } from "../const";
import Cookies from "js-cookie";

export type AuthStore = {
  token: string;
  setToken: (token: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: Cookies.get(GH_TOKEN_COOKIE_KEY) || "",
  setToken: (token) => {
    Cookies.set(GH_TOKEN_COOKIE_KEY, token, { expires: 7 });
    set({ token });
  },
}));

export default useAuthStore;
