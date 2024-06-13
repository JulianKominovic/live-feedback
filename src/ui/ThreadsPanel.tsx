import { AnimatePresence, motion } from "framer-motion";
import { COLORS, CSS_FRAGMENTS, Z_INDEXES } from "../styles/tokens";
import styled from "@emotion/styled";
import useUIStore from "../store/ui";
import { Button } from "./atoms/Button";
import { ChatBubbleIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Thread } from "../types/Threads";
import { Badge } from "./atoms/Badge";
import { Dot } from "./atoms/Dot";
import { getRelativeTimeString } from "../utils";
import DeviceInfoTags from "./molecules/DeviceInfoTags";
import { buildThreadLink, getThreads } from "../logic/threads";
import { useEffect, useMemo, useState } from "react";
import Tooltip from "./atoms/Tooltip";

const Panel = styled(motion.aside)`
  position: fixed;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  z-index: ${Z_INDEXES.THREADS_LIST};
  right: 16px;
  top: 16px;
  height: calc(100dvh - 32px);
  border-radius: 12px;
  ${CSS_FRAGMENTS["box-styles"]};
`;
const List = styled(motion.main)`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled(motion.a)<{ threadStatus: Thread["status"] }>`
  padding: 12px;
  border-radius: 8px;
  margin-block-end: 16px;
  display: block;
  text-decoration: none;
  ${CSS_FRAGMENTS["box-styles"]};
  background-image: linear-gradient(45deg, transparent, #000);
  backdrop-filter: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
  :hover {
    transition: background-color 0.2s;
    background-color: ${({ threadStatus }) =>
      threadStatus === "OPEN"
        ? COLORS["green-500"] + 33
        : COLORS["purple-500"] + 33};
  }
  .dot {
    position: absolute;
    top: 0;
    right: 0;
  }
  .comments-len {
    margin-inline-start: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
  }
  header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-block-end: 12px;
    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
    }
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  h3 {
    margin-block-end: 12px;
  }
  > p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    margin-block-start: 12px;
  }
`;
const ThreadItem = ({
  date,
  status,
  title,
  tracking,
  GHissueId,
  comments,
  creator,
}: Thread) => {
  if (!GHissueId) return null;
  const url = new URL(tracking.url);
  return (
    <ListItem
      threadStatus={status}
      target="_blank"
      href={buildThreadLink(GHissueId, tracking.url)}
      role="listitem"
      key={GHissueId}
      layoutScroll
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Dot
            className="dot"
            color={status === "OPEN" ? "green-500" : "purple-500"}
          />
        </Tooltip.Trigger>
        <Tooltip.Content>
          {status === "OPEN" ? "Open" : "Closed"}
        </Tooltip.Content>
      </Tooltip>
      {creator && (
        <header>
          <img src={creator?.avatar} />
          <b>{creator?.name}</b>
          <span>{getRelativeTimeString(new Date(date))}</span>
          {comments?.length !== undefined ? (
            <p className="comments-len">
              {comments.length}
              <ChatBubbleIcon />
            </p>
          ) : null}
        </header>
      )}
      <h3>{title.replace("[LIVE FEEDBACK] -", "")}</h3>

      {tracking.device && <DeviceInfoTags {...tracking.device} />}

      <p>
        {url.host}
        {url.pathname}
      </p>
    </ListItem>
  );
};

const Title = styled(motion.h2)`
  font-size: 28px;
  display: flex;
  line-height: 1;
  align-items: center;
  gap: 8px;
  margin-block-end: 12px;
  span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
  }
`;

const ThreadsCounter = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export default function ThreadsPanel() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const isThreadListOpen = useUIStore((state) => state.isThreadListOpen);
  const setIsThreadListOpen = useUIStore((state) => state.setIsThreadListOpen);
  const [status, setStatus] = useState<"all" | "open" | "closed">("all");
  const filteredThreads = useMemo(() => {
    if (status === "all") return threads;
    return threads.filter((t) => t.status.toLowerCase() === status);
  }, [threads, status]);
  useEffect(() => {
    if (isThreadListOpen)
      getThreads("all").then((threads) => setThreads(threads.slice(0, 50)));
  }, [isThreadListOpen]);

  return (
    <AnimatePresence>
      {isThreadListOpen ? (
        <Panel
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <Button
            style={{
              position: "absolute",
              right: 16,
              top: 16,
            }}
            onClick={() => setIsThreadListOpen(false)}
          >
            <Cross2Icon />
          </Button>
          <Title>
            Thread list <span>{`(${threads.length})`}</span>
          </Title>
          <ThreadsCounter>
            <Badge
              onClick={() =>
                setStatus((prev) => (prev === "open" ? "all" : "open"))
              }
              clickable
              aria-selected={status === "open"}
            >
              <Dot color="green-500" />
              {threads.filter((t) => t.status === "OPEN").length} {" open"}
            </Badge>
            <Badge
              onClick={() =>
                setStatus((prev) => (prev === "closed" ? "all" : "closed"))
              }
              clickable
              aria-selected={status === "closed"}
            >
              <Dot color="purple-500" />
              {threads.filter((t) => t.status === "CLOSED").length}
              {" resolved"}
            </Badge>
          </ThreadsCounter>
          <List
            role="list"
            layoutScroll
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {filteredThreads
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map(ThreadItem)}
          </List>
        </Panel>
      ) : null}
    </AnimatePresence>
  );
}
