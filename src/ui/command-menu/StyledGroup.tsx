import styled from "@emotion/styled";
import { Command } from "cmdk";
export const StyledGroup = styled(Command.Group)`
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  gap: 16px;
  [cmdk-group-heading] {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 8px;
    ::after {
      content: "";
      display: inline-block;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      width: calc(100% - 24px);
    }
  }
`;
