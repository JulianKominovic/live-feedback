import React, { useMemo } from "react";
import useThreadsStore from "../store/threads";
import styled from "@emotion/styled";
import {
  getCssSelectorForTextNode,
  getElementFromCssSelectorAndChildrenIndex,
} from "../logic/dom";
import { pipe } from "../utils";
import { Z_INDEXES } from "../styles/tokens";

const SelectionRangeOverlay = styled.div<{
  rect: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
}>`
  position: absolute;
  width: ${({ rect }) => rect.width + "px"};
  height: ${({ rect }) => rect.height + "px"};
  left: ${({ rect }) => rect.left + "px"};
  top: ${({ rect }) => rect.top + "px"};
  background-color: rgba(193, 55, 255, 0.3);
  border: 1px solid rgba(143, 51, 153, 0.6);
  z-index: ${Z_INDEXES.SELECTED_TEXT};
  transform: translate3d(0, 0, 0);
  pointer-events: none;
`;

const ThreadSelectionRange = () => {
  const threads = useThreadsStore((state) => state.threads);
  const tempThreadCreationIntent = useThreadsStore(
    (state) => state.tempThreadCreationIntent
  );
  const tempRange = useMemo(
    () => {
      if (tempThreadCreationIntent?.type === "TEXT_RANGE") {
        const { start, end } = tempThreadCreationIntent;
        const startNodeFound = pipe(
          getCssSelectorForTextNode(tempThreadCreationIntent.startNode),
          ({ childrenIndex, cssSelectors }) =>
            getElementFromCssSelectorAndChildrenIndex(
              cssSelectors,
              childrenIndex
            )
        );
        const endNodeFound = pipe(
          getCssSelectorForTextNode(tempThreadCreationIntent.endNode),
          ({ childrenIndex, cssSelectors }) =>
            getElementFromCssSelectorAndChildrenIndex(
              cssSelectors,
              childrenIndex
            )
        );
        const range = document.createRange();

        if (startNodeFound) range.setStart(startNodeFound, start);
        if (endNodeFound) range.setEnd(endNodeFound, end);
        const clientRects = range.getClientRects();
        return clientRects;
      }
    },
    // window.scrollX and window.scrollY are used to adjust the position of the overlay
    // window.location.href is used to recompute the overlay when the URL changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      tempThreadCreationIntent,
      window.scrollX,
      window.scrollY,
      window.location.href,
    ]
  );

  return (
    <>
      {tempRange && tempRange.length > 0
        ? [...tempRange].map((rect, index) => {
            return (
              <SelectionRangeOverlay
                key={"temp-rect" + index}
                data-live-feedback-text-selection={"temp-rect"}
                data-live-feedback-text-selection-rect={index}
                rect={{
                  width: rect.width,
                  height: rect.height,
                  left: rect.left + window.scrollX,
                  top: rect.top + window.scrollY,
                }}
              />
            );
          })
        : null}
      {threads
        .filter(
          (thread) =>
            thread.tracking.show &&
            thread.tracking.type === "TEXT_RANGE" &&
            thread.tracking.liveCoords?.clientRects
        )
        .flatMap((thread) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return [...(thread.tracking.liveCoords as any).clientRects].map(
            (rect, index) => (
              <SelectionRangeOverlay
                key={thread.GHissueId + "rect" + index}
                data-live-feedback-text-selection={thread.GHissueId || ""}
                data-live-feedback-text-selection-rect={index + ""}
                rect={{
                  width: rect.width,
                  height: rect.height,
                  left: rect.left + window.scrollX,
                  top: rect.top + window.scrollY,
                }}
              />
            )
          );
        })}
    </>
  );
};

export default ThreadSelectionRange;
