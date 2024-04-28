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
            className="w-8 h-8 inline-flex items-center justify-center text-violet11 bg-white text-black shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] rounded-[4px_50%_50%_50%] hover:!z-[99999] focus:shadow-black cursor-default outline-none absolute"
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
            className="w-64 py-3 h-96 grid grid-rows-[auto_auto_1fr_auto_auto] text-black rounded-2xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-[999999]"
            side="bottom"
          >
            <a
              className="px-3 font-medium underline"
              target="_blank"
              href={`https://github.com/${GH_OWNER}/${GH_REPO}/issues/${thread.GHissueId}`}
            >
              <h2>{thread.title.replace("[LIVE FEEDBACK] - ", "")}</h2>
            </a>
            <span className="px-3 text-xs text-neutral-500">
              {new Date(thread.date).toLocaleString()}
            </span>
            <hr className="my-2" />
            <ul className="px-3 pb-3 overflow-scroll list-none">
              {thread.comments?.map((comment, i) => (
                <li className="mt-2" key={thread.GHissueId + "" + i + comment}>
                  {comment?.user?.name && comment?.user?.avatar && (
                    <div className="flex items-center">
                      {comment.user.avatar && (
                        <img
                          className="w-6 h-6 mr-2 rounded-full"
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                      )}
                      <span className="text-sm font-medium">
                        {comment.user.name}
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-neutral-500">
                    {comment?.date}
                  </span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: comment?.body || "",
                    }}
                    className="text-sm"
                  ></div>
                </li>
              ))}
            </ul>
            <hr className="my-2" />
            <form
              className="flex items-center gap-1 px-3"
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
                className="border rounded-md border-neutral-300"
              />
              <button
                type="submit"
                className="flex items-center justify-center flex-grow h-full rounded-lg w-7 hover:bg-black/10"
              >
                <PaperPlaneIcon />
              </button>
            </form>
            <Popover.Close
              className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
              aria-label="Close"
            >
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  );
};

export default ThreadBubble;
