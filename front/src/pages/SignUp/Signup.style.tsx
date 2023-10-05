import styled from "styled-components";
import { Link } from "react-router-dom";
import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";

export const BackGround = styled.div`
  display: flex;
  width: 100%;
  background-color: ${COLOR.Gray1};
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const SingupForm = styled.div`
  width: 340px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 27px;
`;

export const Title1 = styled.div`
  font-size: ${FONT.Title};
  font-weight: ${FONT.Medium};
  margin: 10px;
  text-align: center;
`;

export const Title2 = styled.div`
  font-size: ${FONT.M};
  margin: 10px;
  line-height: 80px;
  text-align: center;
`;

export const EmailInputWrapper = styled.div`
  position: relative;
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

export const EmailInput = styled(StyledInputBox)`
  width: 340px;
  margin-bottom: 25px;
`;

export const AuthButton = styled.button`
  position: absolute;
  top: 31%;
  right: 10px;
  transform: translateY(-50%);
  background-color: ${(props) =>
    props.disabled ? `${COLOR.Gray1}` : `${COLOR.Purple1}`};
  padding: 5px 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const StyledButton = styled.button`
  background-color: ${COLOR.Purple1};
  color: ${COLOR.White};
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: ${FONT.M};
  cursor: pointer;
  width: 100%;
  margin-top: 35px;

  &:hover {
    background-color: ${COLOR.Purple2};
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR.Purple1};
  font-size: ${FONT.M};
  text-align: center;
  margin-left: 10px;
`;

export const Logininfo = styled.div`
  font-size: ${FONT.M};
  margin-left: 20px;
`;

export const NameBOX = styled.div`
  position: relative;
  width: 100%;
`;

export const AlertP = styled.p`
  position: absolute;
  color: ${COLOR.Red1};
  font-size: ${FONT.XS};
  /* padding-top: 15px; */
`;

export const CorrectP = styled(AlertP)`
  color: ${COLOR.Green1};
`;

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
