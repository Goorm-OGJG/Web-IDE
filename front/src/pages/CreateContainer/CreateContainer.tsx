import * as S from "./CreateContainer.style";
import ContainerContent from "./components/ContainerContent/ContainerContent";
import NameInput from "./components/NameInput.tsx/NameInput";
import Description from "./components/Description/Description";
import LanguageStacks from "./components/LanguageStacks/LanguageStacks";
import Share from "./components/Share/Share";
import * as Icon from "../../components/Icon";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { Desktop, Mobile } from "../../components/Responsive";
import {
  CreateContainerType,
  useCreateContainerAPI,
} from "../../api/useCreateContainerAPI";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

function CreateContainer() {
  const navigate = useNavigate();
  const isNameValid = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const isPrivate = useRef(true);
  const language = useRef("java");
  const { requestCreateContainer } = useCreateContainerAPI();
  const backHandler = () => {
    navigate(-1);
  };
  const createHandler = () => {
    // console.log(isNameValid.current);
    if (isNameValid.current) {
      const payload: CreateContainerType = {
        name: nameRef.current!.value,
        description: descRef.current!.value,
        private: isPrivate.current,
        language: language.current,
      };
      requestCreateContainer(payload);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <S.BackGround>
        {/* Desktop */}
        {/* <Desktop> */}
        <S.Wrapper>
          <S.Header>
            <S.IconBox onClick={backHandler}>
              <Icon.DownArrow2 size={24} />
            </S.IconBox>
            <S.Title>컨테이너 생성하기</S.Title>
          </S.Header>
          <ContainerContent name="이름">
            <NameInput ref={nameRef} isNameValid={isNameValid} />
          </ContainerContent>
          <ContainerContent name="설명(선택사항)">
            <Description ref={descRef} />
          </ContainerContent>
          <ContainerContent name="공개범위">
            <Share isPrivate={isPrivate} />
          </ContainerContent>
          <ContainerContent name="소프트웨어 스택">
            <LanguageStacks language={language} />
          </ContainerContent>
          <Desktop>
            <S.Button onClick={createHandler}>생성하기</S.Button>
          </Desktop>
          <Mobile>
            <S.MButton onClick={createHandler}>생성하기</S.MButton>
          </Mobile>
        </S.Wrapper>
      </S.BackGround>
    </>
  );
}

export default CreateContainer;
