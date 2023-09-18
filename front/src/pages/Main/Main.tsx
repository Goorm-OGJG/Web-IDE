import { useRecoilValue } from "recoil";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as S from "./Main.style";
import { isMSidebarOpenState, isSidebarOpenState } from "../../recoil/homeState";
import { Desktop, Mobile } from "../../components/Responsive";
function Main() {
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);
  const isMSidebarOpen = useRecoilValue(isMSidebarOpenState);
  console.log(isSidebarOpen);
  return (
    <div>
      <Desktop>
        <S.TotalWrapper issidebaropen={isSidebarOpen}>
          <Header />
        </S.TotalWrapper>
        <Sidebar />
      </Desktop>
      <Mobile>
        <S.MTotalWrapper ismsidebaropen={isMSidebarOpen}>
          <Header />
        </S.MTotalWrapper>
        <Sidebar />
      </Mobile>
    </div>
  );
}

export default Main;
