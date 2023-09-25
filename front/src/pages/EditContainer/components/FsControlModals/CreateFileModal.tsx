import { useEffect, useRef, useState } from "react";
import * as S from "./CreateFileModal.style";
import InputFsName from "./InputFsName";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modeState, selectedInfoState } from "../../../../recoil/CodeEditorState";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";
import * as T from "../../../../types/FileTree";
import { FILENAME_REG } from "../../../../constants/regExp";

function CreateFileModal() {
  const setMode = useSetRecoilState(modeState);
  const selectedInfo = useRecoilValue(selectedInfoState);
  const path = selectedInfo?.node.key;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const { addFile } = useFileManage();
  const [isNotOK, setIsNotOK] = useState(false);

  const handlerOK = () => {
    if (FILENAME_REG.test(inputRef.current!.value)) {
      setIsNotOK(false);
      addFile(selectedInfo as T.InfoType, inputRef.current!.value);
      setMode("EDIT");
      return;
    }
    setIsNotOK(true);
    setTimeout(() => {
      setIsNotOK(false);
    }, 2000);
  };

  const handlerCancel = () => {
    setMode("EDIT");
  };

  useEffect(() => {
    const enterHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handlerOK();
      }
    };

    document.addEventListener("keydown", enterHandler);

    const cleanUp = () => {
      document.removeEventListener("keydown", enterHandler);
    };

    return cleanUp;
  }, []);

  return (
    <S.Container ref={modalRef}>
      <S.Title>파일 추가</S.Title>
      <S.Explain>
        <S.Path>{path}</S.Path> 에 생성팔 파일명을 입력해주세요.
      </S.Explain>
      <InputFsName ref={inputRef} />
      {isNotOK && <S.Warning>올바르지 않은 파일명 입니다.</S.Warning>}
      <S.ButtonWrapper>
        <S.Button onClick={handlerOK}>확인</S.Button>
        <S.Button onClick={handlerCancel}>취소</S.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default CreateFileModal;
