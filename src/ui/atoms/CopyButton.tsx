import { CheckIcon, Link2Icon } from "@radix-ui/react-icons";
import React, { forwardRef, useState } from "react";
import { Button } from "./Button";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const copy = (textToCopy: string) => {
    if (navigator.clipboard && !copied) {
      setCopied(true);
      navigator.clipboard.writeText(textToCopy).finally(() => {
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return { copied, copy };
};

export const CopyButton = forwardRef(function CopyButton(
  {
    textToCopy,
    ...rest
  }: { textToCopy: string } & React.ComponentProps<typeof Button>,
  ref
) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button {...rest} ref={ref as any} onClick={() => copy(textToCopy)}>
      {copied ? <CheckIcon /> : <Link2Icon />}
    </Button>
  );
});
