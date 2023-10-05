import Container from "./Container";
import * as S from "./BodyCotainers.style";
import { useRecoilValue } from "recoil";
import { isSpaceItemId } from "../../../../recoil/SidebarState";
import { containersState, isOrdered } from "../../../../recoil/homeState";
import { userInfoState } from "../../../../recoil/userState";

function BodyContainers() {
  // 🔥API를 받아와서 컨테이너를 뿌려주는 데이터
  const userInfo = useRecoilValue(userInfoState);
  const containers = useRecoilValue(containersState);

  const ordered = useRecoilValue(isOrdered);
  const spaceItemId = useRecoilValue(isSpaceItemId);

  const sortedContainers = [...containers].sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    } else if (!a.pinned && b.pinned) {
      return 1;
    } else {
      if (ordered === "updated") {
        const dateA: Date = new Date(a.updatedDate);
        const dateB: Date = new Date(b.updatedDate);
        return dateB.getTime() - dateA.getTime();
      } else {
        const dateA: Date = new Date(a.createdDate);
        const dateB: Date = new Date(b.createdDate);
        return dateB.getTime() - dateA.getTime();
      }
    }
  });
  return (
    <>
      <S.ContainersWrapper>
        {containers.length > 0 &&
          (spaceItemId === 1
            ? sortedContainers
            : spaceItemId === 2
            ? sortedContainers.filter((container) => container.owner === userInfo?.email)
            : sortedContainers.filter((container) => container.owner !== userInfo?.email)
          ).map((container) => {
            return <Container data={container} key={container.containerId} />;
          })}
      </S.ContainersWrapper>
    </>
  );
}

export default BodyContainers;
