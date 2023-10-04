import { useState } from "react";
import * as S from "./FindPassword.styled";
import { useUserAPI } from "../../api/useUserAPI";
import * as T from "../../types/userAPIType";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const { requestFindPassword } = useUserAPI();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFindPassword = async () => {
    const payload: T.FindPassword = {
      email,
    };
    requestFindPassword(payload);
  };

  return (
    <S.BackGround>
      <S.FindPasswordForm>
        <S.Title1>OGJG</S.Title1>
        <S.Title2>비밀번호 재설정</S.Title2>
        <S.Title3>가입한 이메일 주소로 임시 비밀번호를 알려드립니다.</S.Title3>
        <S.Title3>로그인 후 비밀번호를 꼭 변경해주세요.</S.Title3>

        <S.StyledInputBox
          type={"text"}
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
        />

        <S.StyledButton onClick={handleFindPassword}>인증 메일 전송</S.StyledButton>

        <S.LinkWrapper>
          <S.LinkWrapper>
            <S.Helpinfo>이미 계정이 있으세요?</S.Helpinfo>
            <S.HelpLink to="/Login"> 로그인 </S.HelpLink>
          </S.LinkWrapper>
        </S.LinkWrapper>
      </S.FindPasswordForm>
    </S.BackGround>
  );
};

export default FindPassword;
