import * as COLOR from "../../../constants/color";
import * as FONT from "../../../constants/font";
import styled from "styled-components";
export const UserModalBox = styled.div`
  position: absolute;
  left: 310px;
  top: 90px;
  width: 290px;
  height: 190px;
  background-color: ${COLOR.Gray1};
  border: 1px solid ${COLOR.Gray3};
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
`;
export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

export const UserImgBox = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 0.5rem;
`;
export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const UserName = styled.div`
  font-size: ${FONT.ML};
  font-weight: ${FONT.SemiBold};
  display: flex;
  width: 220px;
  height: ${FONT.L};
  line-height: ${FONT.L};
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const UserEmailBox = styled.div`
  margin: 5px 18px 24px 18px;
`;
export const UserEmail = styled.div`
  margin-top: 10px;
  font-size: ${FONT.S};
  font-weight: ${FONT.Regular};
  color: ${COLOR.Gray12};
`;
export const EtcBox = styled.div`
  margin: 10px 0px;
  color: ${COLOR.Gray10};
`;
export const SettingBox = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 20px 18px;
  cursor: pointer;
`;
export const SettingIcon = styled.div`
  margin-right: 10px;
`;
export const SettingDiv = styled.div``;
export const LineDiv = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: rgba(43, 45, 54, 0.3);
  margin: 20px 0px;
`;
export const LogoutBox = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 10px 18px;
  cursor: pointer;
`;
export const LogoutIcon = styled.div`
  margin-right: 10px;
`;
export const LogoutDiv = styled.div``;

export const MUserModalBox = styled.div`
  position: absolute;
  left: 300px;
  top: 95px;
  width: 220px;
  height: 190px;
  background-color: ${COLOR.Gray1};
  border: 1px solid ${COLOR.Gray3};
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
`;
export const MUserImgBox = styled.div`
  max-width: 30px;
  min-height: 30px;
  margin-right: 0.5rem;
`;
export const MUserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
