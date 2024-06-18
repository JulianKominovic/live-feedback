import styled from "@emotion/styled";
import { KBarAnimator } from "kbar";
import { CSS_FRAGMENTS } from "../../styles/tokens";

export const StyledAnimator = styled(KBarAnimator)`
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  ${CSS_FRAGMENTS["box-styles"]};
  > div > div:last-child {
    border-radius: 0 0 16px 16px;
  }
`;
