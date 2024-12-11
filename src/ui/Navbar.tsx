import useThreadsStore from "../store/threads";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArchiveIcon,
  GearIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import styled from "@emotion/styled";
import { COLORS, CSS_FRAGMENTS, Z_INDEXES } from "../styles";
import { useEffect } from "react";
import { VerticalDivider } from "./atoms/VerticalDivider";
import { Button } from "./atoms/Button";
import useSystemStore from "../store/system";
import SemaphoreIndicator from "./atoms/SemaphoreIndicator";
import {
  nodeIsChildOfLiveFeedbackElement,
  recursiveGetParentUntilItIsAnHTMLElement,
} from "../logic/dom";
import useAuthStore from "../store/auth";
import { useDebounceFunction } from "../utils";
import { TEXT_RANGE_BUBBLE_THREAD_CREATION_DEBOUNCE } from "../const";
import useUIStore from "../store/ui";

function AsyncOperationsStatus() {
  const asyncOperations = useSystemStore((state) => state.asyncOperations);

  return (
    <>
      <SemaphoreIndicator color={COLORS["green-600"]}>
        {asyncOperations.success}
      </SemaphoreIndicator>
      <SemaphoreIndicator color={COLORS["red-600"]}>
        {asyncOperations.error}
      </SemaphoreIndicator>
      <SemaphoreIndicator color={COLORS["orange-600"]}>
        {asyncOperations.pending}
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
  border-radius: 24px;
  ${CSS_FRAGMENTS["box-styles"]};
`;

const Toolbar = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
`;

function AuthenticatedNavbar() {
  const isPicking = useThreadsStore((state) => state.isPicking);
  const threads = useThreadsStore((state) => state.threads);
  const setIsPicking = useThreadsStore((state) => state.setIsPicking);
  const setTempThreadCreationIntent = useThreadsStore(
    (state) => state.setTempThreadCreationIntent
  );
  // https://github.com/timc1/kbar/issues/118#issuecomment-966449430 Kbar is not well typed
  const setIsCmdKOpen = useUIStore((state) => state.setIsCmdkOpen);
  const { pending } = useSystemStore((state) => state.asyncOperations);
  const setIsThreadListOpen = useUIStore((state) => state.setIsThreadListOpen);
  const isThreadListOpen = useUIStore((state) => state.isThreadListOpen);
  const { debounce } = useDebounceFunction(
    TEXT_RANGE_BUBBLE_THREAD_CREATION_DEBOUNCE
  );

  const participants = new Set(
    threads
      .filter((thread) => thread.tracking.show)
      .map((thread) => ({ ...thread.creator, GHissueId: thread.GHissueId }))
  );

  useEffect(() => {
    function handleSelectionRange() {
      if (isPicking) return;
      const selection = window.getSelection();

      // If the selection is not inside any live feedback children, we can safely ignore it
      if (nodeIsChildOfLiveFeedbackElement(document.activeElement!)) {
        return;
      }

      setTempThreadCreationIntent(null);
      if (
        selection &&
        selection.toString().length > 0 &&
        selection.rangeCount > 0
      ) {
        debounce(() => {
          const range = selection.getRangeAt(0);
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
        });
      }
    }
    document.addEventListener("selectionchange", handleSelectionRange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionRange);
    };
  }, [debounce, isPicking, setTempThreadCreationIntent]);
  return (
    <>
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
        variant="flat"
        layout
        key="all-threads"
        onClick={() => {
          setIsThreadListOpen(!isThreadListOpen);
        }}
      >
        <ArchiveIcon />
      </Button>
      <VerticalDivider layout />
      {participants.size > 0 ? (
        <>
          {Array.from(participants)
            .slice(0, 4)
            .map((participant, i, array) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      const shadowRoot =
                        document.querySelector("#live-feedback")?.shadowRoot;
                      const bubbleElement:
                        | HTMLButtonElement
                        | null
                        | undefined = shadowRoot?.querySelector(
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
                    key={"participant" + i + participant.GHissueId}
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
              );
            })}
          {participants.size > 4 && (
            <Button
              variant="flat"
              layout
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
      <Button
        variant="flat"
        layout
        key="cmdk"
        onClick={() => setIsCmdKOpen(true)}
      >
        <HamburgerMenuIcon />
      </Button>
      <AsyncOperationsStatus />
    </>
  );
}

function Navbar() {
  const isAuthed = useAuthStore((state) => state.isAuthed);
  const createToken = useAuthStore((state) => state.createToken);

  return (
    <Nav data-live-feedback-navbar layout="size" layoutRoot>
      <Toolbar layout>
        {isAuthed ? (
          <AuthenticatedNavbar />
        ) : (
          <>
            <Button width="fit-content" variant="flat" onClick={createToken}>
              <GitHubLogoIcon /> Login with GitHub
            </Button>
          </>
        )}
      </Toolbar>
    </Nav>
  );
}
export default Navbar;
