import * as S from "./Sidebar.style";
import * as Icon from "../Icon";
import UserInfo from "./components/UserInfo";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isMSidebarOpenState,
  isMenuHoverState,
  isSidebarOpenState,
} from "../../recoil/homeState";
import Space from "./components/Space";
import { Desktop, Mobile } from "../Responsive";
import { useNavigate } from "react-router";
import { isUserInfo } from "../../recoil/SidebarState";
function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const [isMSidebarOpen, setIsMSidebarOpen] = useRecoilState(isMSidebarOpenState);
  const [isMenuHover, setIsMenuHover] = useRecoilState(isMenuHoverState);
  const setInfoOpen = useSetRecoilState<boolean>(isUserInfo);
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setIsMSidebarOpen(false);
    setInfoOpen(false);
  };
  const handleHoverMenu = () => {
    setIsMenuHover(true);
  };
  const handleHoverOutMenu = () => {
    setIsMenuHover(false);
  };
  const handleNavigate = (destination: string) => {
    navigate(destination);
  };
  return (
    <>
      <Desktop>
        <S.SidebarWrapper
          issidebaropen={isSidebarOpen}
          ismenuhover={isMenuHover}
          onMouseEnter={handleHoverMenu}
          onMouseLeave={handleHoverOutMenu}
        >
          <S.SidebarTop>
            <S.TopPersonal>
              <Icon.Build />
              <S.PersonalDiv>personal</S.PersonalDiv>
            </S.TopPersonal>
            <S.MenuBtn onClick={handleSidebarClose}>
              <Icon.MenuHide size={20} />
            </S.MenuBtn>
          </S.SidebarTop>
          <UserInfo />
          <S.MyPageBtn
            onClick={() => {
              handleNavigate(`/my`);
            }}
          >
            <Icon.User />
            <S.MyPageDiv>내 정보 페이지</S.MyPageDiv>
          </S.MyPageBtn>
          <S.LineDiv />
          <Space />
        </S.SidebarWrapper>
      </Desktop>

      <Mobile>
        <S.MSidebarWrapper
          ismsidebaropen={isMSidebarOpen}
          ismmenuhover={isMenuHover}
          onMouseEnter={handleHoverMenu}
          onMouseLeave={handleHoverOutMenu}
        >
          <S.MSidebarTop>
            <S.MTopPersonal>
              <Icon.Build />
              <S.MPersonalDiv>personal</S.MPersonalDiv>
            </S.MTopPersonal>
            <S.MMenuBtn onClick={handleSidebarClose}>
              <Icon.MenuHide size={20} />
            </S.MMenuBtn>
          </S.MSidebarTop>
          <UserInfo />
          <S.MMyPageBtn>
            <Icon.User />
            <S.MMyPageDiv>내 정보 페이지</S.MMyPageDiv>
          </S.MMyPageBtn>
          <S.MLineDiv />
          <Space />
        </S.MSidebarWrapper>
      </Mobile>
    </>
  );
}

export default Sidebar;
