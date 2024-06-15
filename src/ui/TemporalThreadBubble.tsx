import Popover from "./atoms/Popover";
import useThreadsStore from "../store/threads";
import { CommentForm } from "./bubbles/CommentForm";
import { useMemo } from "react";
import { Z_INDEXES } from "../styles/tokens";

const TemporalThreadBubble = () => {
  const tempThreadCreationIntent = useThreadsStore(
    (state) => state.tempThreadCreationIntent
  );
  const createThread = useThreadsStore((state) => state.createThread);
  const setTempThreadCreationIntent = useThreadsStore(
    (state) => state.setTempThreadCreationIntent
  );

  const isCreatingThreadPromptOpen = tempThreadCreationIntent !== null;
  const y = useMemo(() => {
    if (!tempThreadCreationIntent) return null;
    if (tempThreadCreationIntent.type === "TEXT_RANGE") {
      const clientRect = window
        .getSelection()
        ?.getRangeAt(0)
        .getClientRects()
        .item(0);
      if (!clientRect) return null;
      return clientRect.bottom + window.scrollY;
    }
    return tempThreadCreationIntent.y;
  }, [tempThreadCreationIntent]);
  const x = useMemo(() => {
    if (!tempThreadCreationIntent) return null;
    if (tempThreadCreationIntent.type === "TEXT_RANGE") {
      const clientRect = window
        .getSelection()
        ?.getRangeAt(0)
        .getClientRects()
        .item(0);
      if (!clientRect) return null;
      return clientRect.right + window.scrollX;
    }
    return tempThreadCreationIntent.x;
  }, [tempThreadCreationIntent]);
  if (!isCreatingThreadPromptOpen) return null;
  if (!x || !y) return null;
  return (
    <>
      <Popover
        onOpenChange={(open) => {
          if (!open) {
            setTempThreadCreationIntent(null);
          }
        }}
        open={isCreatingThreadPromptOpen}
      >
        <Popover.Trigger
          style={{
            top: y,
            left: x,
            position: "absolute",
            zIndex: Z_INDEXES.HOVERED_BUBBLE,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 1)",
            }}
          >
            <span
              style={{
                color: "rgba(0, 0, 0, 1)",
                fontSize: "16px",
              }}
            >
              +
            </span>
          </div>
        </Popover.Trigger>

        <Popover.Content height="fit-content">
          <CommentForm
            action={(comment, bindedPullRequestId: number) =>
              createThread(comment, bindedPullRequestId)
            }
          />
        </Popover.Content>
      </Popover>
    </>
  );
};

export default TemporalThreadBubble;
