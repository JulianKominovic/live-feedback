import { Popover } from "@headlessui/react";

import {
  CheckCircledIcon,
  Cross2Icon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Thread } from "../types/Threads";
import { useEffect } from "react";
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
import { buildThreadLink } from "../logic/threads";
import DeviceInfoTags from "./molecules/DeviceInfoTags";
import { AnimatePresence, motion } from "framer-motion";

function ThreadPopoverContent({
  thread,
  open,
}: {
  thread: Thread;
  open: boolean;
}) {
  const addComment = useThreadsStore((state) => state.createThreadComment);
  const loadComments = useThreadsStore((state) => state.populateThreadComments);
  const closeThread = useThreadsStore((state) => state.closeThread);
  const coords = thread.tracking.liveCoords;
  useEffect(() => {
    if (open && thread.comments?.filter(Boolean)?.length === 0) {
      loadComments(thread);
    }
  }, [open]);
  if (!coords) return null;
  return (
    <>
      <Trigger
        id={"live-feedback-bubble-" + thread.GHissueId}
        data-live-feedback
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
      <AnimatePresence>
        {open && (
          <Content
            static
            // @ts-expect-error - framer-motion types
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              padding: "64px",
            }}
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

              {thread.tracking.device && (
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <InfoCircledIcon />
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    style={{
                      padding: "8px",
                      width: 320,
                    }}
                    sideOffset={5}
                  >
                    <DeviceInfoTags {...thread.tracking.device} />
                  </Tooltip.Content>
                </Tooltip>
              )}
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <CopyButton
                    textToCopy={buildThreadLink(
                      thread.GHissueId,
                      thread.tracking.url
                    )}
                  />
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
        )}
      </AnimatePresence>
    </>
  );
}

const ThreadBubble = ({ thread }: { thread: Thread }) => {
  const coords = thread.tracking.liveCoords;

  return (
    thread.tracking.show &&
    coords && (
      <Popover
        style={{
          top: coords.y,
          left: coords.x,
          position: "absolute",
        }}
      >
        {({ open }) => <ThreadPopoverContent thread={thread} open={open} />}
      </Popover>
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
