import octokit from "./client";

export function getIssue({
  issue_number,
  repo,
  owner,
}: {
  issue_number: number;
  repo: string;
  owner: string;
}) {
  return octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner,
    repo,
    issue_number,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export function createIssue({
  body,
  title,
  repo,
  owner,
}: {
  body: string;
  title: string;
  repo: string;
  owner: string;
}) {
  return octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    title,
    body,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export function updateIssue({
  body,
  issue_number,
  title,
  repo,
  owner,
}: {
  body: string;
  issue_number: number;
  title: string;
  repo: string;
  owner: string;
}) {
  return octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    owner,
    repo,
    title,
    issue_number,
    body,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export function getIssues({ owner, repo }: { owner: string; repo: string }) {
  return octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export function getIssueComments({
  issue_number,
  repo,
  owner,
}: {
  issue_number: number;
  repo: string;
  owner: string;
}) {
  return octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner,
      repo,
      issue_number,
      mediaType: {
        format: "html",
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}

export function createIssueComment({
  body,
  issue_number,
  repo,
  owner,
}: {
  body: string;
  issue_number: number;
  repo: string;
  owner: string;
}) {
  return octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner,
      repo,
      issue_number,
      body,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}
