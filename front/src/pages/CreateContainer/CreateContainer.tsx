import * as S from "./CreateContainer.style";
import ContainerContent from "./components/ContainerContent/ContainerContent";
import NameInput from "./components/NameInput.tsx/NameInput";
import Description from "./components/Description/Description";
import LanguageStacks from "./components/LanguageStacks/LanguageStacks";
import Share from "./components/Share/Share";
import * as Icon from "../../components/Icon";
import { Desktop, Mobile } from "../../components/Responsive";

function CreateContainer() {
  const backHandler = () => {
    alert("뒤로가기!");
  };
  const createHandler = () => {
    alert("컨테이너 생성!");
  };

  return (
    <S.BackGround>
      {/* Desktop */}
      <Desktop>
        <S.Wrapper>
          <S.Header>
            <S.IconBox onClick={backHandler}>
              <Icon.DownArrow2 size={24} />
            </S.IconBox>
            <S.Title>컨테이너 생성하기</S.Title>
          </S.Header>
          <ContainerContent name="이름">
            <NameInput />
          </ContainerContent>
          <ContainerContent name="설명(선택사항)">
            <Description />
          </ContainerContent>
          <ContainerContent name="공개범위">
            <Share />
          </ContainerContent>
          <ContainerContent name="소프트웨어 스택">
            <LanguageStacks />
          </ContainerContent>
          <S.Button onClick={createHandler}>생성하기</S.Button>
        </S.Wrapper>
      </Desktop>
      {/* Mobile */}
      <Mobile>
        <S.MWrapper>
          <S.Header>
            <S.IconBox onClick={backHandler}>
              <Icon.DownArrow2 size={24} />
            </S.IconBox>
            <S.Title>컨테이너 생성하기</S.Title>
          </S.Header>
          <ContainerContent name="이름">
            <NameInput />
          </ContainerContent>
          <ContainerContent name="설명(선택사항)">
            <Description />
          </ContainerContent>
          <ContainerContent name="공개범위">
            <Share />
          </ContainerContent>
          <ContainerContent name="소프트웨어 스택">
            <LanguageStacks />
          </ContainerContent>
          <S.MButton onClick={createHandler}>생성하기</S.MButton>
        </S.MWrapper>
      </Mobile>
    </S.BackGround>
  );
}

export default CreateContainer;
