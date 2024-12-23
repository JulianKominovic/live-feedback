import styled from "@emotion/styled";
import { Command, useCommandState } from "cmdk";
import { forwardRef, useEffect } from "react";
/* background: ${({ active }) =>
  active ? "rgba(255,255,255,.1)" : "transparent"}; */
export const StyledCmdkItem = styled(Command.Item)`
  background-color: transparent;
  padding: 0px 16px;
  height: 56px;
  display: flex;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  &[aria-selected="true"] {
    background-color: rgba(255, 255, 255, 0.1);
  }
  div {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  span {
    line-height: 1;
  }
  .subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const StyledItem = forwardRef(
  (
    {
      value,
      onHighlight,
      ...rest
    }: React.ComponentProps<typeof StyledCmdkItem> & {
      onHighlight?: () => void;
    },
    ref
  ) => {
    const highlightedValue = useCommandState((state) => state.value);
    useEffect(() => {
      if (value && onHighlight) onHighlight();
    }, [value, highlightedValue, onHighlight]);
    return <StyledCmdkItem {...rest} ref={ref as any} />;
  }
);
