import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const PasswordBox = styled.div`
  position: relative;
  width: 100%;
`;

export const Password = styled.input`
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
  &::-ms-reveal,
  ::-ms-clear {
    display: none;
  }
`;

export const ShowPassword = styled(Password)`
  top: 0;
  left: 0;
`;

export const IconWrapper = styled.div`
  color: ${COLOR.Gray10};
  position: absolute;
  right: 30px;
  top: 25%;
  transform: translateY(-50%);
`;
export const IconBox = styled.div`
  position: absolute;
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

export const PasswordWrapper = styled.div`
  position: relative;
  padding-bottom: 20px;
`;
