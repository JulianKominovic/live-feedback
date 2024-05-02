import { GH_OWNER, GH_REPO } from "../../const";
import useSystemStore from "../../store/system";
import octokit from "./client";

export async function getIssue({ issue_number }: { issue_number: number }) {
  useSystemStore.getState().setAsyncOperationsStatus("pending");

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
      }
    );
    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    console.log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

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
  useSystemStore.getState().setAsyncOperationsStatus("pending");

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
    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    console.log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

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
  useSystemStore.getState().setAsyncOperationsStatus("pending");

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
    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    console.log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

    return null;
  }
}

export async function getIssues() {
  useSystemStore.getState().setAsyncOperationsStatus("pending");

  try {
    const response = await octokit().request(
      "GET /repos/{owner}/{repo}/issues",
      {
        owner: GH_OWNER(),
        repo: GH_REPO(),
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    console.log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

    return null;
  }
}

export async function getIssueComments({
  issue_number,
}: {
  issue_number: number;
}) {
  useSystemStore.getState().setAsyncOperationsStatus("pending");

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
      }
    );
    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    console.log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

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
  useSystemStore.getState().setAsyncOperationsStatus("pending");

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
    useSystemStore.getState().setAsyncOperationsStatus("success");

    return response;
  } catch (err) {
    console.log(err);
    useSystemStore.getState().setAsyncOperationsStatus("error");

    return null;
  }
}
