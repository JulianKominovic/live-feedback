import * as Popover from "@radix-ui/react-popover";
import useThreadsStore from "../store/threads";
import { Content } from "./bubbles/Content";
import { CommentForm } from "./bubbles/CommentForm";
import { Trigger } from "./bubbles/Trigger";
import { useMemo } from "react";

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
  const y = useMemo(() => {
    if (!tempThreadCreationIntent) return null;
    const clientRect = window
      .getSelection()
      ?.getRangeAt(0)
      .getClientRects()
      .item(0);
    if (tempThreadCreationIntent.type === "TEXT_RANGE") {
      if (!clientRect) return null;
      return clientRect.bottom + window.scrollY;
    }
    return tempThreadCreationIntent.y;
  }, [tempThreadCreationIntent]);
  const x = useMemo(() => {
    if (!tempThreadCreationIntent) return null;
    const clientRect = window
      .getSelection()
      ?.getRangeAt(0)
      .getClientRects()
      .item(0);

    if (tempThreadCreationIntent.type === "TEXT_RANGE") {
      if (!clientRect) return null;
      return clientRect.right + window.scrollX;
    }
    return tempThreadCreationIntent.x;
  }, [tempThreadCreationIntent]);
  if (!isCreatingThreadPromptOpen) return null;
  if (!x || !y) return null;
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
            top: y,
            left: x,
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
            onOpenAutoFocus={(e) => e.preventDefault()}
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
