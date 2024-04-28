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
          className="hidden rounded-[4px_50%_50%_50%] h-8 w-8 aspect-square bg-white shadow-2xl fixed z-[999999] top-1 left-1"
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
              className="w-64 py-3 text-black rounded-2xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-[999999]"
              side="bottom"
            >
              <form
                className="flex items-center h-20 gap-1 px-3"
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
                  className="border rounded-md border-neutral-300"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center flex-grow h-full rounded-lg w-7 hover:bg-black/10"
                  data-live-feedback="true"
                >
                  <PaperPlaneIcon />
                </button>
              </form>
              <Popover.Close
                className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                aria-label="Close"
                data-live-feedback="true"
              >
                <Cross2Icon />
              </Popover.Close>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </>
    );
  }
);

export default TemporalThreadBubble;
