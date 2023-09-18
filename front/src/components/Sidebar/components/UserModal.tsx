import * as S from "./UserModal.style";
import * as Icon from "../../Icon";
import { useNavigate } from "react-router";
const users = {
  id: 1,
  userName: "조재균(풀스택1회차)",
  userEmail: "kyeun950830@gmail.com",
  imgUrl: "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
};
function UserModal() {
  const navigate = useNavigate();
  return (
    <>
      <S.UserModalBox>
        <S.UserHeader>
          <S.UserImgBox>
            <S.UserImg src={users.imgUrl} alt="userImg" />
          </S.UserImgBox>
          <S.UserName>{users.userName}</S.UserName>
        </S.UserHeader>
        <S.UserEmailBox>
          <S.UserEmail>{users.userEmail}</S.UserEmail>
        </S.UserEmailBox>
        <S.EtcBox>
          <S.SettingBox
            onClick={() => {
              navigate(`/my`);
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
    </>
  );
}

export default UserModal;
