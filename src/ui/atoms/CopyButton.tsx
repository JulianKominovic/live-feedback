import styled from "@emotion/styled";
import { CheckIcon, Link2Icon } from "@radix-ui/react-icons";
import React, { forwardRef, useState } from "react";

const Button = styled.button`
  border: none;
  line-height: 0;
  :focus {
    outline: none !important;
  }
`;

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
  }: { textToCopy: string } & React.ComponentProps<"button">,
  ref
) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button {...rest} ref={ref as any} onClick={() => copy(textToCopy)}>
      {copied ? <CheckIcon /> : <Link2Icon />}
    </Button>
  );
});
