import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const SettingModalWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 0px;
  justify-content: center;
  padding: 5px;
  background-color: ${COLOR.White};
  border-radius: 5px;
  width: 180px;
  height: 170px;
  border: 1px solid ${COLOR.Gray4};
  font-size: ${FONT.M};
  color: ${COLOR.Gray10};
  z-index: 3;
`;
export const IconExit = styled.div`
  display: flex;
  justify-content: right;
`;
export const IconDiv = styled.div`
  margin-right: 10px;
`;
export const TrashIconDiv = styled.div`
  margin-right: 10px;
`;
export const PinBox = styled.div`
  justify-content: left;
  display: flex;
  align-items: center;
  margin: 3px 13px 13px 13px;
  &:hover {
    font-weight: ${FONT.SemiBold};
  }
`;
export const ShareBox = styled.div`
  justify-content: left;
  display: flex;
  align-items: center;
  margin: 13px;
  &:hover {
    font-weight: ${FONT.SemiBold};
  }
`;
export const PrivateBox = styled.div`
  justify-content: left;
  display: flex;
  align-items: center;
  margin: 13px;
  &:hover {
    font-weight: ${FONT.SemiBold};
  }
`;
export const DeleteBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 13px;
  color: ${COLOR.Red1};
  cursor: pointer;
  &:hover {
    font-weight: ${FONT.SemiBold};
  }
`;

export const LineDiv = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: rgba(43, 45, 54, 0.3);
  margin: 15px 0px;
`;
