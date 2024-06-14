import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CSS_FRAGMENTS } from "../../styles/tokens";

export const Badge = styled(motion.div)<{
  clickable?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.2);
  ${CSS_FRAGMENTS["button-styles"]};

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
