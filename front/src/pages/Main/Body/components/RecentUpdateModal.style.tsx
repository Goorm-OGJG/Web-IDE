import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

interface Props {
  ordered: string;
}
export const UpdateModalWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: -5px;
  align-items: center;
  width: 160px;
  height: 75px;
  padding: 4px;
  z-index: 1;
`;
export const UpdateDiv = styled.button<Props>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 16px;
  line-height: 22px;
  font-size: ${FONT.M};
  border: none;
  background-color: ${(props) =>
    props.ordered === "updated" ? `${COLOR.Gray2}` : `${COLOR.Gray1}`};
  color: ${COLOR.Gray10};
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Gray2};
  }
`;
export const RecentDiv = styled.button<Props>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 16px;
  line-height: 22px;
  font-size: ${FONT.M};
  border: none;
  background-color: ${(props) =>
    props.ordered === "recent" ? `${COLOR.Gray2}` : `${COLOR.Gray1}`};
  color: ${COLOR.Gray10};
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Gray2};
  }
`;

export const DotIconDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR.Purple2};
`;
