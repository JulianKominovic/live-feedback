import { Action } from "kbar";

export type BrokenResources = {
  url: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  statusCode: "CORS" | (string & {});
  type: "VIDEO" | "AUDIO" | "IMG" | "IFRAME" | "A";
  element: HTMLElement;
};

export type CommandMenuAction = Omit<Action, "name"> & {
  name: React.ReactNode | Element;
  mainActionLabel?: string;
};
