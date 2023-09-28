import * as S from "./ContainerSettingModal.style";
import * as Icon from "../../../../components/Icon";
import ContainerDeleteModal from "./ContainerDeleteModal";

import { ContainerType } from "./BodyContainers";

import { Dispatch, useState } from "react";

interface PropsType {
  containerData: ContainerType;
  containerSettingModal: boolean;
  privated: boolean;
  pinned: boolean;
  setContainerSettingModal: Dispatch<React.SetStateAction<boolean>>;
  setPrivated: Dispatch<React.SetStateAction<boolean>>;
  setPinned: Dispatch<React.SetStateAction<boolean>>;
}
function ContainerSettingModal({
  containerData,
  containerSettingModal,
  privated,
  pinned,
  setContainerSettingModal,
  setPrivated,
  setPinned,
}: PropsType) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleExitSettingModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setContainerSettingModal(false);
    setDeleteModal(false);
  };
  const handleDeleteContainer = () => {
    // 삭제 요청
    console.log("삭제");
    setContainerSettingModal(true);
    setDeleteModal(true);
  };
  const handleCopyUrl = () => {
    window.navigator.clipboard.writeText(`${containerData.containerUrl}`).then(() => {
      console.log(containerData.containerUrl);
      alert("컨테이너 링크가 복사되었습니다.");
      setContainerSettingModal(false);
    });
  };
  const handleUpdatePinned = () => {
    // 🔥 핀 상태값 변경 요청
    // requestPutContainerPinned(containerData.containerId, setPinned);
    setContainerSettingModal(false);
    setDeleteModal(false);
  };
  const handleUpdatePrivated = () => {
    // 🔥 컨테이너 공개 여부 변경 요청
    // requestPutContainerPrivated(containerData.containerId, setPrivated);
    setContainerSettingModal(false);
    setDeleteModal(false);
  };

  return (
    <>
      <S.SettingModalWrapper>
        <S.IconExit onClick={handleExitSettingModal}>
          <Icon.Exit />
        </S.IconExit>
        <S.PinBox onClick={handleUpdatePinned}>
          <S.IconDiv>
            <Icon.Pin />
          </S.IconDiv>
          {pinned ? "핀 해제하기" : "고정하기"}
        </S.PinBox>
        <S.ShareBox onClick={handleCopyUrl}>
          <S.IconDiv>
            <Icon.Share />
          </S.IconDiv>
          공유링크 복사하기
        </S.ShareBox>
        <S.PrivateBox onClick={handleUpdatePrivated}>
          <S.IconDiv>{privated ? <Icon.Global /> : <Icon.Lock />}</S.IconDiv>
          {privated ? "공개로 전환하기" : "비공개로 전환하기"}
        </S.PrivateBox>
        <S.LineDiv />
        <S.DeleteBox onClick={handleDeleteContainer}>
          <S.TrashIconDiv>
            <Icon.Trash />
          </S.TrashIconDiv>
          컨테이너 삭제
        </S.DeleteBox>
      </S.SettingModalWrapper>
      {deleteModal && (
        <ContainerDeleteModal
          containerName={containerData.containerName}
          containerSettingModal={containerSettingModal}
          setContainerSettingModal={setContainerSettingModal}
        />
      )}
    </>
  );
}

export default ContainerSettingModal;
