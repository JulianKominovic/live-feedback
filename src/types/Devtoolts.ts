export type BrokenResources = {
  url: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  statusCode: "CORS" | (string & {});
  type: "VIDEO" | "AUDIO" | "IMG" | "IFRAME" | "A";
};
