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
  overflow: hidden;
`;

export const LeftBackground = styled.div`
  width: 700px;
  height: 700px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Leftwrapper = styled.div`
  position: relative;
`;

export const StyledTitle = styled.div`
  color: ${COLOR.White};
  font-size: ${FONT.Title};
  margin: 10px;
`;
