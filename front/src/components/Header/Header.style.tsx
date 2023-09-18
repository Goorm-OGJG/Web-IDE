import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 32px;
  align-items: center;
`;
export const MenuIcon = styled.div`
  margin: 10px;
  cursor: pointer;
`;
export const HeaderContentBox = styled.div`
  font-size: ${FONT.S};
  font-weight: ${FONT.Regular};
  line-height: ${FONT.L};
  color: ${COLOR.Gray7};
  align-items: center;
`;
