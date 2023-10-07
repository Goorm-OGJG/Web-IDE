import React, { useRef, useState } from "react";
import * as S from "./Signup.style";
import PasswordInput from "./components/PasswordInput/PasswordInput";
import { EMAIL_REG, NAME_REG, PASSWORD_REG } from "../../constants/regExp";
import useRegTest from "../../hooks/useRegTest";
import { useUserAPI } from "../../api/useUserAPI";
import * as T from "../../types/userAPIType";
import Spinner from "../../components/Spinner/Spinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(0);
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
    if (isEmailSent === 0 && emailOk === 1) {
      const payload: T.SendEmail = {
        email,
      };
      requestSendEmail(payload, setIsEmailSent);
    }
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameOk(NAME_REG, nameValue);
  };

  const handleSignup = () => {
    if (
      emailOk === 1 &&
      nameOk === 1 &&
      PASSWORD_REG.test(passwordRef.current!.value) &&
      passwordRef.current!.value === passwordConfirmRef.current!.value &&
      isEmailSent === 3
    )
      if (email.trim() === "") {
        alert("이메일을 입력하세요.");
        return;
      }

    if (passwordRef.current!.value.trim() === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (passwordConfirmRef.current!.value.trim() === "") {
      alert("비밀번호 확인을 입력하세요.");
      return;
    }

    if (name.trim() === "") {
      alert("이름을 입력하세요.");
      return;
    }

    {
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
            disabled={isEmailSent !== 0}
            onChange={handleEmailChange}
          />
          <S.AuthButton
            onClick={handleSendEmailClick}
            disabled={isEmailSent === 2 || isEmailSent === 3}
          >
            {isEmailSent === 1 ? <Spinner /> : "인증"}
          </S.AuthButton>
          {emailOk === 1 && isEmailSent === 0 && (
            <S.EmailSuccessP>사용 가능한 이름입니다.</S.EmailSuccessP>
          )}
          {emailOk === 0 && isEmailSent === 0 && (
            <S.EmailAlertP>이름 형식이 올바르지 않습니다.</S.EmailAlertP>
          )}
          {isEmailSent === 1 && (
            <S.EmailCorrectP>이메일 발송 중입니다. 잠시만 기다려 주세요.</S.EmailCorrectP>
          )}
          {isEmailSent === 2 && (
            <S.EmailCorrectP>
              이메일 발송이 완료되었습니다. 메일을 확인해 주세요.
            </S.EmailCorrectP>
          )}
          {isEmailSent === 3 && (
            <S.EmailSuccessP>이메일 인증이 완료되었습니다.</S.EmailSuccessP>
          )}
        </S.EmailInputWrapper>

        <S.Wrapper>
          <PasswordInput
            placeholder="비밀번호(영문, 숫자, 특수문자 혼합하여 8~30자)"
            ref={passwordRef}
          />
          <PasswordInput placeholder="비밀번호 확인" ref={passwordConfirmRef} />
        </S.Wrapper>

        {/* <React.Fragment>
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
        </React.Fragment> */}
        <S.EmailInputWrapper>
          <S.EmailInput
            placeholder="이름"
            minLength={2}
            maxLength={30}
            onChange={changeNameHandler}
          />
          {nameOk === 1 && <S.EmailSuccessP>사용 가능한 이름입니다.</S.EmailSuccessP>}
          {nameOk === 0 && <S.EmailAlertP>이름 형식이 올바르지 않습니다.</S.EmailAlertP>}
        </S.EmailInputWrapper>

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
