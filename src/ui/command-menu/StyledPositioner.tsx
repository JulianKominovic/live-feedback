import styled from "@emotion/styled";
import { Z_INDEXES } from "../../styles";
import { motion } from "framer-motion";

export const StyledPositioner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEXES.TOOLBAR};
  background-color: rgba(0, 0, 0, 0.5);
`;
