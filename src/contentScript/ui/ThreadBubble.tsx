import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Thread } from "../types/Threads";
import { GH_OWNER, GH_REPO } from "../const";
import { useState } from "react";

const ThreadBubble = ({
  thread,
  loadComments,
  addComment,
}: {
  thread: Thread;
  loadComments: () => void;
  addComment: (comment: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    thread.tracking.show && (
      <Popover.Root
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (open && thread.comments?.filter(Boolean)?.length === 0) {
            loadComments();
          }
        }}
        modal
      >
        <Popover.Trigger asChild>
          <button
            className="lf-w-8 lf-h-8 lf-inline-flex lf-items-center lf-justify-center lf-bg-white lf-text-black lf-shadow-[0_2px_10px] focus:lf-shadow-[0_0_0_2px] lf-rounded-[4px_50%_50%_50%] hover:!lf-z-[99999] focus:lf-shadow-black lf-cursor-default lf-outline-none lf-absolute"
            aria-label="Update dimensions"
            style={{
              top: `${thread.tracking.y}px`,
              left: `${thread.tracking.x}px`,
              zIndex: open ? 999999 : 9999,
            }}
          >
            {thread.comments?.length}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="lf-w-64 lf-py-3 lf-h-96 lf-grid lf-grid-rows-[auto_auto_1fr_auto_auto] lf-text-black lf-rounded-2xl lf-bg-white lf-shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] lf-will-change-[transform,opacity] lf-z-[999999]"
            side="bottom"
          >
            <a
              className="lf-px-3 lf-font-medium lf-underline"
              target="_blank"
              href={`https://github.com/${GH_OWNER}/${GH_REPO}/issues/${thread.GHissueId}`}
            >
              <h2>{thread.title.replace("[LIVE FEEDBACK] - ", "")}</h2>
            </a>
            <span className="lf-px-3 lf-text-xs lf-text-neutral-500">
              {new Date(thread.date).toLocaleString()}
            </span>
            <hr className="lf-my-2" />
            <ul className="lf-px-3 lf-pb-3 lf-overflow-scroll lf-list-none">
              {thread.comments?.map((comment, i) => (
                <li
                  className="lf-mt-2"
                  key={thread.GHissueId + "" + i + comment}
                >
                  {comment?.user?.name && comment?.user?.avatar && (
                    <div className="lf-flex lf-items-center">
                      {comment.user.avatar && (
                        <img
                          className="lf-w-6 lf-h-6 lf-mr-2 lf-rounded-full"
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                      )}
                      <span className="lf-text-sm lf-font-medium">
                        {comment.user.name}
                      </span>
                    </div>
                  )}
                  <span className="lf-text-xs lf-text-neutral-500">
                    {comment?.date}
                  </span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: comment?.body || "",
                    }}
                    className="lf-text-sm"
                  ></div>
                </li>
              ))}
            </ul>
            <hr className="lf-my-2" />
            <form
              className="lf-flex lf-items-center lf-gap-1 lf-px-3"
              onSubmit={(e) => {
                e.preventDefault();
                const comment = new FormData(e.target as HTMLFormElement).get(
                  "comment"
                );
                if (comment) {
                  addComment(comment as string);
                }
              }}
            >
              <textarea
                name="comment"
                className="lf-border lf-rounded-md lf-border-neutral-300"
              />
              <button
                type="submit"
                className="lf-flex lf-items-center lf-justify-center lf-flex-grow lf-h-full lf-rounded-lg lf-w-7 hover:lf-bg-black/10"
              >
                <PaperPlaneIcon />
              </button>
            </form>
            <Popover.Close
              className="lf-rounded-full lf-h-[25px] lf-w-[25px] lf-inline-flex lf-items-center lf-justify-center lf-absolute lf-top-[5px] lf-right-[5px] focus:lf-shadow-[0_0_0_2px] lf-outline-none lf-cursor-default"
              aria-label="Close"
            >
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="lf-fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  );
};

export default ThreadBubble;
