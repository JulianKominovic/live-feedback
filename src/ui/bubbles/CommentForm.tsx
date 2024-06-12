import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../atoms/Button";
import { TextArea } from "../atoms/TextArea";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../atoms/Loading";
import { Option, Select } from "../atoms/Select";
import { getOpenPullRequests } from "../../integrations/github/pull-requests";

type CommentFormProps = {
  action: (comment: string, bindedPullRequestId: number) => Promise<void>;
};
export const CommentForm = ({ action }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pullRequests, setPullRequests] = useState<
    { title: string; id: number }[]
  >([]);
  useEffect(() => {
    getOpenPullRequests()
      .then((prs) => {
        if (prs)
          setPullRequests(
            prs.data.map((pr) => ({ title: pr.title, id: pr.number }))
          );
      })
      .catch(console.error);
  }, []);
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBlockEnd: "12px",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (isLoading) return;
        const comment = new FormData(e.target as HTMLFormElement).get(
          "comment"
        );
        const bindedPullRequest = new FormData(e.target as HTMLFormElement).get(
          "pull-request-binded"
        );
        if (comment) {
          setIsLoading(true);
          action(comment as string, Number(bindedPullRequest)).finally(() => {
            setIsLoading(false);
            (e.target as HTMLFormElement).reset();
          });
        }
      }}
    >
      <Select name="pull-request-binded" width="100%" defaultValue={"0"}>
        <Option value={"0"}>No pull request associated</Option>
        {pullRequests.map((pr) => (
          <Option key={"pr" + pr.id} value={pr.id}>
            {pr.title}
          </Option>
        ))}
      </Select>
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
