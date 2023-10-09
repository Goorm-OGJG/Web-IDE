import * as S from "./UserModal.style";
import * as Icon from "../../Icon";
import { useNavigate } from "react-router";
import { Desktop, Mobile } from "../../Responsive";
import { userInfoState } from "../../../recoil/userState";
import { useRecoilValue } from "recoil";
import { useMyAPI } from "../../../api/useMyAPI";
import { useEffect, useState } from "react";

function UserModal() {
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const { requestLogout } = useMyAPI();

  const [userImg, setUserImg] = useState("");
  const handleNavigate = (destination: string) => {
    navigate(destination);
  };

  const handleLogout = () => {
    requestLogout();
  };
  useEffect(() => {
    if (userInfo?.userImg) {
      setUserImg(userInfo?.userImg);
    }
  });
  return (
    <>
      <Desktop>
        <S.UserModalBox>
          <S.UserHeader>
            <S.UserImgBox>
              <S.UserImg
                src={userImg === "" ? "/images/default.png" : userImg}
                alt="userImg"
              />
            </S.UserImgBox>
            <S.UserName>{userInfo?.name}</S.UserName>
          </S.UserHeader>
          <S.UserEmailBox>
            <S.UserEmail>{userInfo?.email}</S.UserEmail>
          </S.UserEmailBox>
          <S.EtcBox>
            <S.SettingBox
              onClick={() => {
                handleNavigate(`/my`);
              }}
            >
              <S.SettingIcon>
                <Icon.Setting />
              </S.SettingIcon>
              <S.SettingDiv>내 설정</S.SettingDiv>
            </S.SettingBox>
            <S.LineDiv />
            <S.LogoutBox onClick={handleLogout}>
              <S.LogoutIcon>
                <Icon.LogOut />
              </S.LogoutIcon>
              <S.LogoutDiv>로그아웃</S.LogoutDiv>
            </S.LogoutBox>
          </S.EtcBox>
        </S.UserModalBox>
      </Desktop>
      <Mobile>
        <S.MUserModalBox>
          <S.UserHeader>
            <S.MUserImgBox>
              <S.MUserImg src={userInfo?.userImg} alt="userImg" />
            </S.MUserImgBox>
            <S.UserName>{userInfo?.name}</S.UserName>
          </S.UserHeader>
          <S.UserEmailBox>
            <S.UserEmail>{userInfo?.email}</S.UserEmail>
          </S.UserEmailBox>
          <S.EtcBox>
            <S.SettingBox
              onClick={() => {
                handleNavigate(`/my`);
              }}
            >
              <S.SettingIcon>
                <Icon.Setting />
              </S.SettingIcon>
              <S.SettingDiv>내 설정</S.SettingDiv>
            </S.SettingBox>
            <S.LineDiv />
            <S.LogoutBox onClick={handleLogout}>
              <S.LogoutIcon>
                <Icon.LogOut />
              </S.LogoutIcon>
              <S.LogoutDiv>로그아웃</S.LogoutDiv>
            </S.LogoutBox>
          </S.EtcBox>
        </S.MUserModalBox>
      </Mobile>
    </>
  );
}

export default UserModal;
