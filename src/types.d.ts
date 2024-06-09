// Extend window object

import { GLOBAL_CONST_VARIABLES } from "./types/const";

declare global {
  interface Window {
    LIVE_FEEDBACK?: {
      [GLOBAL_CONST_VARIABLES.REPO]?: string;
      [GLOBAL_CONST_VARIABLES.OWNER]?: string;
    };
  }
}
