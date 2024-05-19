import useThreadsStore from "../store/threads";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArchiveIcon,
  CursorTextIcon,
  GearIcon,
  PlusIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import styled from "@emotion/styled";
import { COLORS, CSS_FRAGMENTS, Z_INDEXES } from "../styles/tokens";
import { useEffect, useState } from "react";
import { VerticalDivider } from "./atoms/VerticalDivider";
import { Button } from "./atoms/Button";
import useSystemStore from "../store/system";
import { clearGithubCache } from "../integrations/github/client";
import SemaphoreIndicator from "./atoms/SemaphoreIndicator";
import { randomBetween } from "../utils";
import { recursiveGetParentUntilItIsAnHTMLElement } from "../logic/dom";

function MentionsBigPanel() {
  return <>hi!</>;
}

function AsyncOperationsStatus() {
  const { asyncOperations, queue } = useSystemStore((state) => ({
    asyncOperations: state.asyncOperations,
    queue: state.queue,
  }));

  return (
    <>
      <SemaphoreIndicator color={COLORS["green-600"]}>
        {asyncOperations.success}
      </SemaphoreIndicator>
      <SemaphoreIndicator color={COLORS["red-600"]}>
        {asyncOperations.error}
      </SemaphoreIndicator>
      <SemaphoreIndicator color={COLORS["orange-600"]}>
        {queue.find((task) => task.status === "pending")?.title ||
          asyncOperations.pending}
      </SemaphoreIndicator>
    </>
  );
}

const Nav = styled(motion.nav)`
  position: fixed;
  z-index: ${Z_INDEXES.TOOLBAR};
  left: 16px;
  bottom: 16px;
  padding-inline-start: 8px;
  padding-inline-end: 12px;
  font-size: 14px;
  color: ${COLORS["grey-900-contrast"]};
  background-color: ${COLORS["grey-900"]};
  width: fit-content;
  overflow-x: hidden;
  padding-block: 4px;
  ${CSS_FRAGMENTS["box-styles"]};
`;

const Toolbar = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
`;

const BigPanel = styled(motion.main)`
  border-radius: 12px;
  margin: 0 4px 12px 4px;
  min-height: 192px;
  padding: 12px;
  ${CSS_FRAGMENTS["button-styles"]}
