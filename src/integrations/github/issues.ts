import { RequestError } from "octokit";
import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import { checkAuthError } from "./auth-error-msg";
import octokit from "./client";

export async function closeIssue({ issue_number }: { issue_number: number }) {
  useSystemStore.getState().addTask({
    id: `close-issue-${issue_number}`,
    title: `Closing issue #${issue_number}`,
  });

  try {
    const client = await octokit();
    const response = await client.request(
      "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: GH_OWNER,
        repo: GH_REPO,
        issue_number,
        state: "closed",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    useSystemStore.getState().updateTaskStatus({
      id: `close-issue-${issue_number}`,
      title: `Closed issue #${issue_number}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }
    useSystemStore.getState().updateTaskStatus({
      id: `close-issue-${issue_number}`,
      title: `Error closing issue #${issue_number}`,
      status: "error",
    });

    return null;
  }
}

export async function createIssue({
  body,
  title,
}: {
  body: string;
  title: string;
}) {
  useSystemStore.getState().addTask({
    id: "create-issue-" + title,
    title: `Creating issue ${title}`,
  });

  try {
    const client = await octokit();
    const response = await client.request("POST /repos/{owner}/{repo}/issues", {
      owner: GH_OWNER,
      repo: GH_REPO,
      title,
      body,

      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    useSystemStore.getState().updateTaskStatus({
      id: "create-issue-" + title,
      title: `Issue created ${title}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }
    useSystemStore.getState().updateTaskStatus({
      id: "create-issue-" + title,
      title: `Error creating issue ${title}`,
      status: "error",
    });

    return null;
  }
}

export async function getIssues(state?: "open" | "closed" | "all") {
  useSystemStore.getState().addTask({
    id: "get-issues",
    title: `Fetching issues`,
  });

  try {
    const client = await octokit();
    const response = await client.request("GET /repos/{owner}/{repo}/issues", {
      owner: GH_OWNER,
      repo: GH_REPO,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      state: state ?? "open",
    });
    useSystemStore.getState().updateTaskStatus({
      id: "get-issues",
      title: `Fetched issues`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }
    useSystemStore.getState().updateTaskStatus({
      id: "get-issues",
      title: `Error fetching issues`,
      status: "error",
    });

    return null;
  }
}

export async function getIssueComments({
  issue_number,
}: {
  issue_number: number;
}) {
  useSystemStore.getState().addTask({
    id: `issue-comments-${issue_number}`,
    title: `Fetching comments for issue #${issue_number}`,
  });

  try {
    const client = await octokit();
    const response = await client.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: GH_OWNER,
        repo: GH_REPO,
        issue_number,
        mediaType: {
          format: "html",
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    useSystemStore.getState().updateTaskStatus({
      id: `issue-comments-${issue_number}`,
      title: `Fetched comments for issue #${issue_number}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }

    useSystemStore.getState().updateTaskStatus({
      id: `issue-comments-${issue_number}`,
      title: `Error fetching comments for issue #${issue_number}`,
      status: "error",
    });

    return null;
  }
}

export async function createIssueComment({
  body,
  issue_number,
}: {
  body: string;
  issue_number: number;
}) {
  useSystemStore.getState().addTask({
    id: `create-issue-comment-${issue_number}`,
    title: `Creating comment for issue #${issue_number}`,
  });

  try {
    const client = await octokit();
    const response = await client.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: GH_OWNER,
        repo: GH_REPO,
        issue_number,
        body,
        headers: {
          // Accept html in response
          accept: "application/vnd.github.v3.html+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    useSystemStore.getState().updateTaskStatus({
      id: `create-issue-comment-${issue_number}`,
      title: `Comment created for issue #${issue_number}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    if (err instanceof RequestError) {
      checkAuthError(err);
    }

    useSystemStore.getState().updateTaskStatus({
      id: `create-issue-comment-${issue_number}`,
      title: `Error creating comment for issue #${issue_number}`,
      status: "error",
    });

    return null;
  }
}
