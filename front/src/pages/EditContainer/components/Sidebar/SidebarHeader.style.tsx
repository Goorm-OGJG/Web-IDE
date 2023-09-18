import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Header = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${COLOR.Gray10};
  justify-content: space-between;
  color: white;
  height: 30px;
  align-items: center;
`;

export const ProjectText = styled.span`
  font-size: ${FONT.M};
`;

export const Icons = styled.div`
  display: flex;
  gap: 5px;
`;

export const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
