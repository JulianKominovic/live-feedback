import styled from "@emotion/styled";
import { CSS_FRAGMENTS } from "../../styles/tokens";
export const Select = styled.select<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    variant?: "flat";
    height?: string;
    width?: string;
  }
>`
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.2) !important;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 8px;
  height: ${({ height }) => height || "32px"};
  width: ${({ width }) => width || "32px"};
  overflow: hidden;
  object-fit: cover;
  border: none;
  cursor: pointer;
  ${({ variant }) =>
    variant === "flat" ? "" : CSS_FRAGMENTS["button-styles"]};
`;
export const Option = styled.option``;
