import styled from "styled-components";
import * as FONT from "../../../constants/font";
import * as COLOR from "../../../constants/color";
export const BodyWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 15px 32px;
`;

export const BodyTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const BodyTitle = styled.div`
  font-size: ${FONT.XXL};
  font-weight: ${FONT.Bold};
  color: ${COLOR.Black};
`;

export const CreateContainerBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100px;
  height: 32px;
  border: none;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: ${COLOR.Purple1};
  color: ${COLOR.White};
  cursor: pointer;
  &:hover {
    background-color: rgb(70, 95, 184);
  }
`;
export const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2px;
`;
export const CreateDiv = styled.div``;
