import styled from "@emotion/styled";
import * as Popover from "@radix-ui/react-popover";
import { CSS_FRAGMENTS } from "../../styles/tokens";

export const CloseButton = styled(Popover.Close)`
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  top: 8px;
  right: 8px;
  outline: none;
  cursor: default;
  ${CSS_FRAGMENTS["button-styles"]};
`;
