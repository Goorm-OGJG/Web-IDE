import * as S from "./BodyHeader.style";
import * as Icon from "../../../../components/Icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { isOrdered, isUpdateModal } from "../../../../recoil/homeState";
import RecentUpdateModal from "./RecentUpdateModal";
function BodyHeader() {
  const [isRecentUpdateModal, setIsRecentUpdateModal] = useRecoilState(isUpdateModal);
  const ordered = useRecoilValue(isOrdered);
  console.log(ordered);
  const handleRecent = () => {
    setIsRecentUpdateModal((prev) => !prev);
  };
  return (
    <div>
      <S.BodyHeaderWrapper>
        <S.InputBox>
          <S.SearchIcon>
            <Icon.Search size={20} />
          </S.SearchIcon>
          <S.ContainerInput placeholder="컨테이너 이름"></S.ContainerInput>
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
