import styled from "styled-components";
import * as FONT from "../../../constants/font";
import * as COLOR from "../../../constants/color";
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${COLOR.Gray8};
  color: ${COLOR.White};
  z-index: 99;
`;
export const HeaderTitle = styled.div`
  font-size: ${FONT.S};
  margin: 5px 0px;
`;
export const HeaderIconBox = styled.div`
  display: flex;
`;
export const NoticeIconDiv = styled.div`
  margin: 14px 0px;
  background-color: transparent;
  cursor: pointer;
`;
export const PersonIconDiv = styled.div`
  position: relative;
  margin: 14px 10px 15px 14px;
  cursor: pointer;
`;
