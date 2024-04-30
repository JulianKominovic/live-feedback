import { GH_OWNER, GH_REPO } from "../../const";
import octokit from "./client";

export function getIssue({ issue_number }: { issue_number: number }) {
  try {
    return octokit().request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        issue_number,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function createIssue({ body, title }: { body: string; title: string }) {
  try {
    return octokit().request("POST /repos/{owner}/{repo}/issues", {
      owner: GH_OWNER(),
      repo: GH_REPO(),
      title,
      body,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function updateIssue({
  body,
  issue_number,
  title,
}: {
  body: string;
  issue_number: number;
  title: string;
}) {
  try {
    return octokit().request(
      "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        title,
        issue_number,
        body,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function getIssues() {
  try {
    return octokit().request("GET /repos/{owner}/{repo}/issues", {
      owner: GH_OWNER(),
      repo: GH_REPO(),
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function getIssueComments({ issue_number }: { issue_number: number }) {
  try {
    return octokit().request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        issue_number,
        mediaType: {
          format: "html",
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function createIssueComment({
  body,
  issue_number,
}: {
  body: string;
  issue_number: number;
}) {
  try {
    return octokit().request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        issue_number,
        body,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}
