import { useState } from "react";
import * as S from "./FindPassword.styled";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isEmailLocked, setIsEmailLocked] = useState(false);
  const [showAlternateMessage, setShowAlternateMessage] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFindPassword = async () => {
    if (isEmailLocked) {
      return; // 이메일 입력 잠금 상태
    }
    try {
      setIsSent(true);
      setMessage("비밀번호 재설정 메일을 보냈습니다. 이메일을 확인해주세요.");
      setIsEmailLocked(true);
      setShowAlternateMessage(true);
    } catch (error) {
      console.error(error);
      setMessage("비밀번호 재설정 메일을 보내는 중 오류가 발생했습니다.");
    }
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
          disabled={isEmailLocked}
        />

        {isSent ? (
          <S.StyledButton>로그인</S.StyledButton>
        ) : (
          <S.StyledButton onClick={handleFindPassword}>인증 메일 전송</S.StyledButton>
        )}

        {message && <div>{message}</div>}
        {isSent && (
          <S.LinkWrapper>
            {showAlternateMessage ? (
              <S.LinkWrapper>
                <S.Helpinfo>이미 계정이 있으세요?</S.Helpinfo>
                <S.HelpLink to="/Login"> 로그인 </S.HelpLink>
              </S.LinkWrapper>
            ) : (
              <S.LoginLink to="/Login"> 로그인으로 돌아가기 </S.LoginLink>
            )}
          </S.LinkWrapper>
        )}
        {!isSent && <S.LoginLink to="/Login"> 로그인으로 돌아가기 </S.LoginLink>}
      </S.FindPasswordForm>
    </S.BackGround>
  );
};

export default FindPassword;
