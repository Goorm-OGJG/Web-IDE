import * as S from "./Login.style";
import { ServeBackground } from "./components/ServeBackground";
import { Desktop } from "../../components/Responsive";
import LoginForm from "./components/LoginForm/LoginForm";

const Login = () => {
  return (
    <S.BackGround>
      <Desktop>
        <S.LeftBackground>
          <ServeBackground />
          <S.Leftwrapper>
            <S.StyledTitle>WELCOME</S.StyledTitle>
            <S.StyledTitle>OGJG</S.StyledTitle>
            <S.StyledTitle>IDE</S.StyledTitle>
          </S.Leftwrapper>
        </S.LeftBackground>
      </Desktop>

      <LoginForm />
    </S.BackGround>
  );
};

export default Login;
