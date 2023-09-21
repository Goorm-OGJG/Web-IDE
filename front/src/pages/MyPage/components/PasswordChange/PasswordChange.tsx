import { useRef } from "react";
import * as S from "./PasswordChange.style";
import PasswordInput from "../PasswordInput/PasswordInput";

function PasswordChange() {
  const nowRef = useRef<HTMLInputElement>(null);
  const newRef = useRef<HTMLInputElement>(null);
  const newConfirmRef = useRef<HTMLInputElement>(null);

  const changePasswordHandler = () => {
    const nowValue = nowRef.current!.value;
    const newValue = newRef.current!.value;
    const newConfirmValue = newConfirmRef.current!.value;
    console.log(nowValue, newValue, newConfirmValue);
  };

  return (
    <S.Wrapper>
      <S.InfoTitle>현재 비밀번호</S.InfoTitle>
      <PasswordInput placeholder="현재 비밀번호" ref={nowRef} />
      <S.InfoTitle>새로운 비밀번호</S.InfoTitle>
      <PasswordInput placeholder="영문, 숫자, 특수문자 혼합하여 8~30자." ref={newRef} />
      <S.InfoTitle>새로운 비밀번호 확인</S.InfoTitle>
      <PasswordInput placeholder="새로운 비밀번호 확인" ref={newConfirmRef} />
      <S.Button onClick={changePasswordHandler}>비밀번호 변경</S.Button>
    </S.Wrapper>
  );
}

export default PasswordChange;
