import { useRecoilState } from "recoil";
import * as S from "./RecentUpdateModal.style";
import * as Icon from "../../../../components/Icon";
import { isOrdered } from "../../../../recoil/homeState";
function RecentUpdateModal() {
  const [ordered, setOrdered] = useRecoilState(isOrdered);
  const handleUpdatedBtn = () => {
    setOrdered("updated");
  };
  const handleRecentBtn = () => {
    setOrdered("recent");
  };
  return (
    <div>
      <S.UpdateModalWrapper>
        <S.UpdateDiv
          ordered={ordered}
          onClick={() => {
            handleUpdatedBtn();
          }}
        >
          최근 수정순
          {ordered === "updated" && (
            <S.DotIconDiv>
              <Icon.Dot />
            </S.DotIconDiv>
          )}
        </S.UpdateDiv>
        <S.RecentDiv
          ordered={ordered}
          onClick={() => {
            handleRecentBtn();
          }}
        >
          이름순
          {ordered === "recent" && (
            <S.DotIconDiv>
              <Icon.Dot />
            </S.DotIconDiv>
          )}
        </S.RecentDiv>
      </S.UpdateModalWrapper>
    </div>
  );
}

export default RecentUpdateModal;
