import styled from "@emotion/styled";
import { Command } from "cmdk";

export const StyledCmdKSearch = styled(Command.Input)`
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  :focus {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;
