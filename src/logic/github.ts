import { dataURL } from "@gripeless/pico";
import { uploadFile } from "../integrations/github/files";
import { GH_OWNER, GH_REPO, GH_TEMP_FILES_PATH_FOLDER } from "../const";
import html2canvas from "html2canvas";
import {
  createIssueComment,
  getIssueComments,
} from "../integrations/github/issues";
import { Thread } from "../types/Threads";

export async function uploadDomPhoto(id: string) {
  const domPhoto = (await dataURL(window)).value.replace(
    "data:image/png;base64,",
    ""
  );
  const uploadResponse = await uploadFile({
    fileContent: domPhoto,
    repo: GH_REPO,
    path: `${GH_TEMP_FILES_PATH_FOLDER}/${id}-dom-photo.png`,

    owner: GH_OWNER,
  });
  return uploadResponse;
}

export async function uploadElementPhoto(element: HTMLElement, id: string) {
  const elementPhoto = (await html2canvas(element))
    .toDataURL()
    .replace("data:image/png;base64,", "");
  const uploadResponse = await uploadFile({
    fileContent: elementPhoto,
    repo: GH_REPO,
    path: `${GH_TEMP_FILES_PATH_FOLDER}/${id}-element-photo.png`,
    owner: GH_OWNER,
  });
  return uploadResponse;
}

export async function getComments(thread: Thread) {
  if (!thread.GHissueId) return thread;
  const comments = await getIssueComments({
    repo: GH_REPO,
    owner: GH_OWNER,
    issue_number: Number(thread.GHissueId),
  });
  thread.comments = comments.data.map((comment) => ({
    body: comment.body_html,
    user: {
      avatar: comment.user?.avatar_url,
      name: comment.user?.login,
    },
    date: comment.updated_at,
  }));
  return thread;
}

export async function addComment(thread: Thread, comment: string) {
  if (!thread.GHissueId) return thread;
  const commentResponse = await createIssueComment({
    repo: GH_REPO,
    owner: GH_OWNER,
    issue_number: Number(thread.GHissueId),
    body: comment,
  });
  thread.comments?.push({
    body: comment,
    user: {
      name: commentResponse.data.user?.name || commentResponse.data.user?.login,
      avatar:
        commentResponse.data.user?.avatar_url ||
        `https://avatars.githubusercontent.com/u/${commentResponse.data.user?.gravatar_id}?v=4`,
    },
    date: commentResponse.data.updated_at,
  });
  return thread;
}
