import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Wrapper = styled.div``;

export const InfoTitle = styled.h4`
  font-size: ${FONT.M};
  color: ${COLOR.Gray9};
  margin-left: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.Gray2};
  font-size: ${FONT.M};
  outline: none;
  line-height: 1em;
  padding: 8px;
  border-radius: 5px;
  padding-right: 40px;
  transition: 0.3s;

  &::placeholder {
    color: ${COLOR.Gray12};
    font-size: ${FONT.S};
  }

  &:focus {
    border: 1px solid ${COLOR.Purple1};
  }
`;

export const Button = styled.button`
  border: none;
  margin-top: 30px;
  width: 100%;
  line-height: 1em;
  color: ${COLOR.White};
  background-color: ${COLOR.Purple1};
  padding: 10px;
  border-radius: 5px;

  cursor: pointer;
`;
