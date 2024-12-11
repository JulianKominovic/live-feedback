import styled from "@emotion/styled";
import { Command } from "cmdk";
import { CSS_FRAGMENTS } from "../../styles";
export const StyledCommand = styled(Command)`
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  min-height: 400px;
  background: rgba(0, 0, 0, 0.6);
  ${CSS_FRAGMENTS["box-styles"]};
`;
