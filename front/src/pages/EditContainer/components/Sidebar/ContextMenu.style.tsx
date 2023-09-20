import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

interface PosType {
  y: number;
  x: number;
}

export const Menus = styled.div<PosType>`
  color: ${COLOR.White};
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  z-index: 10;
  font-size: ${FONT.XS};
`;

export const Menu = styled.div`
  padding: 10px 30px;
  width: 200px;
  background-color: ${COLOR.Gray8};
  border-bottom: 1px solid ${COLOR.Gray10};

  &:hover {
    background-color: ${COLOR.Gray7};
  }

  &:first-child {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  &:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    border-bottom: none;
  }
`;
