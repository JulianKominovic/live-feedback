import styled from "@emotion/styled";
import { HTMLMotionProps, motion, ForwardRefComponent } from "framer-motion";
import { CSS_FRAGMENTS } from "../../styles/tokens";
export const Button = styled<
  ForwardRefComponent<
    HTMLButtonElement,
    HTMLMotionProps<"button"> & { variant?: "flat" }
  >
>(motion.button)`
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2) !important;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  gap: 12px;
  padding: 8px;
  height: 32px;
  width: 32px;
  overflow: hidden;
  object-fit: cover;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  ${({ variant }) =>
    variant === "flat" ? "" : CSS_FRAGMENTS["button-styles"]};
`;
