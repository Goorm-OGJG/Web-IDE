import styled from "styled-components";
import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";

export const BackGround = styled.div`
  display: flex;
  width: 100%;
  background-color: ${COLOR.Gray1};
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 90%;
  position: relative;
  background-color: ${COLOR.White};
  min-width: 320px;
  max-width: 1100px;
`;

export const Button = styled.button`
  position: absolute;
  right: 0;
  bottom: -60px;
  border: none;
  background-color: ${COLOR.Purple2};
  color: ${COLOR.White};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: ${FONT.XXL};
  font-weight: ${FONT.SemiBold};
`;

export const Header = styled.div`
  position: absolute;
  bottom: 100%;
  padding-bottom: 25px;
  display: flex;
  align-items: center;
`;
export const IconBox = styled.div`
  transform: rotate(90deg) translateX(2px);
  margin-right: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: rotate(90deg) translateY(5px) translateX(2px);
  }
`;

export const MButton = styled(Button)`
  width: 100%;
`;