`;

function Navbar() {
  const { isPicking, threads, setIsPicking, setTempThreadCreationIntent } =
    useThreadsStore((state) => ({
      isPicking: state.isPicking,
      threads: state.threads,
      setIsPicking: state.setIsPicking,
      setTempThreadCreationIntent: state.setTempThreadCreationIntent,
    }));
  const [textSelectionExists, setTextSelectionExists] = useState(false);
  const { pending } = useSystemStore((state) => state.asyncOperations);
  const [showMentions, setShowMentions] = useState(false);
  const showBigPanel = showMentions;
  const participants = new Set(
    threads
      .filter((thread) => thread.tracking.show)
      .map((thread) => ({ ...thread.creator, GHissueId: thread.GHissueId }))
  );
  useEffect(() => {
    function handle(e: any) {
      const selection = window.getSelection();
      if (!selection) return;
      setTextSelectionExists(!!selection.toString());
    }
    document.addEventListener("selectionchange", handle);
    return () => {
      document.removeEventListener("selectionchange", handle);
    };
  }, []);
  return (
    <Nav
      data-live-feedback-navbar
      style={{
        borderRadius: "24px",
        cursor: "grab",
      }}
      drag
      layout="size"
      layoutRoot
    >
      <AnimatePresence mode="popLayout" presenceAffectsLayout>
        {showBigPanel ? (
          <BigPanel
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {showMentions && <MentionsBigPanel />}
          </BigPanel>
        ) : null}
      </AnimatePresence>
      <Toolbar layout>
        <Button
          disabled={pending > 0}
          title="Add Comment"
          variant="flat"
          key="add-comment"
          data-live-feedback-thread-creation
          style={{
            justifyContent: "flex-start",
            width: isPicking ? "fit-content" : "32px",
            aspectRatio: isPicking ? "unset" : "1/1",
            borderRadius: "9999px",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsPicking(!isPicking);
          }}
          layout
        >
          <motion.div
            data-live-feedback-thread-creation
            layout="size"
            style={{
              flexShrink: 0,
              width: "15px",
              height: "15px",
              display: "flex",
            }}
          >
            <PlusIcon
              data-live-feedback-thread-creation
              style={{
                transform: isPicking ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </motion.div>
          <AnimatePresence initial={false}>
            {isPicking && (
              <motion.span
                style={{
                  fontSize: "12px",
                }}
                data-live-feedback-thread-creation
                layout
              >
                Stop Picking
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button
          disabled={pending > 0 || !textSelectionExists}
          variant="flat"
          layout
          key="thread-bubble-on-selection"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            if (!range) return;
            const clientRect = range.getClientRects()?.[0];
            if (!clientRect) return;
            const target = recursiveGetParentUntilItIsAnHTMLElement(
              range.commonAncestorContainer
            );
            if (!target) return;
            setTempThreadCreationIntent({
              type: "TEXT_RANGE",
              commonAncestor: target,
              start: range.startOffset,
              end: range.endOffset,
              startNode: range.startContainer,
              endNode: range.endContainer,
            });
          }}
          title="Create thread bubble on text selected"
        >
          <CursorTextIcon />
        </Button>
        <Button
          variant="flat"
          layout
          key="clear-github-cache"
          onClick={clearGithubCache}
          title="Clear GitHub cache"
        >
          <UpdateIcon />
        </Button>
        <Button
          title="Mentions"
          variant="flat"
          disabled
          style={{
            opacity: 0.2,
          }}
          layout
          key="mentions"
          onClick={() => setShowMentions(!showMentions)}
        >
          <motion.svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914"></motion.path>
          </motion.svg>
        </Button>
        <Button
          variant="flat"
          layout
          disabled
          key="all-threads"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            opacity: 0.2,
          }}
        >
          <ArchiveIcon />
        </Button>
        <VerticalDivider layout />
        {participants.size > 0 ? (
          <>
            {Array.from(participants)
              .slice(0, 4)
              .map((participant, i, array) => (
                <>
                  <Button
                    onClick={() => {
                      const bubbleElement: HTMLButtonElement | null =
                        document.querySelector(
                          "#live-feedback-bubble-" + participant.GHissueId
                        );

                      bubbleElement?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center",
                      });
                      bubbleElement?.click();
                    }}
                    variant="flat"
                    layout
                    key={"participant" + i + participant}
                    style={{
                      width: "2rem",
                      aspectRatio: "1/1",
                      borderRadius: "50%",
                      padding: 2,
                      marginInlineStart: i > 0 ? "-12px" : "0px",
                      marginInlineEnd:
                        i < 4 && i < array.length - 1 ? "-12px" : "0px",
                    }}
                  >
                    <img
                      src={participant?.avatar}
                      alt={participant?.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                        padding: 0,
                      }}
                    />
                  </Button>
                </>
              ))}
            {participants.size > 4 && (
              <Button
                variant="flat"
                layout
                key={"participant+plus"}
                style={{
                  width: "2rem",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  padding: 2,
                  marginInlineStart: "-12px",
                  gap: 0,
                  fontSize: "12px",
                  background: "rgba(0,0,0,.7)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <PlusIcon />
                {participants.size - 4}
              </Button>
            )}
            <VerticalDivider layout />
          </>
        ) : null}

        <Button
          variant="flat"
          layout
          key="config"
          style={{
            opacity: 0.2,
          }}
        >
          <GearIcon />
        </Button>
        <AsyncOperationsStatus />
      </Toolbar>
    </Nav>
  );
}
export default Navbar;
