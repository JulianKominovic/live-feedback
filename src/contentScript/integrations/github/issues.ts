import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import { log } from "../../utils";
import octokit, { fetchCache } from "./client";

export async function getIssue({ issue_number }: { issue_number: number }) {
  useSystemStore.getState().addTask({
    id: `issue-${issue_number}`,
    title: `Fetching issue #${issue_number}`,
  });

  try {
    const response = await octokit().request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        issue_number,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        request: {
          fetch: fetchCache,
        },
      }
    );
    useSystemStore.getState().updateTaskStatus({
      id: `issue-${issue_number}`,
      title: `Fetched issue #${issue_number}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().updateTaskStatus({
      id: `issue-${issue_number}`,
      title: `Error fetching issue #${issue_number}`,
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
    const response = await octokit().request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        title,
        body,

        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    useSystemStore.getState().updateTaskStatus({
      id: "create-issue-" + title,
      title: `Issue created ${title}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().updateTaskStatus({
      id: "create-issue-" + title,
      title: `Error creating issue ${title}`,
      status: "error",
    });

    return null;
  }
}

export async function updateIssue({
  body,
  issue_number,
  title,
}: {
  body: string;
  issue_number: number;
  title: string;
}) {
  useSystemStore.getState().addTask({
    id: `update-issue-${issue_number}`,
    title: `Updating issue #${issue_number}`,
  });

  try {
    const response = await octokit().request(
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
    useSystemStore.getState().updateTaskStatus({
      id: `update-issue-${issue_number}`,
      title: `Updated issue #${issue_number}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
    useSystemStore.getState().updateTaskStatus({
      id: `update-issue-${issue_number}`,
      title: `Error updating issue #${issue_number}`,
      status: "error",
    });

    return null;
  }
}

export async function getIssues() {
  useSystemStore.getState().addTask({
    id: "get-issues",
    title: `Fetching issues`,
  });

  try {
    const response = await octokit().request(
      "GET /repos/{owner}/{repo}/issues",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        state: "open",
        request: {
          fetch: fetchCache,
        },
      }
    );
    useSystemStore.getState().updateTaskStatus({
      id: "get-issues",
      title: `Fetched issues`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);
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
    const response = await octokit().request(
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
        request: {
          fetch: fetchCache,
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
    const response = await octokit().request(
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

    useSystemStore.getState().updateTaskStatus({
      id: `create-issue-comment-${issue_number}`,
      title: `Comment created for issue #${issue_number}`,
      status: "success",
    });

    return response;
  } catch (err) {
    log(err);

    useSystemStore.getState().updateTaskStatus({
      id: `create-issue-comment-${issue_number}`,
      title: `Error creating comment for issue #${issue_number}`,
      status: "error",
    });

    return null;
  }
}
