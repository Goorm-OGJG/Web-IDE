import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as T from "../../../../types/FileTree";
import * as S from "./ContextMenu.style";

type PropsType = {
  info: T.InfoType;
  setSelectedInfo: Dispatch<SetStateAction<T.InfoType | null>>;
};

function ContextMenu({ info, setSelectedInfo }: PropsType) {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as Node)
    ) {
      setSelectedInfo(null);
    }
  };

  const isFile = info.node.title?.toString().includes(".");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.Menus ref={contextMenuRef} y={info.event.clientY} x={info.event.clientX}>
      {isFile && <S.Menu>저장</S.Menu>}
      <S.Menu>이름 변경</S.Menu>
      <S.Menu>삭제</S.Menu>
    </S.Menus>
  );
}

export default ContextMenu;
