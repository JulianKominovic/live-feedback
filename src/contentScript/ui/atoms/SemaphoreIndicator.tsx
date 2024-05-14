import styled from "@emotion/styled";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
import React from "react";

type SemaphoreIndicatorProps = {
  children: React.ReactNode;
  color: string;
};
const Wrapper = styled(motion.div)<SemaphoreIndicatorProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  div {
    background: ${(props) => props.color};
    border-radius: 50%;
    width: 8px;
    height: 8px;
    aspect-ratio: 1/1;
  }
  span {
    font-size: 10px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
const SemaphoreIndicator = ({
  children,
  color,
  ...rest
}: SemaphoreIndicatorProps & MotionProps) => {
  return (
    <Wrapper {...rest} color={color}>
      <motion.div />
      <motion.span>{children}</motion.span>
    </Wrapper>
  );
};

export default SemaphoreIndicator;
