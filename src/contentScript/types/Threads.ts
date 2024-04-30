export type ThreadInternalProps = {
  selector: string;
  textContentHash: string;
  outerHTMLHash: string;
  // To identify if element is visible or not
  attributes: {
    display: string;
    visibility: string;
    opacity: string;
    hidden: string | null;
    "aria-hidden": string | null;
    "aria-expanded": string | null;
  };
  show?: boolean;
  xPercentageFromSelectedElement: string;
  yPercentageFromSelectedElement: string;
  url: string;
};
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
  title: string;
  // ISO date
  date: string;
  comments?: (ThreadComment | undefined)[];
  tracking: ThreadInternalProps;
};
