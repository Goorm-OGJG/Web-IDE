import { useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "./ContainerDeleteModal.style";
import {
  containersState,
  isDeleteModal,
  isSearchContainer,
} from "../../../../recoil/homeState";
import { Desktop, Mobile } from "../../../../components/Responsive";
import { Dispatch } from "react";
import useContainerAPI from "../../../../api/useContainerAPI";
interface PropsType {
  containerId: number;
  containerName: string;
  setContainerSettingModal: Dispatch<React.SetStateAction<boolean>>;
}
function ContainerDeleteModal({
  containerId,
  containerName,
  setContainerSettingModal,
}: PropsType) {
  const setDeleteModal = useSetRecoilState(isDeleteModal);
  const searchContainer = useRecoilValue(isSearchContainer);
  const setContainers = useSetRecoilState(containersState);

  const { requestDeleteContainer, requestContainerData } = useContainerAPI();
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteModal(false);
    setContainerSettingModal(false);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteModal(false);
    // 🔥 API 삭제 요청
    handlerequestDelete();
    setContainerSettingModal(false);
  };
  const handlerequestDelete = async () => {
    try {
      await requestDeleteContainer(containerId);
      // 🔥 삭제 요청 날리고 API containerData 요청
      requestContainerData(searchContainer, setContainers);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Desktop>
        <S.DeleteModalWrapper>
          <S.DeleteTitle>컨테이너 삭제하기</S.DeleteTitle>
          <S.DeleteContents>
            컨테이너를 삭제하면 저장되어 있는 모든 정보가 영구 삭제됩니다.
            <br /> 정말 <S.ContainerName>{containerName}</S.ContainerName> 컨테이너를
            삭제하시겠습니까?
          </S.DeleteContents>
          <S.LineDiv />
          <S.DeleteFooter>
            <S.CancelBtn
              onClick={(e) => {
                handleCancel(e);
              }}
            >
              취소하기
            </S.CancelBtn>
            <S.DeleteContainerBtn
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              삭제하기
            </S.DeleteContainerBtn>
          </S.DeleteFooter>
        </S.DeleteModalWrapper>
      </Desktop>
      <Mobile>
        <S.MDeleteModalWrapper>
          <S.MDeleteTitle>컨테이너 삭제하기</S.MDeleteTitle>
          <S.MDeleteContents>
            컨테이너를 삭제하면 저장되어 있는 모든 정보가 영구 삭제됩니다.
            <br /> 정말 <S.MContainerName>{containerName}</S.MContainerName> 컨테이너를
            삭제하시겠습니까?
          </S.MDeleteContents>
          <S.MLineDiv />
          <S.MDeleteFooter>
            <S.MCancelBtn
              onClick={(e) => {
                handleCancel(e);
              }}
            >
              취소하기
            </S.MCancelBtn>
            <S.MDeleteContainerBtn
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              삭제하기
            </S.MDeleteContainerBtn>
          </S.MDeleteFooter>
        </S.MDeleteModalWrapper>
      </Mobile>
    </div>
  );
}

export default ContainerDeleteModal;
