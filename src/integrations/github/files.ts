import octokit from "./client";

export function uploadFile({
  fileContent,
  repo,
  path,
  owner,
}: {
  fileContent: string;
  repo: string;
  path: string;
  owner: string;
}) {
  return octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path,
    message: `Created file ${path}`,
    content: fileContent,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
