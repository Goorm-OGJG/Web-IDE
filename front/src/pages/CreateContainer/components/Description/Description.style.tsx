import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Wrapper = styled.div`
  position: relative;
`;

export const Textarea = styled.textarea`
  outline: none;
  border: 1px solid ${COLOR.Gray2};
  font-size: ${FONT.S};
  padding-left: 15px;
  padding-top: 10px;
  width: 100%;
  resize: none;
  padding-right: 50px;
  border-radius: 5px;
  transition: 0.3s;

  & ::placeholder {
    color: ${COLOR.Gray4};
  }

  &:focus {
    border: 1px solid ${COLOR.Purple1};
  }
`;

export const Count = styled.span`
  position: absolute;
  right: 0;
  top: 5px;
  font-size: ${FONT.S};
  padding: 5px;
  color: ${COLOR.Gray4};
`;
