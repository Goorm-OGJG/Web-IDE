import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as T from "../../../../types/FileTree";
import * as S from "./ContextMenu.style";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";
type PropsType = {
  info: T.InfoType;
  setSelectedInfo: Dispatch<SetStateAction<T.InfoType | null>>;
};

function ContextMenu({ info, setSelectedInfo }: PropsType) {
  const isFile = info.node.title?.toString().includes(".");
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { saveFile } = useFileManage();

  const handleClickOutside = (event: MouseEvent) => {
    const isContextMenuAvailable = contextMenuRef.current !== null;
    const isEventTargetOutside = !contextMenuRef.current?.contains(event.target as Node);

    if (isContextMenuAvailable && isEventTargetOutside) {
      setSelectedInfo(null);
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
    setSelectedInfo(null);
    alert("저장되었습니다.");
  };

  const handleChangeFileName = (info: T.InfoType): void => {
    console.log(`${info.node.key} 파일 이름 변경`);
  };

  const handleDeleteFile = (info: T.InfoType): void => {
    console.log(`${info.node.key} 파일 삭제`);
  };

  const handleCreateFile = (info: T.InfoType): void => {
    console.log(`${info.node.key} 파일 생성`);
  };

  const handleCreateDirectory = (info: T.InfoType): void => {
    console.log(`${info.node.key} 폴더 생성`);
  };

  const handleChangeDirectoryName = (info: T.InfoType): void => {
    console.log(`${info.node.key} 폴더 이름 변경`);
  };

  const handleDeleteDirectory = (info: T.InfoType): void => {
    console.log(`${info.node.key} 폴더 삭제`);
  };

  return (
    <S.Menus ref={contextMenuRef} y={info.event.clientY} x={info.event.clientX}>
      {isFile && (
        <>
          <S.Menu onClick={() => handleSaveFile(info)}>저장</S.Menu>
          <S.Menu onClick={() => handleChangeFileName(info)}>이름 변경</S.Menu>
          <S.Menu onClick={() => handleDeleteFile(info)}>삭제</S.Menu>
        </>
      )}
      {!isFile && (
        <>
          <S.Menu onClick={() => handleCreateFile(info)}>파일 추가</S.Menu>
          <S.Menu onClick={() => handleCreateDirectory(info)}>폴더 추가</S.Menu>
          <S.Menu onClick={() => handleChangeDirectoryName(info)}>이름 변경</S.Menu>
          <S.Menu onClick={() => handleDeleteDirectory(info)}>삭제</S.Menu>
        </>
      )}
    </S.Menus>
  );
}

export default ContextMenu;
