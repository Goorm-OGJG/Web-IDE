import * as S from "./MyPage.style";
import * as Icon from "../../components/Icon";
import Container from "./components/Container/Container";
import ProfileImg from "./components/ProfileImg/ProfileImg";
import UserInfo from "./components/UserInfo/UserInfo";
import PasswordChange from "./components/PasswordChange/PasswordChange";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import { useNavigate } from "react-router";

function MyPage() {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <S.BackGround>
      {/* Desktop */}
      <S.Wrapper>
        <S.Header>
          <S.IconBox onClick={backHandler}>
            <Icon.DownArrow2 size={24} />
          </S.IconBox>
          <S.Title>내 설정</S.Title>
        </S.Header>
        <Container name="프로필 사진">
          <ProfileImg />
        </Container>
        <Container name="기본 정보">
          <UserInfo />
        </Container>
        <Container name="비밀번호 변경">
          <PasswordChange />
        </Container>
        <Container name="회원 탈퇴">
          <DeleteAccount />
        </Container>
      </S.Wrapper>
      {/* Mobile */}
    </S.BackGround>
  );
}

export default MyPage;
