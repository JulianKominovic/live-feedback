import * as Popover from "@radix-ui/react-popover";
import {
  CheckCircledIcon,
  Cross2Icon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Thread } from "../types/Threads";
import { useMemo, useState } from "react";
import { GH_OWNER, GH_REPO } from "../const";
import useThreadsStore from "../store/threads";
import { COLORS } from "../styles/tokens";
import { getRelativeTimeString } from "../utils";
import { Content } from "./bubbles/Content";
import { CloseButton } from "./bubbles/CloseButton";
import { Trigger } from "./bubbles/Trigger";
import { ConversationalCommentForm } from "./bubbles/ConversationalCommentForm";
import Tooltip from "./atoms/Tooltip";
import { CopyButton } from "./atoms/CopyButton";

const ThreadBubble = ({ thread }: { thread: Thread }) => {
  const [open, setOpen] = useState(false);
  const addComment = useThreadsStore((state) => state.createThreadComment);
  const loadComments = useThreadsStore((state) => state.populateThreadComments);
  const closeThread = useThreadsStore((state) => state.closeThread);

  const copyUrl = useMemo(() => {
    if (!thread.GHissueId) return "";
    const url = new URL(thread.tracking.url);
    url.searchParams.set("thread", thread.GHissueId);
    return url.toString();
  }, [thread.GHissueId, thread.tracking.url]);
  const coords = thread.tracking.liveCoords;
  return (
    thread.tracking.show &&
    coords && (
      <Popover.Root
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (open && thread.comments?.filter(Boolean)?.length === 0) {
            loadComments(thread);
          }
        }}
      >
        <Trigger
          id={"live-feedback-bubble-" + thread.GHissueId}
          data-live-feedback
          style={{
            top: coords.y,
            left: coords.x,
            overflow: "hidden",
          }}
        >
          {thread.creator?.avatar ? (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={thread.creator.avatar}
              alt={thread.creator.name}
            />
          ) : (
            thread.comments?.length
          )}
        </Trigger>
        <Popover.Portal
          container={
            document
              .getElementById("live-feedback")
              ?.shadowRoot?.querySelector("#live-feedback-styles-wrapper") ||
            document.body
          }
        >
          <Content
            data-live-feedback
            side="right"
            align="center"
            collisionPadding={{
              top: 8,
              right: 8,
              bottom: 72,
              left: 8,
            }}
            sideOffset={8}
          >
            <header
              style={{
                display: "flex",
                paddingInline: "4px",
                gap: "8px",
                alignItems: "center",
                height: "40px",
                borderBottom: "1px solid rgba(0,0,0,.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    display: "inline-block",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                    backgroundColor:
                      thread.status === "OPEN"
                        ? COLORS["green-500"]
                        : COLORS["purple-500"],
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {thread.status === "OPEN" ? "Open" : "Closed"}
                </span>
              </div>

              <Tooltip>
                <Tooltip.Trigger asChild>
                  <InfoCircledIcon />
                </Tooltip.Trigger>
                <Tooltip.Content
                  style={{
                    padding: "8px 16px",
                  }}
                  sideOffset={5}
                >
                  <div>
                    <strong>Screen</strong>:{" "}
                    {thread.tracking.device.screen.width}w x{" "}
                    {thread.tracking.device.screen.height}h
                  </div>
                  {thread.tracking.device.browser.version &&
                  thread.tracking.device.browser.name ? (
                    <div>
                      <strong>Browser</strong>:{" "}
                      {thread.tracking.device.browser.name}{" "}
                      {thread.tracking.device.browser.version}
                    </div>
                  ) : null}
                  {thread.tracking.device.os.name ? (
                    <div>
                      <strong>OS</strong>: {thread.tracking.device.os.name}
                    </div>
                  ) : null}
                  {thread.tracking.device.type.vendor &&
                  thread.tracking.device.type.model ? (
                    <div>
                      <strong>Device</strong>:{" "}
                      {thread.tracking.device.type.vendor}{" "}
                      {thread.tracking.device.type.model}
                    </div>
                  ) : null}
                  {thread.tracking.device.type.type ? (
                    <div>
                      <strong>Device type</strong>:{" "}
                      {thread.tracking.device.type.type}
                    </div>
                  ) : null}
                  <div>
                    <strong>Timezone</strong>: {thread.tracking.device.tz}
                  </div>
                  {thread.tracking.device.network?.effectiveType ? (
                    <div>
                      <strong>Network</strong>:{" "}
                      {thread.tracking.device.network.effectiveType}
                    </div>
                  ) : null}
                </Tooltip.Content>
              </Tooltip>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <CopyButton textToCopy={copyUrl} />
                </Tooltip.Trigger>
                <Tooltip.Content
                  style={{
                    padding: "8px 16px",
                  }}
                  sideOffset={5}
                >
                  Copy thread link
                </Tooltip.Content>
              </Tooltip>

              <Tooltip>
                <Tooltip.Trigger asChild onClick={() => closeThread(thread)}>
                  <CheckCircledIcon />
                </Tooltip.Trigger>
                <Tooltip.Content
                  style={{
                    padding: "8px 16px",
                  }}
                  sideOffset={5}
                >
                  Close thread
                </Tooltip.Content>
              </Tooltip>

              <span
                style={{
                  fontSize: "12px",
                }}
              >
                {getRelativeTimeString(new Date(thread.date))}
              </span>
            </header>

            <ul
              style={{
                overflow: "auto",
              }}
            >
              <li
                key={thread.GHissueId + "title"}
                style={{
                  paddingBlock: "24px",
                  borderBottom: "1px solid rgba(0,0,0,.1)",
                }}
              >
                <header
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                    }}
                    src={thread.creator?.avatar}
                    alt={thread.creator?.name}
                  />
                  <span
                    style={{
                      opacity: 0.8,
                      fontSize: "12px",
                    }}
                  >
                    {thread.creator?.name}
                  </span>
                  <span
                    style={{
                      opacity: 0.8,
                      fontSize: "12px",
                      marginInlineStart: "auto",
                    }}
                  >
                    {getRelativeTimeString(new Date(thread.date), "narrow")}
                  </span>
                </header>
                <a
                  target="_blank"
                  href={`https://github.com/${GH_OWNER}/${GH_REPO}/issues/${thread.GHissueId}`}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "medium",
                      textDecoration: "underline",
                    }}
                  >
                    {thread.title.replace("[LIVE FEEDBACK] - ", "")}
                  </h2>
                </a>
                <div style={{ opacity: 0.5 }}> {"> "}Issue opened</div>
              </li>
              {thread.comments?.map((comment, i) => (
                <li
                  style={{
                    paddingBlock: "24px",
                    borderBottom: "1px solid rgba(0,0,0,.1)",
                  }}
                  key={thread.GHissueId + "" + i + comment}
                >
                  {comment?.user?.name && comment?.user?.avatar && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBlockEnd: "8px",
                      }}
                    >
                      {comment.user.avatar && (
                        <img
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                          }}
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                      )}
                      <span style={{ opacity: 0.8, fontSize: "12px" }}>
                        {comment.user.name}
                      </span>

                      {comment?.date && (
                        <span
                          style={{
                            fontSize: "12px",
                            marginInlineStart: "auto",
                            opacity: 0.8,
                          }}
                        >
                          {getRelativeTimeString(
                            new Date(comment.date),
                            "narrow"
                          )}
                        </span>
                      )}
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: comment?.body || "",
                    }}
                  ></div>
                </li>
              ))}
            </ul>
            <ConversationalCommentForm
              action={(comment) => addComment(thread, comment)}
            />

            <CloseButton aria-label="Close">
              <Cross2Icon />
            </CloseButton>
          </Content>
        </Popover.Portal>
      </Popover.Root>
    )
  );
};

function ThreadBubbles() {
  const threads = useThreadsStore((state) => state.threads);
  return threads.map((thread) => (
    <ThreadBubble key={thread.GHissueId ?? ""} thread={thread} />
  ));
}

export default ThreadBubbles;
