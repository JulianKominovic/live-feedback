import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CSS_FRAGMENTS } from "../../styles/tokens";
export const TextArea = styled(motion.textarea)`
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 14px;
  line-height: 16px;
  ${CSS_FRAGMENTS["button-styles"]};
`;
