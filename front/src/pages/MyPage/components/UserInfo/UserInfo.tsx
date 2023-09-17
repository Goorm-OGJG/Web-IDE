import * as S from "./UserInfo.style";

function UserInfo() {
  return (
    <S.Wrapper>
      <S.InfoTitle>이름</S.InfoTitle>
      <S.Input placeholder="이름" minLength={2} maxLength={30} />
      <S.InfoTitle>이메일</S.InfoTitle>
      <S.Input placeholder="test@gamil.com" disabled />
      <S.Button>변경사항 저장</S.Button>
    </S.Wrapper>
  );
}

export default UserInfo;
