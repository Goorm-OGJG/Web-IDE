import { useEffect, useRef } from "react";
import * as S from "./CreateModal.style";
import { isContextModalOpenedState, modeState } from "../../../../recoil/CodeEditorState";
import { useSetRecoilState } from "recoil";

type PropsType = {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateModal({ setIsModalOpened }: PropsType) {
  const setIsContextMenuOpened = useSetRecoilState(isContextModalOpenedState);
  const setMode = useSetRecoilState(modeState);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCreateFile = () => {
    setIsContextMenuOpened(false);
    setMode("CREATE_FILE");
  };
  const handleCreateDirectory = () => {
    setIsContextMenuOpened(false);
    setMode("CREATE_DIRECTORY");
  };

  const handleClickOutside = (event: MouseEvent) => {
    const isModalMenuAvailable = modalRef.current !== null;
    const isEventTargetOutSide = !modalRef.current?.contains(event.target as Node);

    if (isModalMenuAvailable && isEventTargetOutSide) {
      setIsModalOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.Container ref={modalRef}>
      <S.CreateMenu onClick={handleCreateFile}>파일 추가</S.CreateMenu>
      <S.CreateMenu onClick={handleCreateDirectory}>폴더 추가</S.CreateMenu>
    </S.Container>
  );
}

export default CreateModal;
