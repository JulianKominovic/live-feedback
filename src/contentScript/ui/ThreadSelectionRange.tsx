import React from "react";
import useThreadsStore from "../store/threads";
import styled from "@emotion/styled";
import { Thread } from "../types/Threads";

const SelectionRangeOverlay = styled.div<{ thread: Thread; rect: DOMRect }>`
  position: absolute;
  width: ${({ rect }) => rect.width + "px"};
  height: ${({ rect }) => rect.height + "px"};
  left: ${({ rect }) => rect.left + window.scrollX + "px"};
  top: ${({ rect }) => rect.top + window.scrollY + "px"};
  background-color: rgba(102, 51, 153, 0.3);
  border: 1px solid rgba(143, 51, 153, 0.6);
  z-index: 999999;
  pointer-events: none;
`;

const ThreadSelectionRange = () => {
  const threads = useThreadsStore((state) => state.threads);

  return threads
    .filter(
      (thread) =>
        thread.tracking.show &&
        thread.tracking.type === "TEXT_RANGE" &&
        thread.tracking.liveCoords?.clientRects
    )
    .flatMap((thread) => {
      return [...(thread.tracking.liveCoords as any).clientRects].map(
        (rect, index) => (
          <SelectionRangeOverlay
            data-live-feedback-text-selection={thread.GHissueId || ""}
            data-live-feedback-text-selection-rect={index + ""}
            rect={rect}
            thread={thread}
          />
        )
      );
    });
};

export default ThreadSelectionRange;
