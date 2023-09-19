import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Wrapper = styled.div``;

export const InfoTitle = styled.h4`
  font-size: ${FONT.M};
  color: ${COLOR.Gray9};
  margin-left: 5px;
  margin-top: 30px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.Gray2};
  font-size: ${FONT.M};
  outline: none;
  line-height: 1em;
  padding: 8px;
  border-radius: 5px;
  margin-top: 20px;
  transition: 0.3s;
  &::placeholder {
    color: ${COLOR.Gray12};
    font-size: ${FONT.S};
  }

  &:focus {
    border: 1px solid ${COLOR.Purple1};
  }
`;

export const AlertP = styled.p`
  position: absolute;
  color: ${COLOR.Red1};
  font-size: ${FONT.XS};
  padding-top: 5px;
`;

export const CorrectP = styled(AlertP)`
  color: ${COLOR.Green1};
`;

export const Button = styled.button`
  border: none;
  margin-top: 20px;
  width: 100%;
  line-height: 1em;
  color: ${COLOR.White};
  background-color: ${COLOR.Purple1};
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
