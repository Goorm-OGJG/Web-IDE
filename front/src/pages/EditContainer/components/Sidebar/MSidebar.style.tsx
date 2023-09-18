import styled from "styled-components";
import * as COLOR from "../../../../constants/color";

type Props = {
  isSidebarOpened?: boolean;
};

export const Container = styled.div`
  height: 100vh;
  background-color: ${COLOR.Gray10};
  width: 50px;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLOR.White};
`;

export const IconWrapper = styled.div<Props>`
  position: relative;
  padding: 10px;
  background-color: ${(props) => (props.isSidebarOpened ? COLOR.Gray11 : COLOR.Gray10)};

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.Gray11};
  }

  &::before {
    content: "";
    display: ${(props) => (props.isSidebarOpened ? COLOR.Purple1 : "none")};
    position: absolute;
    width: 2px;
    height: 30px;
    background-color: ${COLOR.Purple1};
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;
