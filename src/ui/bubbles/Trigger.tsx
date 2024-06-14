import styled from "@emotion/styled";
import { PopoverButton } from "@headlessui/react";
import { CSS_FRAGMENTS, Z_INDEXES } from "../../styles/tokens";

export const Trigger = styled(PopoverButton)`
  width: 32px;
  height: 32px;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  box-shadow: 0 2px 10px;
  border-radius: 4px 50% 50% 50%;
  z-index: ${Z_INDEXES.BUBBLE};
  position: absolute;
  color: white;
  outline: none;
  backdrop-filter: blur(4px);
  ${CSS_FRAGMENTS["button-styles"]};
  &:hover {
    z-index: ${Z_INDEXES.HOVERED_BUBBLE};
  }
`;
