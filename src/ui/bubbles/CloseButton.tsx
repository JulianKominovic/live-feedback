import styled from "@emotion/styled";
import { CloseButton as CloseBtn } from "@headlessui/react";
import { CSS_FRAGMENTS } from "../../styles/tokens";

export const CloseButton = styled(CloseBtn)`
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2) !important;
  color: white;
  top: 8px;
  right: 8px;
  outline: none;
  cursor: default;
  ${CSS_FRAGMENTS["button-styles"]};
`;
