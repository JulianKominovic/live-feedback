import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../atoms/Button";
import { TextArea } from "../atoms/TextArea";
import { LoadingSpinner } from "../atoms/Loading";
import { useState } from "react";

type CommentFormProps = {
  action: (comment: string) => Promise<any>;
};
export const ConversationalCommentForm = ({ action }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (isLoading) return;
        const comment = new FormData(e.target as HTMLFormElement).get(
          "comment"
        );

        if (comment) {
          setIsLoading(true);
          action(comment as string).finally(() => {
            setIsLoading(false);
            (e.target as any).reset();
          });
        }
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <TextArea
          name="comment"
          rows={2}
          style={{
            borderRadius: "6px",
            padding: "4px",
            resize: "none",
            flexGrow: 1,
          }}
        />
        <Button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
          width="40px"
          height="40px"
        >
          {isLoading ? <LoadingSpinner /> : <PaperPlaneIcon />}
        </Button>
      </div>
    </form>
  );
};
