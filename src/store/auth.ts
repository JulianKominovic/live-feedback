import { create } from "zustand";
import { GH_TOKEN_COOKIE_KEY } from "../const";
import Cookies from "js-cookie";
import { getUserInstallations } from "../integrations/github/get-installed-apps";

export type AuthStore = {
  getToken: () => Promise<string>;
  createToken: () => Promise<string>;
  isAuthed: boolean;
};

const useAuthStore = create<AuthStore>((set, get) => ({
  async getToken() {
    if (Cookies.get(GH_TOKEN_COOKIE_KEY) === undefined) {
      return await get().createToken();
    }
    return Cookies.get(GH_TOKEN_COOKIE_KEY) as string;
  },
  isAuthed: Cookies.get(GH_TOKEN_COOKIE_KEY) !== undefined,
  createToken() {
    return new Promise((resolve) => {
      const state = Math.random().toString(36);
      const createdWindow = window.open(
        "http://localhost:4000/get-token?state=" + state,
        "_blank",
        "width=800,height=600"
      );
      const handleAuthComplete = async (e: MessageEvent) => {
        if (e.data.type === `LIVE_FEEDBACK_AUTH_COMPLETE_${state}`) {
          Cookies.set(GH_TOKEN_COOKIE_KEY, e.data.token, {
            expires: new Date(e.data.tokenExpiresAt),
          });
          createdWindow?.close();
          const userInstallations = await getUserInstallations();
          if (userInstallations) {
            const { data } = userInstallations;
            if (data.total_count === 0) {
              window.open(
                "https://github.com/apps/live-feedback/installations/new",
                "_blank",
                "width=800,height=600"
              );
            }
          }
          window.removeEventListener("message", handleAuthComplete);
          set({ isAuthed: true });
          resolve(e.data.token);
        }
      };
      window.addEventListener("message", handleAuthComplete);
    });
  },
}));

export default useAuthStore;
