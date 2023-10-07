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

function RenameFileModal() {
  const setMode = useSetRecoilState(modeState);
  const selectedInfo = useRecoilValue(selectedInfoState);
  const files = useRecoilValue(fileDataState);
  const path = selectedInfo?.node.key;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const { requestRenameFile } = useFilesAPI();
  const [isNotOK, setIsNotOK] = useState(false);
  const [isNotUnique, setIsNotUnique] = useState(false);

  const handlerOK = () => {
    if (!FILENAME_REG.test(inputRef.current!.value)) {
      setIsNotOK(true);
      setTimeout(() => {
        setIsNotOK(false);
      }, 2000);
      return;
    }

    const filePath = selectedInfo?.node.key as string;
    const originFileName = filePath.split("/").pop() as string;
    const newFileName = inputRef.current!.value.trim();
    const newFilePath = filePath.replace(originFileName, newFileName);

    if (Object.keys(files).includes(newFilePath)) {
      setIsNotUnique(true);
      setTimeout(() => {
        setIsNotUnique(false);
      }, 2000);
      return;
    }

    const payload = {
      filePath,
      newFileName,
    };

    requestRenameFile(selectedInfo as T.InfoType, payload);
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
      <S.Title>파일명 변경</S.Title>
      <S.Explain>
        <S.Path>{path}</S.Path> 에서 변경할 새로운 파일명을 입력해주세요.
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

export default RenameFileModal;
