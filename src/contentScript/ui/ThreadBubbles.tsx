import * as Popover from "@radix-ui/react-popover";
import {
  ChatBubbleIcon,
  Cross2Icon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Thread } from "../types/Threads";
import { useEffect, useState } from "react";
import { GH_OWNER, GH_REPO } from "../const";
import useThreadsStore from "../store/threads";
import styled from "@emotion/styled";
import { COLORS, CSS_FRAGMENTS, Z_INDEXES } from "../styles/tokens";
import { VerticalDivider } from "./atoms/VerticalDivider";
import { getRelativeTimeString } from "../utils";
import { Button } from "./atoms/Button";
import { TextArea } from "./atoms/TextArea";

/*
  className="!lf-rounded-full !lf-h-[25px] !lf-w-[25px] !lf-inline-flex !lf-items-center !lf-justify-center !lf-absolute !lf-top-[5px] !lf-right-[5px] focus:!lf-shadow-[0_0_0_2px] !lf-outline-none lf-cursor-default"
*/
const CloseButton = styled(Popover.Close)`
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  top: 8px;
  right: 8px;
  outline: none;
  cursor: default;
  ${CSS_FRAGMENTS["button-styles"]};
`;

const Content = styled(Popover.Content)`
  width: 256px;
  padding: 0 12px;
  height: 384px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: white;
  border-radius: 16px;
  will-change: transform, opacity;
  z-index: ${Z_INDEXES.HOVERED_BUBBLE};
  ${CSS_FRAGMENTS["box-styles"]};

  * {
    color: white;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
  }
  ul {
    padding-inline: 4px;
    list-style: none;
  }
  li {
    list-style: none;
  }
`;

const Trigger = styled(Popover.Trigger)`
  width: 32px;
  height: 32px;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  box-shadow: 0 2px 10px;
  border-radius: 4px 50% 50% 50%;
  z-index: ${Z_INDEXES.BUBBLE};
  position: absolute;
  color: white;
  outline: none;
  ${CSS_FRAGMENTS["button-styles"]};
  &:hover {
    z-index: ${Z_INDEXES.HOVERED_BUBBLE};
  }
`;

const ThreadBubble = ({ thread }: { thread: Thread }) => {
  const [open, setOpen] = useState(false);
  const { addComment, loadComments } = useThreadsStore((state) => ({
    loadComments: state.populateThreadComments,
    addComment: state.createThreadComment,
  }));
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const element = document.querySelector(
      thread.tracking.selector
    ) as HTMLElement;
    if (!element || thread.tracking.show === false) return;
    function calculateCoords() {
      const rect = element.getBoundingClientRect();
      const x =
        rect.width *
          (parseFloat(thread.tracking.xPercentageFromSelectedElement) / 100) +
        rect.left +
        window.scrollX;
      const y =
        rect.height *
          (parseFloat(thread.tracking.yPercentageFromSelectedElement) / 100) +
        rect.top +
        window.scrollY;
      setCoords({ x, y });
    }
    const resizeObserver = new ResizeObserver(calculateCoords);
    resizeObserver.observe(document.body);
    calculateCoords();
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    thread.tracking.selector,
    thread.tracking.xPercentageFromSelectedElement,
    thread.tracking.yPercentageFromSelectedElement,
    thread.tracking.show,
  ]);
  console.log("coords", coords);
  return (
    thread.tracking.show && (
      <Popover.Root
        open={open}
        onOpenChange={(open) => {
          console.log("open", open);
          setOpen(open);
          if (open && thread.comments?.filter(Boolean)?.length === 0) {
            loadComments(thread);
          }
        }}
      >
        <Trigger
          style={{
            top: coords.y,
            left: coords.x,
            overflow: "hidden",
          }}
        >
          {/* {thread.comments?.length} */}
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
        <Popover.Portal>
          <Content side="bottom">
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
              <VerticalDivider
                style={{
                  height: "50%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ChatBubbleIcon />{" "}
                <span
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {thread.comments?.length}
                </span>
              </div>
              <VerticalDivider
                style={{
                  height: "50%",
                }}
              />
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
                    {getRelativeTimeString(new Date(thread.date))}
                  </span>
                </header>
                <a
                  target="_blank"
                  href={`https://github.com/${GH_OWNER()}/${GH_REPO()}/issues/${thread.GHissueId}`}
                >
                  <h2>{thread.title.replace("[LIVE FEEDBACK] - ", "")}</h2>
                </a>
                <div>Issue opened</div>
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
                          {getRelativeTimeString(new Date(comment.date))}
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
            <form
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBlockEnd: "12px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                const comment = new FormData(e.target as HTMLFormElement).get(
                  "comment"
                );
                if (comment) {
                  addComment(thread, comment as string);
                }
              }}
            >
              <TextArea
                name="comment"
                rows={2}
                style={{
                  borderRadius: "6px",
                  padding: "4px",
                }}
              />
              <Button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                  borderRadius: "8px",
                  height: "100%",
                  width: "40px",
                }}
              >
                <PaperPlaneIcon />
              </Button>
            </form>

            <CloseButton aria-label="Close">
              <Cross2Icon />
            </CloseButton>
            <Popover.Arrow className="!lf-fill-white" />
          </Content>
        </Popover.Portal>
      </Popover.Root>
    )
  );
};

function ThreadBubbles() {
  const threads = useThreadsStore((state) => state.threads);
  return threads.map((thread) => (
    <ThreadBubble key={thread.GHissueId} thread={thread} />
  ));
}

export default ThreadBubbles;
