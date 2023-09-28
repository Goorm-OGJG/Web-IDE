import { useRecoilState } from "recoil";
import * as Icon from "../../Icon";
import * as S from "./Space.style";
import { isSpaceOpenState } from "../../../recoil/homeState";
import { useState } from "react";
import { isSpaceItemId } from "../../../recoil/SidebarState";

function Space() {
  // const user ="jamesjoe" // recoil로 선언된 유저네임
  const [isSpaceOpen, setIsSpaceOpen] = useRecoilState(isSpaceOpenState);
  const [spaceItemId, setSpaceItemId] = useRecoilState(isSpaceItemId);
  // 🔥API를 받아와서 컨테이너를 뿌려주는 데이터
  // const containers = useRecoileValue();

  // 🔥container 별 개수
  // const allContainerCnt = containers.length;
  // const myContainerCnt = containers.filter((containers) => {
  //   containers.owner === user;
  // }).length;
  // const shareContainerCnt = containers.filter((containers) => {
  //   containers.owner !== user;
  // }).length;

  const handleSpaceOpen = () => {
    setIsSpaceOpen((prev) => !prev);
  };
  const handleItemActive = (id: number) => {
    setSpaceItemId(id);
    ScrollTop();
  };
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const spaceList = [
    {
      id: 1,
      spaceName: "모든 컨테이너",
      spaceCount: 3,
    },
    {
      id: 2,
      spaceName: "내 컨테이너",
      spaceCount: 2,
      //
    },
    {
      id: 3,
      spaceName: "공유된 컨테이너",
      spaceCount: 1,
    },
  ];

  return (
    <div>
      <S.ContainerWrapper>
        <S.Space onClick={handleSpaceOpen}>
          <S.SpaceContent>
            <S.SpaceIcon>
              <Icon.Space size={19} />
            </S.SpaceIcon>
            <S.SpaceDiv>스페이스</S.SpaceDiv>
          </S.SpaceContent>
          <S.SpaceToggleBtn>
            {isSpaceOpen ? <Icon.DownArrow2 size={10} /> : <Icon.RightArrow2 size={10} />}
          </S.SpaceToggleBtn>
        </S.Space>
        <S.SpaceListWrapper isspaceopen={isSpaceOpen}>
          {spaceList.length > 0 &&
            isSpaceOpen &&
            spaceList.map((list) => {
              return (
                <S.SpaceListItem
                  onClick={() => {
                    handleItemActive(list.id);
                  }}
                  isid={spaceItemId}
                  islistid={list.id}
                >
                  <S.ItemWrapper>
                    <S.ItemName>{list.spaceName}</S.ItemName>
                    <S.ItemCount>{list.spaceCount}</S.ItemCount>
                  </S.ItemWrapper>
                </S.SpaceListItem>
              );
            })}
        </S.SpaceListWrapper>
      </S.ContainerWrapper>
    </div>
  );
}

export default Space;
