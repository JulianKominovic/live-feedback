import { Octokit } from "@octokit/core";
import { GH_TOKEN } from "../../const";

function octokit() {
  return new Octokit({
    auth: GH_TOKEN(),
  });
}

// 5 minutes
const CACHE_VALIDITY = 5 * 60 * 1000;
const GITHUB_CACHE_CHROME_STORAGE_KEY = "gh-cache";

export const getGithubCacheByUrl = async (url: string) => {
  const { [GITHUB_CACHE_CHROME_STORAGE_KEY]: localData = {} } =
    await chrome.storage.local.get([GITHUB_CACHE_CHROME_STORAGE_KEY]);
  return localData[url] || {};
};

export const clearGithubCache = async () => {
  chrome.storage.local.remove(GITHUB_CACHE_CHROME_STORAGE_KEY);
};

const setGithubCache = async (url: string, data: any) => {
  chrome.storage.local.set({
    [GITHUB_CACHE_CHROME_STORAGE_KEY]: {
      ...(await getGithubCacheByUrl(url)),
      [url]: { data, validUntil: Date.now() + CACHE_VALIDITY },
    },
  });
};

export const fetchCache = async (url: string, requestInit: RequestInit) => {
  const { data, validUntil } = await getGithubCacheByUrl(url);
  console.log({
    data,
    validUntil,
    now: Date.now(),
    diff: validUntil - Date.now(),
  });
  if (validUntil && validUntil > Date.now()) {
    const mockedResponse = new Response(
      new Blob([JSON.stringify(data)], { type: "application/json" }),
      requestInit
    );
    return mockedResponse;
  }

  const response = await fetch(url, requestInit);
  if (response.ok) {
    const clonedResponse = response.clone();
    const data = await clonedResponse.json();
    await setGithubCache(url, data);
    return response;
  }
  return response;
};

export default octokit;
