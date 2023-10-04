import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";
import { Link } from "react-router-dom";

export const RightBackground = styled.div`
  width: 700px;
  height: 700px;
  background-color: ${COLOR.White};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MRightBackground = styled(RightBackground)`
  background-color: transparent;
  width: 90%;
`;

export const Rightwrapper = styled.div`
  width: 400px;
`;

export const StyledInputBox = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.Gray2};
  font-size: ${FONT.M};
  outline: none;
  line-height: 1em;
  padding: 10px;
  border-radius: 5px;
  padding-right: 40px;
  transition: 0.3s;
  margin-bottom: 20px;

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

export const StyledButton = styled.button`
  background-color: ${COLOR.Purple1};
  color: ${COLOR.White};
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: ${FONT.ML};
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: ${COLOR.Purple2};
  }
`;

export const LoginTitle = styled.div`
  font-size: ${FONT.Title};
  margin: 10px;
`;

export const MLoginTitle = styled(LoginTitle)`
  text-align: center;
`;

export const Logininfo = styled.div`
  font-size: ${FONT.L};
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const MLogininfo = styled(Logininfo)`
  text-align: center;
`;

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
  padding: 10px;
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

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const LinkWrapper = styled.div``;

export const Rememberbox = styled.label`
  font-size: ${FONT.M};
`;

export const FindPassWordLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR.Black};
  font-size: ${FONT.M};
`;

export const SignUpLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR.Black};
  font-size: ${FONT.M};
  margin-left: 20px;
`;

export const AlertP = styled.p`
  position: absolute;
  color: ${COLOR.Red1};
  font-size: ${FONT.XS};
`;

export const CorrectP = styled(AlertP)`
  color: ${COLOR.Green1};
`;
