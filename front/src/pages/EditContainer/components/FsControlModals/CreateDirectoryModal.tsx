import { useEffect, useRef, useState } from "react";
import * as S from "./Modal.style";
import InputFsName from "./InputFsName";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  directoryDataState,
  modeState,
  selectedInfoState,
} from "../../../../recoil/CodeEditorState";
import * as T from "../../../../types/FileTree";
import { DIRECTORYNAME_REG } from "../../../../constants/regExp";
import { useFilesAPI } from "../../../../api/useFilesAPI";
import { RequestCreateDirectoryPayload } from "../../../../types/filesAPIType";

function CreateDirectoryModal() {
  const setMode = useSetRecoilState(modeState);
  const selectedInfo = useRecoilValue(selectedInfoState);
  const directories = useRecoilValue(directoryDataState);
  const path = selectedInfo?.node.key;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const { requestCreateDirectory } = useFilesAPI();
  const [isNotOK, setIsNotOK] = useState(false);
  const [isNotUnique, setIsNotUnique] = useState(false);

  const handlerOK = () => {
    if (!DIRECTORYNAME_REG.test(inputRef.current!.value)) {
      setIsNotOK(true);
      setTimeout(() => {
        setIsNotOK(false);
      }, 2000);
      return;
    }

    const directoryPath = `${selectedInfo?.node.key}${inputRef.current!.value}/`;
    if (Object.keys(directories).includes(directoryPath)) {
      setIsNotUnique(true);
      setTimeout(() => {
        setIsNotUnique(false);
      }, 2000);
      return;
    }

    const payload: RequestCreateDirectoryPayload = {
      directoryPath,
      uuid: crypto.randomUUID(),
    };
    requestCreateDirectory(
      selectedInfo as T.InfoType,
      `${inputRef.current!.value}`,
      payload,
    );
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
      <S.Title>폴더 추가</S.Title>
      <S.Explain>
        <S.Path>{path}</S.Path> 에 생성팔 폴더명을 입력해주세요.
      </S.Explain>
      <InputFsName ref={inputRef} placeholder='특수 문자 /:*\?"<>|. 불가' />
      {isNotOK && <S.Warning>올바르지 않은 폴더명 입니다.</S.Warning>}
      {isNotUnique && <S.Warning>이미 존재하는 폴더명 입니다.</S.Warning>}
      <S.ButtonWrapper>
        <S.Button onClick={handlerOK}>확인</S.Button>
        <S.CancelButton onClick={handlerCancel}>취소</S.CancelButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default CreateDirectoryModal;
