import styled from "styled-components";
import * as FONT from "../../../../constants/font";
import * as COLOR from "../../../../constants/color";

export const Wrapper = styled.div`
  display: flex;
  padding: 25px;
  border-bottom: 1px solid ${COLOR.Gray2};
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

export const MWrapper = styled(Wrapper)`
  flex-direction: column;
`;

export const Name = styled.h3`
  position: relative;
  top: 5px;
  font-size: ${FONT.M};
  color: ${COLOR.Gray12};
  width: 200px;
`;

export const MName = styled(Name)`
  position: static;
  padding-bottom: 10px;
`;
export const Content = styled.div`
  flex: 1;
`;
