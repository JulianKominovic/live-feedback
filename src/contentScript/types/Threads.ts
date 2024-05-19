export type ThreadTargetType = "ELEMENT" | "TEXT_RANGE";
type ThreadTrackingForElement = {
  selectors: string[] | string;
  // textContentHash: string;
  // outerHTMLHash: string;
  // To identify if element is visible or not
  attributes: {
    display: string;
    visibility: string;
    opacity: string;
    hidden: string | null;
    "aria-hidden": string | null;
    "aria-expanded": string | null;
  };
  type: "ELEMENT"; // ThreadTargetType;
  show?: boolean;
  xPercentageFromSelectedElement: string;
  yPercentageFromSelectedElement: string;
  liveCoords?: {
    x: number;
    y: number;
  };
  url: string;
};
type ThreadTrackingForTextRange = {
  // Common ancestor element css selectors
  selectors: string[];
  // To identify if common ancestor element is visible or not
  attributes: {
    display: string;
    visibility: string;
    opacity: string;
    hidden: string | null;
    "aria-hidden": string | null;
    "aria-expanded": string | null;
  };
  type: "TEXT_RANGE"; // ThreadTargetType;
  show?: boolean;
  selectedTextRange: {
    start: number;
    end: number;
    startNode: {
      /*
        High chances that startNode is a text node. 
        So we must have cssSelectors for startNode parent element. (100% sure it's an HTMLElement)
        And save the children index of startNode
      */
      cssSelectors?: string[];
      childrenIndex?: number;
    };
    endNode: {
      /*
        High chances that endNode is a text node. 
        So we must have cssSelectors for endNode parent element. (100% sure it's an HTMLElement)
        And save the children index of endNode
      */
      cssSelectors?: string[];
      childrenIndex?: number;
    };
  };
  liveCoords?: {
    x: number;
    y: number;
    clientRects: DOMRectList;
  };
  url: string;
};
export type ThreadInternalProps =
  | ThreadTrackingForElement
  | ThreadTrackingForTextRange;
export type ThreadComment = {
  body?: string;
  user?: {
    avatar?: string | null;
    name?: string | null;
  };
  date?: string;
};
export type Thread = {
  GHissueId?: string;
  creator?: {
    name?: string;
    avatar?: string;
  };
  status: "OPEN" | "CLOSED";
  title: string;
  // ISO date
  date: string;
  comments?: (ThreadComment | undefined)[];
  tracking: ThreadInternalProps;
};
