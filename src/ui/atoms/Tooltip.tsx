import styled from "@emotion/styled";
import * as TooltipRadix from "@radix-ui/react-tooltip";
import { CSS_FRAGMENTS, Z_INDEXES } from "../../styles/tokens";

export default function Tooltip({
  children,
  ...rest
}: TooltipRadix.TooltipProps) {
  return (
    <TooltipRadix.Provider delayDuration={0}>
      <TooltipRadix.Root {...rest}>{children}</TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}

const Trigger = styled(TooltipRadix.Trigger)`
  cursor: pointer;
`;
const StyledContent = styled(TooltipRadix.Content)`
  padding: 0 12px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: white;
  border-radius: 16px;
  will-change: transform, opacity;
  z-index: ${Z_INDEXES.TOOLTIP};
  ${CSS_FRAGMENTS["box-styles"]};
  * {
    font-size: 12px;
  }
`;
function Content({ children, ...rest }: TooltipRadix.TooltipContentProps) {
  return (
    <TooltipRadix.Portal
      container={
        document
          .getElementById("live-feedback")
          ?.shadowRoot?.querySelector("#live-feedback-styles-wrapper") ||
        (document.body as any)
      }
    >
      <StyledContent {...rest} sideOffset={5}>
        {children}
      </StyledContent>
    </TooltipRadix.Portal>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
