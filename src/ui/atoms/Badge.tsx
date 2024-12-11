import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CSS_FRAGMENTS } from "../../styles";

export const Badge = styled(motion.div)<{
  clickable?: boolean;
  colorScheme?: "success" | "warning" | "error" | "info";
  padding?: string;
  fontSize?: string;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ padding }) => padding || "4px 12px"};
  border-radius: 9999px;

  ${CSS_FRAGMENTS["button-styles"]};
  font-size: ${({ fontSize }) => fontSize || "12px"};
  background-color: ${({ colorScheme }) =>
    colorScheme === "error"
      ? "rgba(255, 0, 0, 0.5)"
      : colorScheme === "warning"
        ? "rgba(255, 138, 0, 0.5)"
        : colorScheme === "success"
          ? "rgba(0, 255, 0, 0.5)"
          : colorScheme === "info"
            ? "rgba(0, 0, 255, 0.5)"
            : "rgba(0, 0, 0, 0.5)"};

  &[aria-selected="true"] {
    background: rgba(255, 255, 255, 0.1);
  }
  pointer-events: ${({ clickable }) => (clickable ? "auto" : "none")};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  ${({ clickable }) =>
    clickable
      ? `
        :hover {
            background: rgba(255, 255, 255, 0.05);
        }
    `
      : ""};
`;
