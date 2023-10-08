import * as S from "./Header.style";
import * as Icon from "../Icon";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isMSidebarOpenState,
  isMenuHoverState,
  isSidebarOpenState,
} from "../../recoil/homeState";
import { Desktop, Mobile } from "../Responsive";
import { userInfoState } from "../../recoil/userState";
import { isSpaceItemId } from "../../recoil/SidebarState";

function Header() {
  const userInfo = useRecoilValue(userInfoState);
  const [isMenuHover, setIsMenuHover] = useRecoilState(isMenuHoverState);
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const [isMSidebarOpen, setIsMSidebarOpen] = useRecoilState(isMSidebarOpenState);
  const isContainerType = useRecoilValue(isSpaceItemId);
  const handleHoverMenu = () => {
    setIsMenuHover(true);
  };
  const handleHoverOutMenu = () => {
    setIsMenuHover(false);
  };
  return (
    <div>
      <Desktop>
        <S.HeaderWrapper>
          <S.MenuIcon
            onMouseEnter={handleHoverMenu}
            onMouseLeave={handleHoverOutMenu}
            onClick={() => {
              setIsSidebarOpen(true);
              handleHoverOutMenu();
            }}
          >
            {!isSidebarOpen &&
              (isMenuHover ? <Icon.MenuOpen size={18} /> : <Icon.Menu size={18} />)}
          </S.MenuIcon>
          <S.HeaderContentBox>
            {userInfo?.name} /{" "}
            {isContainerType === 1
              ? "모든 컨테이너"
              : isContainerType === 2
              ? "내 컨테이너"
              : "공유된 컨테이너"}
          </S.HeaderContentBox>
        </S.HeaderWrapper>
      </Desktop>
      <Mobile>
        <S.HeaderWrapper>
          <S.MenuIcon
            onMouseEnter={handleHoverMenu}
            onMouseLeave={handleHoverOutMenu}
            onClick={() => {
              setIsSidebarOpen(true);
              setIsMSidebarOpen(true);
              handleHoverOutMenu();
            }}
          >
            {!isMSidebarOpen &&
              (isMenuHover ? <Icon.RightArrow2 size={18} /> : <Icon.Menu size={18} />)}
          </S.MenuIcon>
          <S.HeaderContentBox>
            {userInfo?.name} /{" "}
            {isContainerType === 1
              ? "모든 컨테이너"
              : isContainerType === 2
              ? "내 컨테이너"
              : "공유된 컨테이너"}
          </S.HeaderContentBox>
        </S.HeaderWrapper>
      </Mobile>
    </div>
  );
}

export default Header;
