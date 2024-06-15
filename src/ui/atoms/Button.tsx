import styled from "@emotion/styled";
import { HTMLMotionProps, motion, ForwardRefComponent } from "framer-motion";
import { CSS_FRAGMENTS } from "../../styles/tokens";
export const Button = styled<
  ForwardRefComponent<
    HTMLButtonElement,
    HTMLMotionProps<"button"> & {
      variant?: "flat";
      height?: string;
      width?: string;
      Width?: string;
      Height?: string;
    }
  >
>(motion.button)`
  background-color: ${({ variant }) =>
    variant === "flat" ? "transparent" : ""};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  gap: 12px;
  padding: 8px;
  overflow: hidden;
  object-fit: cover;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  height: ${({ height, Height }) => height || Height || "32px"};
  width: ${({ width, Width }) => width || Width || "32px"};
  ${({ variant }) =>
    variant === "flat" ? "" : CSS_FRAGMENTS["button-styles"]};
  :disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;
