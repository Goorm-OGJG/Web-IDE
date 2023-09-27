import styled from "styled-components";
import * as COLOR from "../../../../constants/color";

export const MContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  height: 30px;
  background-color: ${COLOR.Gray10};
  justify-content: space-between;
`;

export const MHeader = styled.div`
  display: flex;
  height: 30px;
  background-color: ${COLOR.Gray10};
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: ${COLOR.White};
  gap: 7px;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
`;
