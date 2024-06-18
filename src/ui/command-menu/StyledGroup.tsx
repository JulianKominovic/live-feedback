import styled from "@emotion/styled";

export const StyledGroup = styled.div`
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 16px;
  ::after {
    content: "";
    display: inline-block;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    width: calc(100% - 24px);
  }
`;
