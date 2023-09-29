import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  outline: none;
  border: 1px solid ${COLOR.Gray2};
  height: 32px;
  font-size: ${FONT.S};
  padding-left: 15px;
  width: 100%;
  border-radius: 5px;
  transition: 0.3s;
  padding-right: 40px;
  margin-bottom: 5px;
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
  top: 14px;
  transform: translateY(-50%);
  font-size: ${FONT.S};
  padding: 5px;
  color: ${COLOR.Gray4};
`;

export const AlertP = styled.p`
  position: absolute;
  color: ${COLOR.Red1};
  font-size: ${FONT.XS};
`;

export const CorrectP = styled(AlertP)`
  color: ${COLOR.Green1};
`;
