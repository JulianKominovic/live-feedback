import styled from "@emotion/styled";
import { Command } from "cmdk";

export const StyledList = styled(Command.List)`
  > div > div:last-child {
    border-radius: 0 0 16px 16px;
  }
`;
