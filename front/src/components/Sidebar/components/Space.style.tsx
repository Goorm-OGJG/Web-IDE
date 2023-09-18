import * as COLOR from "../../../constants/color";
import * as FONT from "../../../constants/font";
import styled, { css, keyframes } from "styled-components";

interface Props {
  isid: number;
  islistid: number;
}
interface SpaceListProps {
  isspaceopen: boolean;
}
export const ContainerWrapper = styled.div`
  padding: 0px 10px;
`;
export const Space = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export const SpaceContent = styled.div`
  display: flex;
  align-items: center;
`;
export const SpaceDiv = styled.div`
  font-size: ${FONT.M};
`;
export const SpaceIcon = styled.div`
  margin-right: 10px;
  align-items: center;
`;
export const SpaceToggleBtn = styled.button`
  border: none;
  background-color: ${COLOR.White};
  height: 40px;
  text-align: center;
  cursor: pointer;
`;

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInAimation = css`
  animation: ${slideInFromTop} 0.7s ease-in-out;
`;

export const SpaceListWrapper = styled.div<SpaceListProps>`
  ${(props) => props.isspaceopen && slideInAimation}
`;
export const SpaceListItem = styled.div<Props>`
  display: flex;
  width: 100%;
  font-size: ${FONT.M};
  font-weight: ${FONT.Regular};
  line-height: 22px;
  background-color: ${(props) => props.isid === props.islistid && "rgba(43,45,54,0.1)"};
  border-radius: 5px;
  cursor: pointer;
`;
export const ItemWrapper = styled.div`
  display: flex;
  height: 40px;
  padding: 18px 0px 18px 28px;
  align-items: center;
`;
export const ItemName = styled.div`
  margin-right: 7px;
  color: ${COLOR.Gray10};
`;
export const ItemCount = styled.div`
  color: ${COLOR.Gray6};
`;
