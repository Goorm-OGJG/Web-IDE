import { useState } from "react";
import * as S from "./Signup.style";
import Password from "./components/Password/Password";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendEmailClick = () => {
    setIsEmailSent(!isEmailSent);
  };

  const isButtonDisabled = email === "";

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
        {isEmailSent && <S.Error>인증 메일이 발송되었습니다.</S.Error>}

        <Password />

        <S.StyledInputBox type="text" id="username" placeholder="이름 (2~30자)" />
        <S.StyledButton>회원가입</S.StyledButton>

        <S.LinkWrapper>
          <S.Logininfo>이미 계정이 있으세요?</S.Logininfo>
          <S.LoginLink to="/Login">로그인</S.LoginLink>
        </S.LinkWrapper>
      </S.SingupForm>
    </S.BackGround>
  );
};

export default Signup;
