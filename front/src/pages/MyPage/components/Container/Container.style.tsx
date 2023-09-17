import styled from "styled-components";
import * as FONT from "../../../../constants/font";
import * as COLOR from "../../../../constants/color";

export const Wrapper = styled.div`
  display: flex;
  padding: 25px;
  border-bottom: 1px solid ${COLOR.Gray2};
  position: relative;
  flex-direction: column;

  &:last-child {
    border-bottom: none;
  }
`;

export const Name = styled.h3`
  position: relative;
  top: 5px;
  font-size: ${FONT.L};
  color: ${COLOR.Gray12};
  font-weight: ${FONT.Bold};
  width: 200px;
`;

export const MName = styled(Name)`
  position: static;
  padding-bottom: 10px;
`;
export const Content = styled.div`
  flex: 1;
`;
