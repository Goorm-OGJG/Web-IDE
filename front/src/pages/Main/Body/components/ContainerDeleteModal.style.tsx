import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

// Desktop
export const DeleteModalWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 30%;
  transform: translateY(50%);
  width: 500px;
  height: 230px;
  background-color: ${COLOR.White};
  padding: 10px;
  border: 1px solid ${COLOR.Gray5};
  border-radius: 5px;
  z-index: 4;
`;
export const DeleteTitle = styled.div`
  margin: 10px;
  display: flex;
  font-size: ${FONT.ML};
  font-weight: ${FONT.SemiBold};
`;
export const DeleteContents = styled.div`
  margin: 25px 10px;
  line-height: 25px;
  font-size: ${FONT.M};
`;

export const ContainerName = styled.span`
  color: ${COLOR.Red1};
  font-weight: ${FONT.SemiBold};
`;
export const DeleteFooter = styled.div`
  display: flex;
  justify-content: right;
`;
export const CancelBtn = styled.button`
  width: 105px;
  height: 40px;
  margin-right: 10px;
  border: none;
  font-size: ${FONT.S};
  color: ${COLOR.Black};
  background-color: ${COLOR.Gray1};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Gray3};
  }
`;
export const DeleteContainerBtn = styled.button`
  width: 105px;
  height: 40px;
  border: none;
  font-size: ${FONT.S};
  color: ${COLOR.White};
  background-color: rgba(241, 70, 104, 0.6);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Red2};
  }
`;

export const LineDiv = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: rgba(43, 45, 54, 0.3);
  margin: 20px 0px;
`;

// Mobile
export const MDeleteModalWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 20%;
  transform: translateY(50%);
  width: 330px;
  height: 230px;
  background-color: ${COLOR.White};
  padding: 10px;
  border: 1px solid ${COLOR.Gray5};
  border-radius: 5px;
  z-index: 4;
`;
export const MDeleteTitle = styled.div`
  margin: 10px;
  display: flex;
  font-size: ${FONT.ML};
  font-weight: ${FONT.SemiBold};
`;
export const MDeleteContents = styled.div`
  margin: 25px 10px;
  line-height: 25px;
  font-size: ${FONT.M};
`;

export const MContainerName = styled.span`
  color: ${COLOR.Red1};
  font-weight: ${FONT.SemiBold};
`;
export const MDeleteFooter = styled.div`
  display: flex;
  justify-content: right;
`;
export const MCancelBtn = styled.button`
  width: 105px;
  height: 40px;
  margin-right: 10px;
  border: none;
  font-size: ${FONT.S};
  color: ${COLOR.Black};
  background-color: ${COLOR.Gray1};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Gray3};
  }
`;
export const MDeleteContainerBtn = styled.button`
  width: 105px;
  height: 40px;
  border: none;
  font-size: ${FONT.S};
  color: ${COLOR.White};
  background-color: rgba(241, 70, 104, 0.6);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Red2};
  }
`;

export const MLineDiv = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: rgba(43, 45, 54, 0.3);
  margin: 20px 0px;
`;
