import * as TooltipRadix from "@radix-ui/react-tooltip";

export default function Tooltip({ children }: any) {
  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root>{children}</TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}

function Trigger({ children }: any) {
  return <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>;
}

function Content({ children }: any) {
  return (
    <TooltipRadix.Portal>
      <TooltipRadix.Content className="TooltipContent" sideOffset={5}>
        {children}
        <TooltipRadix.Arrow className="TooltipArrow" />
      </TooltipRadix.Content>
    </TooltipRadix.Portal>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
