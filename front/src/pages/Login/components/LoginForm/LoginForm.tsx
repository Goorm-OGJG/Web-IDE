import React, { useState } from "react";
import * as S from "./LoginForm.style";
import * as Icon from "../../../../components/Icon";
import { Desktop, Mobile } from "../../../../components/Responsive";
import { useUserAPI } from "../../../../api/useUserAPI";
import * as T from "../../../../types/userAPIType";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [remember, setRemeber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");
  const { requestLogin } = useUserAPI();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRemeber = () => {
    setRemeber(!remember);
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // 이메일과 비밀번호 유효성 검사 진행
    if (email.trim() === "") {
      // 이메일 폼이 비어있는 경우 처리
      alert("이메일을 입력하세요.");
      return;
    }

    if (value.trim() === "") {
      // 비밀번호 폼이 비어있는 경우
      alert("비밀번호를 입력하세요.");
      return;
    }

    // 유효성 검사 통과 시 로그인 요청
    const payload: T.LoginType = {
      email,
      password: value,
    };
    requestLogin(payload);
  };

  return (
    <React.Fragment>
      {/* 데스크탑 버전 */}
      <Desktop>
        <S.RightBackground>
          <S.Rightwrapper>
            <S.LoginTitle>Login</S.LoginTitle>
            <S.Logininfo> 하나의 아이디로 OGJG 서비스를 이용하세요. </S.Logininfo>

            <S.StyledInputBox
              type={"text"}
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />

            <S.PasswordBox>
              {showPassword ? (
                <S.ShowPassword
                  placeholder="비밀번호"
                  value={value}
                  onChange={handlePassword}
                  minLength={8}
                  maxLength={30}
                />
              ) : (
                <S.Password
                  placeholder="비밀번호"
                  type="password"
                  value={value}
                  onChange={handlePassword}
                  minLength={8}
                  maxLength={30}
                />
              )}

              <S.IconWrapper onClick={handleShow}>
                {showPassword ? (
                  <S.IconBox>
                    <Icon.EyeOn />
                  </S.IconBox>
                ) : (
                  <S.IconBox>
                    <Icon.EyeOff />
                  </S.IconBox>
                )}
              </S.IconWrapper>
            </S.PasswordBox>

            <S.StyledButton onClick={handleLogin}>로그인</S.StyledButton>

            <S.Wrapper>
              <S.Rememberbox>
                <input type="checkbox" onChange={handleRemeber} />
                로그인 상태 유지
              </S.Rememberbox>

              <S.LinkWrapper>
                <S.FindPassWordLink to="/help/password">
                  비밀번호 재설정
                </S.FindPassWordLink>

                <S.SignUpLink to="/signup">회원가입</S.SignUpLink>
              </S.LinkWrapper>
            </S.Wrapper>
          </S.Rightwrapper>
        </S.RightBackground>
      </Desktop>

      {/* 모바일 버전 */}
      <Mobile>
        <S.MRightBackground>
          <S.Rightwrapper>
            <S.MLoginTitle>Login</S.MLoginTitle>
            <S.MLogininfo> 하나의 아이디로 OGJG 서비스를 이용하세요. </S.MLogininfo>

            <S.StyledInputBox
              type={"text"}
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />

            <S.PasswordBox>
              {showPassword ? (
                <S.ShowPassword
                  placeholder="비밀번호"
                  value={value}
                  onChange={handlePassword}
                  minLength={8}
                  maxLength={30}
                />
              ) : (
                <S.Password
                  placeholder="비밀번호"
                  type="password"
                  value={value}
                  onChange={handlePassword}
                  minLength={8}
                  maxLength={30}
                />
              )}

              <S.IconWrapper onClick={handleShow}>
                {showPassword ? (
                  <S.IconBox>
                    <Icon.EyeOn />
                  </S.IconBox>
                ) : (
                  <S.IconBox>
                    <Icon.EyeOff />
                  </S.IconBox>
                )}
              </S.IconWrapper>
            </S.PasswordBox>

            <S.StyledButton onClick={handleLogin}>로그인</S.StyledButton>

            <S.Wrapper>
              <S.Rememberbox>
                <input type="checkbox" onChange={handleRemeber} />
                로그인 상태 유지
              </S.Rememberbox>

              <S.LinkWrapper>
                <S.FindPassWordLink to="/help/password">
                  비밀번호 재설정
                </S.FindPassWordLink>

                <S.SignUpLink to="/signup">회원가입</S.SignUpLink>
              </S.LinkWrapper>
            </S.Wrapper>
          </S.Rightwrapper>
        </S.MRightBackground>
      </Mobile>
    </React.Fragment>
  );
}
