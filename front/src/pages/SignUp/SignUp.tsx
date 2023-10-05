import React, { useRef, useState } from "react";
import * as S from "./Signup.style";
import PasswordInput from "./components/PasswordInput/PasswordInput";
import { EMAIL_REG, NAME_REG, PASSWORD_REG } from "../../constants/regExp";
import useRegTest from "../../hooks/useRegTest";
import { useUserAPI } from "../../api/useUserAPI";
import * as T from "../../types/userAPIType";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailOk, setEmailOk] = useRegTest();
  const [nameOk, setNameOk] = useRegTest();
  const [name, setName] = useState("");
  const { requestSignUp, requestSendEmail } = useUserAPI();
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailOk(EMAIL_REG, e.target.value);
  };

  const handleSendEmailClick = () => {
    const payload: T.SendEmail = {
      email,
    };
    requestSendEmail(payload, setIsEmailSent);
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameOk(NAME_REG, nameValue);
  };

  const isButtonDisabled = emailOk !== 1;

  const handleSignup = () => {
    if (
      emailOk === 1 &&
      nameOk === 1 &&
      PASSWORD_REG.test(passwordRef.current!.value) &&
      passwordRef.current!.value === passwordConfirmRef.current!.value &&
      isEmailSent
    ) {
      const payload: T.SignUpType = {
        email,
        password: passwordRef.current!.value,
        name,
      };
      requestSignUp(payload);
    }
  };

  return (
    <S.BackGround>
      <S.SingupForm>
        <S.Title1>OGJG</S.Title1>
        <S.Title2>하나의 아이디로 OGJG 서비스를 이용하세요.</S.Title2>

        <S.EmailInputWrapper>
          <S.EmailInput
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={handleEmailChange}
          />
          <S.AuthButton onClick={handleSendEmailClick} disabled={isButtonDisabled}>
            인증
          </S.AuthButton>
        </S.EmailInputWrapper>

        <S.Wrapper>
          <PasswordInput
            placeholder="비밀번호(영문, 숫자, 특수문자 혼합하여 8~30자)"
            ref={passwordRef}
          />
          <PasswordInput placeholder="비밀번호 확인" ref={passwordConfirmRef} />
        </S.Wrapper>

        <React.Fragment>
          <S.NameBOX>
            <S.StyledInputBox
              placeholder="이름"
              minLength={2}
              maxLength={30}
              onChange={changeNameHandler}
            />
            {nameOk === 1 && <S.CorrectP>사용 가능한 이름입니다.</S.CorrectP>}
            {nameOk === 0 && <S.AlertP>이름 형식이 올바르지 않습니다.</S.AlertP>}
          </S.NameBOX>
        </React.Fragment>

        <S.StyledButton onClick={handleSignup}>회원가입</S.StyledButton>

        <S.LinkWrapper>
          <S.Logininfo>이미 계정이 있으세요?</S.Logininfo>
          <S.LoginLink to="/Login">로그인</S.LoginLink>
        </S.LinkWrapper>
      </S.SingupForm>
    </S.BackGround>
  );
};

export default Signup;
