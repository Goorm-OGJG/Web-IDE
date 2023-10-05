import * as S from "./BodyHeader.style";
import * as Icon from "../../../../components/Icon";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isOrdered,
  isUpdateModal,
  isSearchContainer,
  containersState,
} from "../../../../recoil/homeState";
import RecentUpdateModal from "./RecentUpdateModal";
import { useEffect, useState } from "react";
import useContainerAPI from "../../../../api/useContainerAPI";

function BodyHeader() {
  const [isRecentUpdateModal, setIsRecentUpdateModal] = useRecoilState(isUpdateModal);
  const [searchText, setSearchText] = useState<string>("");
  const [searchContainer, setSearchContainer] = useRecoilState(isSearchContainer);
  const setContainers = useSetRecoilState(containersState);
  const ordered = useRecoilValue(isOrdered);
  const { requestContainerData } = useContainerAPI();

  const handleSearchContainer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearchContainerEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchContainer(searchText);
      console.log(searchContainer);
    }
  };
  const handleRecent = () => {
    setIsRecentUpdateModal((prev) => !prev);
  };
  useEffect(() => {
    // 🔥 컨테이너 API 호출: 검색 컨테이너, ordered는 (생성일, 수정일인지) 보내고 setContainers 로 받아온다.
    requestContainerData(searchContainer, setContainers);
  }, [searchContainer]);
  return (
    <div>
      <S.BodyHeaderWrapper>
        <S.InputBox>
          <S.SearchIcon>
            <Icon.Search size={20} />
          </S.SearchIcon>
          <S.ContainerInput
            placeholder="컨테이너 이름"
            onChange={handleSearchContainer}
            onKeyDown={handleSearchContainerEnter}
          ></S.ContainerInput>
        </S.InputBox>
        <S.RecentBtn onClick={handleRecent}>
          <S.RecentIcon>
            <Icon.SortRecent size={16} />
          </S.RecentIcon>
          <S.RecentDiv>
            {ordered === "updated" ? "최근 수정순" : "최근 생성순"}
          </S.RecentDiv>
          {isRecentUpdateModal && <RecentUpdateModal />}
        </S.RecentBtn>
      </S.BodyHeaderWrapper>
    </div>
  );
}

export default BodyHeader;
