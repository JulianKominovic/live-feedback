import styled from "@emotion/styled";
import { KBarSearch } from "kbar";

export const StyledKBarSearch = styled(KBarSearch)`
  outline: none;
  border: none;
  background-color: transparent;
  color: white;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  :focus {
    outline: none;
  }
`;
