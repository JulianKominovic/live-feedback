import * as Popover from "@radix-ui/react-popover";
import useThreadsStore from "../store/threads";
import { Content } from "./bubbles/Content";
import { CommentForm } from "./bubbles/CommentForm";
import { Trigger } from "./bubbles/Trigger";

const TemporalThreadBubble = () => {
  const {
    tempThreadCreationIntent,
    createThread,
    setTempThreadCreationIntent,
  } = useThreadsStore((state) => ({
    tempThreadCreationIntent: state.tempThreadCreationIntent,
    setTempThreadCreationIntent: state.setTempThreadCreationIntent,
    createThread: state.createThread,
  }));
  const isCreatingThreadPromptOpen = tempThreadCreationIntent !== null;
  if (!isCreatingThreadPromptOpen) return null;
  return (
    <>
      <Popover.Root
        onOpenChange={(open) => {
          if (!open) {
            setTempThreadCreationIntent(null);
          }
        }}
        open={isCreatingThreadPromptOpen}
      >
        <Trigger
          style={{
            top: tempThreadCreationIntent?.y,
            left: tempThreadCreationIntent?.x,
            position: "absolute",
            zIndex: 999999,
          }}
        ></Trigger>
        <Popover.Portal
          container={
            document
              .getElementById("live-feedback")
              ?.shadowRoot?.querySelector("#live-feedback-styles-wrapper") ||
            (document.body as any)
          }
        >
          <Content
            data-live-feedback
            height="auto"
            style={{
              paddingBlockStart: "12px",
            }}
            side="bottom"
          >
            <CommentForm
              action={(comment, bindedPullRequestId: number) =>
                createThread(comment, bindedPullRequestId)
              }
            />
            <Popover.Arrow className="!lf-fill-white" />
          </Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default TemporalThreadBubble;
