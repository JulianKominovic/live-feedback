import {
  createIssueComment,
  getIssueComments,
} from "../integrations/github/issues";
import { Thread } from "../types/Threads";

export async function getComments(thread: Thread) {
  if (!thread.GHissueId) return thread;
  const comments = await getIssueComments({
    issue_number: Number(thread.GHissueId),
  });
  if (!comments) return thread;
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
    issue_number: Number(thread.GHissueId),
    body: comment,
  });
  if (!commentResponse) return thread;
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
