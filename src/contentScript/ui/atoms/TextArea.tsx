import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CSS_FRAGMENTS } from "../../styles/tokens";
export const TextArea = styled(motion.textarea)`
  color: white !important;
  background-color: rgba(0, 0, 0, 0.2) !important;
  font-size: 14px !important;
  line-height: 16px;
  border: none !important;
  border-color: transparent !important;
  ${CSS_FRAGMENTS["button-styles"]};
`;
