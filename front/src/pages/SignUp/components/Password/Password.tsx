import * as S from "./Password.style";
import PasswordInput from "../PasswordInput/PasswordInput";

function Password() {
  return (
    <S.Wrapper>
      <PasswordInput placeholder="비밀번호(영문, 숫자, 특수문자 혼합하여 8~30자)" />
      <PasswordInput placeholder="비밀번호 확인" />
    </S.Wrapper>
  );
}

export default Password;
