import * as S from "./Body.style";
import * as Icon from "../../../components/Icon";
import BodyHeader from "./components/BodyHeader";
import BodyContainers from "./components/BodyContainers";
import { useNavigate } from "react-router";
import { Desktop, Mobile } from "../../../components/Responsive";
import { isSpaceItemId } from "../../../recoil/SidebarState";
import { useRecoilValue } from "recoil";

function Body() {
  const navigate = useNavigate();
  const isContainerType = useRecoilValue(isSpaceItemId);
  const handleNavigate = (destination: string) => {
    navigate(`${destination}`);
  };
  return (
    <div>
      <Desktop>
        <S.BodyWrapper>
          <S.BodyTitleBox>
            <S.BodyTitle>
              {isContainerType === 1
                ? "모든 컨테이너"
                : isContainerType === 2
                ? "내 컨테이너"
                : "공유된 컨테이너"}
            </S.BodyTitle>
            <S.CreateContainerBtn
              onClick={() => {
                handleNavigate(`/container`);
              }}
            >
              <S.PlusIcon>
                <Icon.Plus />
              </S.PlusIcon>
              <S.CreateDiv>새 컨테이너</S.CreateDiv>
            </S.CreateContainerBtn>
          </S.BodyTitleBox>
          <BodyHeader />
          <BodyContainers />
        </S.BodyWrapper>
      </Desktop>
      <Mobile>
        <S.BodyWrapper>
          <S.BodyTitleBox>
            <S.BodyTitle>
              {isContainerType === 1
                ? "모든 컨테이너"
                : isContainerType === 2
                ? "내 컨테이너"
                : "공유된 컨테이너"}
            </S.BodyTitle>
            <S.CreateContainerBtn
              onClick={() => {
                handleNavigate(`/container`);
              }}
            >
              <S.PlusIcon>
                <Icon.Plus />
              </S.PlusIcon>
              <S.CreateDiv>새 컨테이너</S.CreateDiv>
            </S.CreateContainerBtn>
          </S.BodyTitleBox>
          <BodyHeader />
          <BodyContainers />
        </S.BodyWrapper>
      </Mobile>
    </div>
  );
}

export default Body;
