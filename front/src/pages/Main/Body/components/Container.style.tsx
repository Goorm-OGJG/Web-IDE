import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

interface Props {
  privated: boolean;
}
//Desktop
export const BodyContainerWrapper = styled.div`
  width: 300px;
  height: 270px;
  border-radius: 10px;
  border: 1px solid ${COLOR.Gray4};
  padding: 14px 10px;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${FONT.ML};
  color: ${COLOR.Gray10};
`;

export const ContTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const IconsBox = styled.div`
  display: flex;
`;
export const DotIconDiv = styled.div`
  display: flex;
  margin: 0px 10px 0px 8px;
  align-items: center;
  cursor: pointer;
`;
export const PinIconDiv = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
`;

export const SaveIconDiv = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
`;
export const EditIconDiv = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
`;
export const EditCancelDiv = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
`;
export const VolumeIconDiv = styled.div`
  display: flex;
  margin-left: 6px;
  align-items: center;
  cursor: pointer;
`;
export const SettingDiv = styled.div`
  display: flex;
  position: relative;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
`;
export const ContainenrLanguageBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 14px 0px 10px;
  font-size: ${FONT.S};
  text-transform: uppercase;
  align-items: center;
`;
export const ContainerLanguage = styled.div`
  display: flex;
  color: ${COLOR.Gray7};

  font-size: ${FONT.S};
  text-transform: uppercase;
  align-items: center;
`;
export const Language = styled.div``;
export const ContainerPrivate = styled.div`
  display: flex;
  align-items: center;
`;
export const PrivateDiv = styled.div<Props>`
  padding: 2px 4px;
  border-radius: 2px;
  font-size: ${FONT.XS};
  opacity: 0.8;
  color: ${COLOR.White};
  background-color: ${(props) => (props.privated ? `${COLOR.Red2}` : `${COLOR.Purple1}`)};
`;
export const InfoTextArea = styled.textarea`
  font-size: ${FONT.S};
  color: ${COLOR.Gray10};
  width: 100%;
  height: 50%;
  border-color: ${COLOR.Gray3};
  outline-color: ${COLOR.Purple2};
`;
export const InfoText = styled.div`
  font-size: ${FONT.S};
  color: ${COLOR.Gray10};
  width: 100%;
  height: 50%;
  border: none;
`;

export const TextBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${FONT.S};
  color: ${COLOR.Gray10};
`;

export const ContainerFooter = styled.div`
  margin-top: 10px;
`;
export const UserImgBox = styled.div`
  display: flex;
  justify-content: right;
  width: 40%;
  height: 20px;
  /* overflow: hidden; */
`;

export const UserName = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${COLOR.Purple1};
  color: ${COLOR.White};
  font-size: ${FONT.XS};
  top: -30px;
  right: -13px;
  width: 50px;
  height: 20px;
  border-radius: 5px;
  opacity: 0;
  &:after {
    border-top: 7px solid ${COLOR.Purple1};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    top: 20px;
  }
`;
export const UserImgContainer = styled.div`
  position: relative;
  &:hover > ${UserName} {
    visibility: visible;
    opacity: 1;
  }
  &:not(:first-child) {
    margin-left: -10px;
    z-index: 1;
  }
`;

export const UserImgDiv = styled.div`
  bottom: 0;
  max-width: 20px;
  max-height: 20px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 20px;
  cursor: pointer;
`;
export const UserImg = styled.img`
  width: 100%;
  border-radius: 50%;

  z-index: 2;
`;
export const ContainerBtn = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  color: ${COLOR.Purple2};
  background-color: rgba(94, 91, 255, 0.2);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(94, 91, 255, 0.4);
  }
`;

export const MBodyContainerWrapper = styled.div`
  width: 270px;
  height: 270px;
  border-radius: 10px;
  border: 1px solid ${COLOR.Gray4};
  padding: 14px 10px;
  margin: 10px;
`;
