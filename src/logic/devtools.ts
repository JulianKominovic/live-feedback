import { BrokenResources } from "../types/Devtoolts";

export async function searchBrokenResources() {
  const links = document.querySelectorAll("a");
  const imgs = document.querySelectorAll("img");
  const videos = document.querySelectorAll("video");
  const iframes = document.querySelectorAll("iframe");
  const audios = document.querySelectorAll("audio");
  const scripts = document.querySelectorAll("script");
  const styles = document.querySelectorAll("link[rel=stylesheet]");

  const resources = new Map<string, HTMLElement>();

  new Set([
    ...links,
    ...imgs,
    ...videos,
    ...iframes,
    ...audios,
    ...scripts,
    ...styles,
  ]).forEach((element: any) => {
    const src = element.href || element.src;
    resources.set(src, element);
  });
  const brokenResources: BrokenResources[] = [];
  const promises = [];

  for (const [src, element] of resources) {
    promises.push(
      fetch(src, {
        method: "HEAD",
      })
        .then((response) => {
          if (!response.ok) {
            brokenResources.push({
              url: src,
              statusCode: response.status.toString(),
              type: element.tagName as
                | "VIDEO"
                | "AUDIO"
                | "IMG"
                | "IFRAME"
                | "A",
              element,
            });
          }
        })
        .catch(() => {
          brokenResources.push({
            element,
            url: src,
            statusCode: "CORS",
            type: element.tagName as "VIDEO" | "AUDIO" | "IMG" | "IFRAME" | "A",
          });
        })
    );
  }
  await Promise.allSettled(promises);
  return brokenResources;
}
