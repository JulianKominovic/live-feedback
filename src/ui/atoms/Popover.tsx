import styled from "@emotion/styled";
import { CSS_FRAGMENTS, Z_INDEXES } from "../../styles/tokens";
import {
  useFloating,
  offset,
  autoPlacement,
  autoUpdate,
  shift,
  ReferenceType,
  UseFloatingOptions,
  useClick,
  useInteractions,
  useDismiss,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const StyledTrigger = styled(motion.button)`
  width: 32px;
  height: 32px;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  box-shadow: 0 2px 10px;
  border-radius: 4px 50% 50% 50%;
  z-index: ${Z_INDEXES.BUBBLE};
  position: absolute;
  color: white;
  outline: none;
  backdrop-filter: blur(4px);
  ${CSS_FRAGMENTS["button-styles"]};
  &:hover {
    z-index: ${Z_INDEXES.HOVERED_BUBBLE};
  }
`;

const StyledContent = styled(motion.div)<
  React.RefAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
    "data-live-feedback"?: boolean;
  }
>`
  padding: 12px;
  width: ${({ width }) => width || "300px"};
  height: ${({ height }) => height || "384px"};
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: white;
  border-radius: 16px;
  will-change: transform, opacity;
  z-index: ${Z_INDEXES.HOVERED_BUBBLE};
  ${CSS_FRAGMENTS["box-styles"]};

  * {
    color: white;
  }
  video {
    // Fix for github videos
    max-height: none !important;
    min-height: 0 !important;
    width: 100% !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
  }
  ul {
    padding-inline: 4px;
    list-style: none;
  }
  li {
    list-style: none;
  }
`;

const StyledCloseButton = styled(motion.button)`
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2) !important;
  color: white;
  top: 12px;
  right: 12px;
  outline: none;
  cursor: default;
  ${CSS_FRAGMENTS["button-styles"]};
`;

type PopoverProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
} & Pick<UseFloatingOptions<ReferenceType>, "placement">;
type PopoverContextType = Pick<PopoverProps, "open"> &
  Pick<ReturnType<typeof useFloating>, "refs" | "floatingStyles"> &
  Pick<UseInteractionsReturn, "getFloatingProps" | "getReferenceProps"> & {
    setOpen: (open: boolean) => void;
  };

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function Context({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  children,
  placement,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement ?? "right-start",
    strategy: "absolute",
    middleware: [
      offset(12),
      autoPlacement({
        padding: 16,
        alignment: "start",
      }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  function setOpen(open: boolean) {
    externalOnOpenChange?.(open);
    setInternalOpen(open);
  }
  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        floatingStyles,
        refs,
        getReferenceProps,
        getFloatingProps,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}
export default function Popover({
  open,
  onOpenChange,
  children,
}: PopoverProps) {
  return (
    <Context open={open} onOpenChange={onOpenChange}>
      {children}
    </Context>
  );
}

type TriggerProps =
  typeof StyledTrigger extends React.ComponentType<infer P> ? P : never;

Popover.Trigger = function Trigger({
  children,
  style,
  ...props
}: TriggerProps) {
  const { refs, setOpen, open, getReferenceProps } =
    useContext(PopoverContext)!;
  return (
    <StyledTrigger
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      ref={refs.setReference}
      style={{
        ...style,
        backgroundColor: open ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.2s",
      }}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      {...props}
      {...getReferenceProps()}
    >
      {children}
    </StyledTrigger>
  );
};

type ContentProps =
  typeof StyledContent extends React.ComponentType<infer P> ? P : never;

Popover.Content = function Content({
  children,
  style,
  ...props
}: ContentProps) {
  const { refs, floatingStyles, open, setOpen, getFloatingProps } =
    useContext(PopoverContext)!;

  return (
    <AnimatePresence>
      {open ? (
        <StyledContent
          // tabIndex={-1}
          // onBlur={(e) => {
          //   if (
          //     !e.currentTarget.contains(e.relatedTarget as Node) &&
          //     e.relatedTarget !== refs.reference.current
          //   ) {
          //     setOpen(false);
          //   }
          // }}
          ref={refs.setFloating}
          style={{ ...style, ...floatingStyles }}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          {...props}
          {...getFloatingProps()}
        >
          {open ? children : null}
        </StyledContent>
      ) : null}
    </AnimatePresence>
  );
};

type CloseButtonProps =
  typeof StyledCloseButton extends React.ComponentType<infer P> ? P : never;

Popover.CloseButton = function CloseButton({
  children,
  ...props
}: CloseButtonProps) {
  const { setOpen } = useContext(PopoverContext)!;
  return (
    <StyledCloseButton onClick={() => setOpen(false)} {...props}>
      {children}
    </StyledCloseButton>
  );
};
