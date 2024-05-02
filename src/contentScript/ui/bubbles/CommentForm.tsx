import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../atoms/Button";
import { TextArea } from "../atoms/TextArea";
import { useState } from "react";
import { LoadingSpinner } from "../atoms/Loading";

type CommentFormProps = {
  action: (comment: string) => Promise<any>;
};
export const CommentForm = ({ action }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBlockEnd: "12px",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (isLoading) return;
        const comment = new FormData(e.target as HTMLFormElement).get(
          "comment",
        );
        if (comment) {
          setIsLoading(true);
          action(comment as string).finally(() => setIsLoading(false));
        }
      }}
    >
      <TextArea
        name="comment"
        rows={2}
        style={{
          borderRadius: "6px",
          padding: "4px",
          resize: "none",
        }}
      />
      <Button
        type="submit"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          borderRadius: "8px",
          height: "100%",
          width: "40px",
        }}
      >
        {isLoading ? <LoadingSpinner /> : <PaperPlaneIcon />}
      </Button>
    </form>
  );
};
