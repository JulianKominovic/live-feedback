import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { COLORS } from "../../styles/tokens";
export const Dot = styled(motion.span)<{ color: keyof typeof COLORS }>`
  width: 6px;
  height: 6px;
  display: inline-block;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${({ color }) => COLORS[color] || COLORS["green-500"]};
`;
