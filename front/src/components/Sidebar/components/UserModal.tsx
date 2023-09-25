import * as S from "./UserModal.style";
import * as Icon from "../../Icon";
import { useNavigate } from "react-router";
import { Desktop, Mobile } from "../../Responsive";
const user = {
  id: 1,
  userName: "조재균(풀스택1회차)",
  userEmail: "kyeun950830@gmail.com",
  imgUrl: "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
};
function UserModal() {
  const navigate = useNavigate();
  const handleNavigate = (destination: string) => {
    navigate(destination);
  };
  return (
    <>
      <Desktop>
        <S.UserModalBox>
          <S.UserHeader>
            <S.UserImgBox>
              <S.UserImg src={user.imgUrl} alt="userImg" />
            </S.UserImgBox>
            <S.UserName>{user.userName}</S.UserName>
          </S.UserHeader>
          <S.UserEmailBox>
            <S.UserEmail>{user.userEmail}</S.UserEmail>
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
            <S.LogoutBox>
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
              <S.MUserImg src={user.imgUrl} alt="userImg" />
            </S.MUserImgBox>
            <S.UserName>{user.userName}</S.UserName>
          </S.UserHeader>
          <S.UserEmailBox>
            <S.UserEmail>{user.userEmail}</S.UserEmail>
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
            <S.LogoutBox>
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
