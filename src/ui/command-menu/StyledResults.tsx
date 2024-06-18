import styled from "@emotion/styled";

export const StyledResults = styled.div<{ active: boolean }>`
  background: ${({ active }) =>
    active ? "rgba(255,255,255,.1)" : "transparent"};
  padding: 0px 16px;
  height: 56px;
  display: flex;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  div {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  span {
    line-height: 1;
  }
  .subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
