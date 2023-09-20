import styled from "styled-components";
import * as COLOR from "../../../../../constants/color";
import * as FONT from "../../../../../constants/font";

type ActiveProps = {
  active: boolean;
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

export const Tab = styled.div<ActiveProps>`
  padding-left: 5px;
  padding-right: 30px;
  font-size: ${FONT.S};
  color: ${(props) => (props.active ? `${COLOR.Purple1}` : `${COLOR.White}`)};
  font-weight: ${(props) => (props.active ? `${FONT.Bold}` : `${FONT.Regular}`)};
`;

export const IconWrapper = styled.div``;
