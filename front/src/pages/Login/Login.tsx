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
            <S.StyledTitle1>WELCOME</S.StyledTitle1>
            <S.StyledTitle2>OGJG</S.StyledTitle2>
            <S.StyledTitle3>IDE</S.StyledTitle3>
          </S.Leftwrapper>
        </S.LeftBackground>
      </Desktop>

      <LoginForm />
    </S.BackGround>
  );
};

export default Login;
