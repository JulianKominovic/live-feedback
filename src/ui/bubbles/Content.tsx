import styled from "@emotion/styled";
import { PopoverPanel, PopoverPanelProps } from "@headlessui/react";
import { CSS_FRAGMENTS, Z_INDEXES } from "../../styles/tokens";

export const Content = styled(PopoverPanel)<
  PopoverPanelProps &
    React.RefAttributes<HTMLDivElement> & {
      width?: string;
      height?: string;
      "data-live-feedback"?: boolean;
    }
>`
  padding: 0 12px;
  width: ${({ width }) => width || "300px !important"};
  height: ${({ height }) => height || "384px !important"};
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: white;
  border-radius: 16px;
  will-change: transform, opacity;
  z-index: ${Z_INDEXES.HOVERED_BUBBLE};
  ${CSS_FRAGMENTS["box-styles"]};

  * {
    color: white;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
  }
  ul {
    padding-inline: 4px;
    list-style: none;
  }
  li {
    list-style: none;
  }
`;
