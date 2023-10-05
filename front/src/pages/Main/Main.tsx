import { useRecoilValue } from "recoil";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as S from "./Main.style";
import { isMSidebarOpenState, isSidebarOpenState } from "../../recoil/homeState";
import { Desktop, Mobile } from "../../components/Responsive";
import Body from "./Body/Body";
import Chat from "../../components/Chat/Chat";
function Main() {
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);
  const isMSidebarOpen = useRecoilValue(isMSidebarOpenState);

  return (
    <div>
      <Desktop>
        <S.TotalWrapper issidebaropen={isSidebarOpen}>
          <Header />
          <Body />
          <Chat />
        </S.TotalWrapper>
        <Sidebar />
      </Desktop>
      <Mobile>
        <S.MTotalWrapper ismsidebaropen={isMSidebarOpen}>
          <Header />
          <Body />
        </S.MTotalWrapper>
        <Sidebar />
      </Mobile>
    </div>
  );
}

export default Main;
