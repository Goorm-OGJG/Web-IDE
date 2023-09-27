import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Container = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0%;
  width: 200px;
  z-index: 10;
  color: ${COLOR.White};
  background-color: ${COLOR.Gray8};
  font-size: ${FONT.XS};
  border-radius: 7px;
`;

export const CreateMenu = styled.div`
  padding: 10px 30px;

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
