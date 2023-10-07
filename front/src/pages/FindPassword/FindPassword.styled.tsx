import styled from "styled-components";
import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";
import { Link } from "react-router-dom";

export const BackGround = styled.div`
  display: flex;
  width: 100%;
  background-color: ${COLOR.Gray1};
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FindPasswordForm = styled.div`
  width: 340px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title1 = styled.div`
  font-size: ${FONT.Title};
  font-weight: ${FONT.Medium};
  text-align: center;
  margin-bottom: 30px;
`;

export const Title2 = styled.div`
  font-size: ${FONT.L};
  text-align: center;
  margin-bottom: 30px;
`;

export const Title3 = styled.div`
  font-size: ${FONT.M};
  text-align: center;
  margin-bottom: 10px;
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

export const StyledButton = styled.button`
  background-color: ${COLOR.Purple1};
  color: ${COLOR.White};
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: ${FONT.M};
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${COLOR.Purple2};
  }
`;

export const Error = styled.div`
  font-size: ${FONT.M};
  color: ${COLOR.Red1};
  margin-bottom: 10px;
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
  margin-top: 10px;
`;

export const HelpLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR.Purple1};
  font-size: ${FONT.M};
  text-align: center;
  margin-left: 10px;
`;

export const Helpinfo = styled.div`
  font-size: ${FONT.M};
  margin-left: 20px;
`;
