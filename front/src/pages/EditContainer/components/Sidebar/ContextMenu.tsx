import { useEffect, useRef } from "react";
import * as T from "../../../../types/FileTree";
import * as S from "./ContextMenu.style";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isContextModalOpenedState,
  modeState,
  selectedInfoState,
} from "../../../../recoil/CodeEditorState";

function ContextMenu() {
  const selectedInfo = useRecoilValue(selectedInfoState);
  const setIsContextMenuOpened = useSetRecoilState(isContextModalOpenedState);
  const setMode = useSetRecoilState(modeState);

  const isFile = selectedInfo?.node.title?.toString().includes(".");
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const { saveFile, deleteFile } = useFileManage();

  const handleClickOutside = (event: MouseEvent) => {
    const isContextMenuAvailable = contextMenuRef.current !== null;
    const isEventTargetOutside = !contextMenuRef.current?.contains(event.target as Node);
    if (isContextMenuAvailable && isEventTargetOutside) {
      setIsContextMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveFile = (info: T.InfoType): void => {
    saveFile(info);
    setIsContextMenuOpened(false);
    alert("저장되었습니다.");
  };

  const handleChangeFileName = (info: T.InfoType): void => {
    console.log(`${info.node.key} 파일 이름 변경`);
    setIsContextMenuOpened(false);
    setMode("RENAME_FILE");
  };

  const handleDeleteFile = (info: T.InfoType): void => {
    console.log(`${info.node.key} 파일 삭제`);
    setIsContextMenuOpened(false);
    deleteFile(info);
  };

  const handleCreateFile = (info: T.InfoType): void => {
    console.log(`${info.node.key} 파일 생성`);
    setIsContextMenuOpened(false);
    setMode("CREATE_FILE");
  };

  const handleCreateDirectory = (info: T.InfoType): void => {
    console.log(`${info.node.key} 폴더 생성`);
    setIsContextMenuOpened(false);
    setMode("CREATE_DIRECTORY");
  };

  const handleChangeDirectoryName = (info: T.InfoType): void => {
    console.log(`${info.node.key} 폴더 이름 변경`);
    setIsContextMenuOpened(false);
  };

  const handleDeleteDirectory = (info: T.InfoType): void => {
    console.log(`${info.node.key} 폴더 삭제`);
    setIsContextMenuOpened(false);
    deleteFile(info);
  };

  return (
    <S.Menus
      ref={contextMenuRef}
      y={selectedInfo!.event.clientY}
      x={selectedInfo!.event.clientX}
    >
      {isFile && (
        <>
          <S.Menu onClick={() => handleSaveFile(selectedInfo as T.InfoType)}>저장</S.Menu>
          <S.Menu onClick={() => handleChangeFileName(selectedInfo as T.InfoType)}>
            이름 변경
          </S.Menu>
          <S.Menu onClick={() => handleDeleteFile(selectedInfo as T.InfoType)}>
            삭제
          </S.Menu>
        </>
      )}
      {!isFile && (
        <>
          <S.Menu onClick={() => handleCreateFile(selectedInfo as T.InfoType)}>
            파일 추가
          </S.Menu>
          <S.Menu onClick={() => handleCreateDirectory(selectedInfo as T.InfoType)}>
            폴더 추가
          </S.Menu>
          <S.Menu onClick={() => handleChangeDirectoryName(selectedInfo as T.InfoType)}>
            이름 변경
          </S.Menu>
          <S.Menu onClick={() => handleDeleteDirectory(selectedInfo as T.InfoType)}>
            삭제
          </S.Menu>
        </>
      )}
    </S.Menus>
  );
}

export default ContextMenu;
