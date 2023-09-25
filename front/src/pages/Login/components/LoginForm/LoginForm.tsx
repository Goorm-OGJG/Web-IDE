import React, { useState } from "react";
import * as S from "./LoginForm.style";
import * as Icon from "../../../../components/Icon";
import { Desktop, Mobile } from "../../../../components/Responsive";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [remember, setRemeber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

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

  return (
    <React.Fragment>
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

            <S.StyledButton>로그인</S.StyledButton>

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

      {/* MOBILE */}

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

            <S.StyledButton>로그인</S.StyledButton>

            <S.Wrapper>
              <S.Rememberbox>
                <input type="checkbox" onChange={handleEmailChange} />
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
