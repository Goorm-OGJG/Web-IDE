import { useEffect, useRef, useState } from "react";
import * as S from "./CreateFileModal.style";
import InputFsName from "./InputFsName";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  fileDataState,
  modeState,
  selectedInfoState,
} from "../../../../recoil/CodeEditorState";
import * as T from "../../../../types/FileTree";
import { FILENAME_REG } from "../../../../constants/regExp";
import { useFilesAPI } from "../../../../api/useFilesAPI";
import { RequestCreateFilePayload } from "../../../../types/filesAPIType";

function CreateFileModal() {
  const setMode = useSetRecoilState(modeState);
  const selectedInfo = useRecoilValue(selectedInfoState);
  const files = useRecoilValue(fileDataState);
  const path = selectedInfo?.node.key;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const [isNotOK, setIsNotOK] = useState(false);
  const [isNotUnique, setIsNotUnique] = useState(false);

  const { requestCreateFile } = useFilesAPI();
  const handlerOK = () => {
    if (!FILENAME_REG.test(inputRef.current!.value)) {
      setIsNotOK(true);
      setTimeout(() => {
        setIsNotOK(false);
      }, 2000);
      return;
    }

    const filePath = selectedInfo?.node.key as string;
    const filename = inputRef.current!.value.trim();

    if (Object.keys(files).includes(`${filePath}${filename}`)) {
      setIsNotUnique(true);
      setTimeout(() => {
        setIsNotUnique(false);
      }, 2000);
      return;
    }

    const payload: RequestCreateFilePayload = {
      filePath,
      uuid: crypto.randomUUID(),
    };
    requestCreateFile(payload, selectedInfo as T.InfoType, filename);

    setMode("EDIT");
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
        <S.Path>{path}</S.Path> 에 생성할 파일명을 입력해주세요.
      </S.Explain>
      <InputFsName
        ref={inputRef}
        placeholder='확장자 필수 입력, 특수문자 /:*\?"<>| 불가'
      />
      {isNotOK && <S.Warning>올바르지 않은 파일명 입니다.</S.Warning>}
      {isNotUnique && <S.Warning>이미 존재하는 파일명 입니다.</S.Warning>}
      <S.ButtonWrapper>
        <S.Button onClick={handlerOK}>확인</S.Button>
        <S.Button onClick={handlerCancel}>취소</S.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default CreateFileModal;
