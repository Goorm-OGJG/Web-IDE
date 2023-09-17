import * as S from "./PasswordChange.style";
import PasswordInput from "../PasswordInput/PasswordInput";

function PasswordChange() {
  return (
    <S.Wrapper>
      <S.InfoTitle>현재 비밀번호</S.InfoTitle>
      <PasswordInput placeholder="현재 비밀번호" />
      <S.InfoTitle>새로운 비밀번호</S.InfoTitle>
      <PasswordInput placeholder="영문, 숫자, 특수문자 혼합하여 8~30자." />
      <S.InfoTitle>새로운 비밀번호 확인</S.InfoTitle>
      <PasswordInput placeholder="새로운 비밀번호 확인" />
      <S.Button>비밀번호 변경</S.Button>
    </S.Wrapper>
  );
}

export default PasswordChange;
