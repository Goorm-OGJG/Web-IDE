import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

type ActiveProps = {
  active: boolean;
};

type TabProps = {
  active: boolean;
  edited: boolean;
};

export const TabWrapper = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-top: ${(props) =>
    props.active ? `3px solid ${COLOR.Purple1}` : `3px solid transparent`};
  background-color: ${(props) => (props.active ? `${COLOR.Gray12}` : `transparent`)};
  color: ${COLOR.White};
  border-right: 1px solid ${COLOR.Gray6};
  height: 30px;
`;

export const Tab = styled.div<TabProps>`
  padding-left: 5px;
  padding-right: 30px;
  font-size: ${FONT.S};
  font-weight: ${(props) => (props.active ? `${FONT.Bold}` : `${FONT.Regular}`)};
  color: ${(props) => {
    if (props.edited) {
      return COLOR.Yellow1;
    } else if (props.active) {
      return COLOR.Purple1;
    } else {
      return COLOR.White;
    }
  }};

  &::after {
    content: "*";
    display: ${(props) => (props.edited ? "inline" : "none")};
    padding-left: 2px;
  }
`;

export const IconWrapper = styled.div``;
