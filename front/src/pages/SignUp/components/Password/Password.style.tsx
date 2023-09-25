import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Wrapper = styled.div``;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.Gray2};
  font-size: ${FONT.M};
  outline: none;
  line-height: 1em;
  padding: 10px;
  border-radius: 5px;
  padding-right: 40px;
  transition: 0.3s;
  margin-bottom: 10px;

  &::placeholder {
    color: ${COLOR.Gray12};
    font-size: ${FONT.S};
  }

  &:focus {
    border: 1px solid ${COLOR.Purple1};
  }
  &::-ms-reveal,
  ::-ms-clear {
    display: none;
  }
`;
