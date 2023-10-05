import * as S from "./ContainerSettingModal.style";
import * as Icon from "../../../../components/Icon";
import ContainerDeleteModal from "./ContainerDeleteModal";

import { ContainerType } from "./BodyContainers";
import { Dispatch, useState } from "react";
import useContainerAPI from "../../../../api/useContainerAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { containersState, isSearchContainer } from "../../../../recoil/homeState";

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
  privated,
  pinned,
  setContainerSettingModal,
  setPrivated,
  setPinned,
}: PropsType) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const searchContainer = useRecoilValue(isSearchContainer);
  const setContainers = useSetRecoilState(containersState);
  const { requestContainerData, requestPutContainerPinned, requestPutContainerPrivated } =
    useContainerAPI();
  const handleExitSettingModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setContainerSettingModal(false);
    setDeleteModal(false);
  };
  const handleDeleteContainer = () => {
    // 삭제 요청
    setContainerSettingModal(true);
    setDeleteModal(true);
  };
  const handleCopyUrl = () => {
    window.navigator.clipboard
      .writeText(`http://localhost:5173/container/${containerData.containerId}`)
      .then(() => {
        alert("컨테이너 링크가 복사되었습니다.");
        setContainerSettingModal(false);
      });
  };
  const handleUpdatePinned = async () => {
    // 🔥 핀 상태값 변경 요청
    try {
      await requestPutContainerPinned(containerData.containerId, setPinned);
      setContainerSettingModal(false);
      setDeleteModal(false);
      requestContainerData(searchContainer, setContainers);
    } catch (error) {
      alert(error);
    }
  };
  const handleUpdatePrivated = async () => {
    // 🔥 컨테이너 공개 여부 변경 요청
    try {
      await requestPutContainerPrivated(containerData.containerId, setPrivated);
      setContainerSettingModal(false);
      setDeleteModal(false);
    } catch (error) {
      alert(error);
    }
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
          containerId={containerData.containerId}
          containerName={containerData.name}
          setContainerSettingModal={setContainerSettingModal}
        />
      )}
    </>
  );
}

export default ContainerSettingModal;
