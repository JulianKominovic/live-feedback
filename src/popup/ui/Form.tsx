import styled from "@emotion/styled";
import { CSS_FRAGMENTS } from "../../contentScript/styles/tokens";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  width: 320px;
  border-radius: 6px;
  color: white;
  ${CSS_FRAGMENTS["box-styles"]};

  * {
    font-size: 12px;
    color: white;
  }
  label {
    font-weight: 600;
  }
  fieldset {
    padding: 0;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .radio-group-horizontal {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .gh-token-input-field {
    display: flex;
    gap: 8px;
    input {
      flex-grow: 1;
    }
  }
  input,
  button {
    background-color: rgba(0, 0, 0, 0.2) !important;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    gap: 12px;
    padding: 8px;
    overflow: hidden;
    object-fit: cover;
    border: none;
    white-space: nowrap;
    ${CSS_FRAGMENTS["button-styles"]};
  }
  input[type="radio"] {
    box-shadow: none;
  }
  fieldset:has(input[disabled]) {
    opacity: 0.3;
  }
`;
