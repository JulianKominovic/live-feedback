import { forwardRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";

type TemporalThreadBubbleProps = {
  isCreatingThreadPromptOpen: boolean;
  setIsCreatingThreadPromptOpen: (open: boolean) => void;
  createThread: (title: string) => void;
  x: number | undefined;
  y: number | undefined;
};

const TemporalThreadBubble = forwardRef(
  (
    {
      x,
      y,
      isCreatingThreadPromptOpen,
      setIsCreatingThreadPromptOpen,
      createThread,
    }: TemporalThreadBubbleProps,
    ref
  ) => {
    return (
      <>
        <div
          // @ts-ignore
          ref={ref}
          className="lf-hidden lf-rounded-[4px_50%_50%_50%] lf-h-8 lf-w-8 lf-aspect-square lf-bg-white lf-shadow-2xl lf-fixed lf-z-[999999] lf-top-1 lf-left-1"
        ></div>
        <Popover.Root
          open={isCreatingThreadPromptOpen}
          onOpenChange={setIsCreatingThreadPromptOpen}
          modal
        >
          <Popover.Trigger
            style={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              zIndex: 999999,
            }}
          ></Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="lf-w-64 lf-py-3 lf-text-black lf-rounded-2xl lf-bg-white lf-shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] lf-will-change-[transform,opacity] lf-z-[999999]"
              side="bottom"
            >
              <form
                className="lf-flex lf-items-center lf-h-20 lf-gap-1 lf-px-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = new FormData(e.target as HTMLFormElement).get(
                    "comment"
                  );
                  if (comment) {
                    createThread(comment as string);
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
                  data-live-feedback="true"
                >
                  <PaperPlaneIcon />
                </button>
              </form>
              <Popover.Close
                className="lf-rounded-full lf-h-[25px] lf-w-[25px] lf-inline-flex lf-items-center lf-justify-center lf-absolute lf-top-[5px] lf-right-[5px] focus:lf-shadow-[0_0_0_2px] lf-outline-none lf-cursor-default"
                aria-label="Close"
                data-live-feedback="true"
              >
                <Cross2Icon />
              </Popover.Close>
              <Popover.Arrow className="lf-fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </>
    );
  }
);

export default TemporalThreadBubble;
